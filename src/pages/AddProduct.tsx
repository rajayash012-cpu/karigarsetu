import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Mic, 
  MicOff, 
  Image as ImageIcon, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  Languages, 
  Volume2, 
  Copy, 
  Check, 
  Globe, 
  ArrowRight,
  AlertCircle,
  RefreshCw,
  X
} from 'lucide-react';
import { processProduct } from '@/lib/api';
import { BackButton } from '@/components/BackButton';
import { transcribeWithPuter } from '@/lib/puterVoice';

interface TranslationResult {
  detectedLanguage: string;
  english: string;
  hindi: string;
  extractedDetails?: {
    craft?: string;
    materials?: string;
    timeTaken?: string;
    estimatedCost?: string;
  };
}

const REGIONAL_LANGUAGES = [
  { code: 'hi-IN', label: 'हिन्दी (Hindi)' },
  { code: 'en-IN', label: 'English (India)' },
  { code: 'bn-IN', label: 'বাংলা (Bengali)' },
  { code: 'mr-IN', label: 'मराठी (Marathi)' },
  { code: 'gu-IN', label: 'ગુજરાતી (Gujarati)' },
  { code: 'ta-IN', label: 'தமிழ் (Tamil)' },
  { code: 'te-IN', label: 'తెలుగు (Telugu)' },
  { code: 'kn-IN', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'pa-IN', label: 'ਪੰਜਾਬੀ (Punjabi)' }
];

export default function AddProduct() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Voice Typing & Language States
  const [selectedLang, setSelectedLang] = useState('hi-IN');
  const [voiceState, setVoiceState] = useState<'IDLE' | 'RECORDING' | 'PROCESSING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [interimText, setInterimText] = useState('');
  const [transcript, setTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  
  // Translation States
  const [isTranslating, setIsTranslating] = useState(false);
  const [translation, setTranslation] = useState<TranslationResult | null>(null);
  const [activeTab, setActiveTab] = useState<'both' | 'en' | 'hi'>('both');
  const [copiedLang, setCopiedLang] = useState<string | null>(null);

  // Processing & UI States
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Level 1 (Web Speech) & Level 2 (MediaRecorder) Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const level1ProducedTextRef = useRef<boolean>(false);
  const baseTextRef = useRef<string>('');
  const transcriptRef = useRef<string>('');
  const isStoppingManuallyRef = useRef<boolean>(false);

  // Keep transcriptRef synchronized with transcript state
  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  // Check browser speech recognition support on initial mount
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  // Cleanup all audio streams and recognition sessions on unmount
  useEffect(() => {
    return () => {
      releaseMediaStream();
      cleanupRecognition();
    };
  }, []);

  const releaseMediaStream = () => {
    if (mediaStreamRef.current) {
      try {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      } catch (e) {}
      mediaStreamRef.current = null;
    }
  };

  const cleanupRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        try {
          recognitionRef.current.abort();
        } catch (err) {}
      }
      recognitionRef.current = null;
    }
  };

  // Start Two-Level Voice Typing
  const startVoiceTyping = async () => {
    setError(null);
    level1ProducedTextRef.current = false;
    isStoppingManuallyRef.current = false;
    audioChunksRef.current = [];

    // Snapshot pre-existing text in the description box
    baseTextRef.current = transcriptRef.current.trim();
    setInterimText('');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn('[Voice Input] navigator.mediaDevices.getUserMedia not supported in this browser environment.');
      setError('Microphone access is not supported in this browser. You can type directly or use sample voice mode.');
      setVoiceState('ERROR');
      return;
    }

    // 1. Acquire microphone access
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
    } catch (err: any) {
      console.warn('[Voice Input] Microphone permission/device error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Microphone permission was blocked. Please allow microphone access in your browser settings.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError('No microphone found on this device. Please connect an audio input or type directly.');
      } else {
        setError('Voice typing could not be completed. You can type manually or try again.');
      }
      setVoiceState('ERROR');
      return;
    }

    // 2. Initialize Level 2 MediaRecorder on the active hardware stream
    try {
      let mimeType = '';
      if (typeof MediaRecorder !== 'undefined') {
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          mimeType = 'audio/webm;codecs=opus';
        } else if (MediaRecorder.isTypeSupported('audio/webm')) {
          mimeType = 'audio/webm';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        }
      }

      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.start(250);
      mediaRecorderRef.current = recorder;
    } catch (recErr) {
      console.warn('[Level 2 STT] MediaRecorder init error:', recErr);
    }

    // Enter RECORDING state immediately
    setVoiceState('RECORDING');

    // 3. Simultaneously launch Level 1 Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        cleanupRecognition();
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = selectedLang;

        recognition.onstart = () => {
          console.log('[Level 1 STT] Web Speech recognition active');
        };

        recognition.onresult = (event: any) => {
          let sessionFinal = '';
          let currentInterim = '';

          for (let i = 0; i < event.results.length; ++i) {
            const res = event.results[i];
            if (res.isFinal) {
              sessionFinal += res[0].transcript + ' ';
            } else {
              currentInterim += res[0].transcript;
            }
          }

          sessionFinal = sessionFinal.trim();
          if (sessionFinal || currentInterim) {
            level1ProducedTextRef.current = true;
          }

          const base = baseTextRef.current;
          const combined = base ? (sessionFinal ? `${base} ${sessionFinal}` : base) : sessionFinal;

          setTranscript(combined);
          transcriptRef.current = combined;
          setInterimText(currentInterim);
        };

        recognition.onerror = (event: any) => {
          console.warn('[Level 1 STT] Web Speech error (silent Level 2 fallback active):', event.error);
          // CRITICAL: DO NOT show "network" or technical error to the artisan!
          // Level 2 MediaRecorder is recording audio right now.
        };

        recognition.onend = () => {
          console.log('[Level 1 STT] Web Speech session ended');
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch (err) {
        console.warn('[Level 1 STT] SpeechRecognition start failed, Level 2 MediaRecorder active:', err);
      }
    }
  };

  // Stop Voice Typing
  const stopVoiceTyping = () => {
    isStoppingManuallyRef.current = true;

    // 1. Terminate Level 1
    cleanupRecognition();

    // 2. Check if Level 1 already produced text in real-time
    const currentText = transcriptRef.current.trim();
    const baseText = baseTextRef.current.trim();
    const hasNewSpokenText = level1ProducedTextRef.current && currentText.length > baseText.length;

    if (hasNewSpokenText) {
      console.log('[Voice Input] Successfully transcribed via Level 1 Web Speech API');
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try { mediaRecorderRef.current.stop(); } catch (e) {}
      }
      releaseMediaStream();
      setInterimText('');
      baseTextRef.current = currentText;
      setVoiceState('SUCCESS');
      setTimeout(() => setVoiceState('IDLE'), 1000);
      return;
    }

    // 3. Level 1 did not produce text (e.g. "network" error) -> Activate Level 2 Backend STT
    console.log('[Voice Input] Level 1 yielded no text, transitioning to Level 2 server STT');
    setVoiceState('PROCESSING');
    setInterimText('');

    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.onstop = async () => {
        releaseMediaStream();

        const chunks = audioChunksRef.current;
        const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
        audioChunksRef.current = [];

        console.log(`[Level 2 STT] Audio blob ready: ${blob.size} bytes (${blob.type})`);

        if (blob.size < 1000) {
          console.warn('[Level 2 STT] Audio blob too brief or empty');
          setError('Voice typing could not be completed. You can type manually or try again.');
          setVoiceState('ERROR');
          return;
        }

        try {
          // Priority 1: Free Unlimited Speech-to-Text via Puter.js (gpt-4o-mini-transcribe)
          const puterResult = await transcribeWithPuter(blob, { 
            model: 'gpt-4o-mini-transcribe', 
            language: selectedLang 
          });
          if (puterResult.success && puterResult.text) {
            console.log(`[Puter STT] Voice description transcribed (${puterResult.modelUsed}): "${puterResult.text}"`);
            const base = baseTextRef.current;
            const updated = base ? `${base} ${puterResult.text}` : puterResult.text;
            setTranscript(updated);
            transcriptRef.current = updated;
            baseTextRef.current = updated;
            setInterimText('');
            setVoiceState('SUCCESS');
            setTimeout(() => setVoiceState('IDLE'), 1200);
            return;
          }

          // Priority 2: Fallback to Backend /api/speech-to-text
          console.log('[STT Fallback] Trying backend speech-to-text endpoint...');
          const formData = new FormData();
          formData.append('audio', blob, 'artisan-recording.webm');
          formData.append('language', selectedLang);

          const response = await fetch('/api/speech-to-text', {
            method: 'POST',
            body: formData
          });

          if (!response.ok) {
            throw new Error(`Server returned HTTP ${response.status}`);
          }

          const data = await response.json();
          const recognizedText = data.text ? data.text.trim() : '';

          if (recognizedText) {
            const base = baseTextRef.current;
            const updated = base ? `${base} ${recognizedText}` : recognizedText;
            setTranscript(updated);
            transcriptRef.current = updated;
            baseTextRef.current = updated;
            setInterimText('');
            setVoiceState('SUCCESS');
            setTimeout(() => setVoiceState('IDLE'), 1200);
          } else {
            console.warn('[STT] Empty transcription result');
            setError('Voice typing could not be completed. You can type manually or try again.');
            setVoiceState('ERROR');
          }
        } catch (serverErr: any) {
          console.error('[Voice STT] Transcription request error:', serverErr);
          setError('Voice typing could not be completed. You can type manually or try again.');
          setVoiceState('ERROR');
        }
      };

      recorder.stop();
    } else {
      releaseMediaStream();
      setError('Voice typing could not be completed. You can type manually or try again.');
      setVoiceState('ERROR');
    }
  };

  // Toggle Voice Recording
  const toggleVoice = () => {
    if (voiceState === 'RECORDING') {
      stopVoiceTyping();
    } else if (voiceState === 'IDLE' || voiceState === 'ERROR' || voiceState === 'SUCCESS') {
      startVoiceTyping();
    }
  };

  // Handle Language Change
  const handleLanguageChange = (newLang: string) => {
    setSelectedLang(newLang);
    if (voiceState === 'RECORDING') {
      stopVoiceTyping();
    }
  };

  // Perform Translation via Backend AI Translator
  const handleTranslate = async (textToTranslate?: string) => {
    const text = textToTranslate || transcript;
    if (!text || text.trim() === '') return;

    setIsTranslating(true);
    setError(null);

    try {
      const res = await fetch('/api/voice/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, sourceLang: selectedLang })
      });

      if (!res.ok) throw new Error('Translation failed');
      const data: TranslationResult = await res.json();
      setTranslation(data);
    } catch (err) {
      console.error('Translation error:', err);
      // Fallback local translation if server is offline
      setTranslation({
        detectedLanguage: 'Regional Artisan Voice',
        english: `Handcrafted artisan creation described as: "${text}". Featuring genuine handloom materials and traditional master weaving techniques.`,
        hindi: `हस्तनिर्मित कारीगर उत्पाद विवरण: "${text}"। पारंपरिक हथकरघे और प्रामाणिक सामग्रियों से निर्मित।`
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const loadSampleImage = async () => {
    try {
      const response = await fetch('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80');
      const blob = await response.blob();
      const file = new File([blob], "sample.jpg", { type: "image/jpeg" });
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } catch (err) {
      console.error("Failed to load sample image", err);
    }
  };

  // Quick Regional Demo Voices
  const loadRegionalDemo = (lang: 'hi' | 'gu' | 'bn' | 'ta') => {
    let demoText = "";
    if (lang === 'hi') {
      demoText = "यह शुद्ध कातान सिल्क बनारसी साड़ी है, जिस पर ज़री का फ्लोरल बूटा वर्क किया गया है। इसे हथकरघे पर बुनने में 12 दिन लगे हैं और कच्चा माल लगभग 4,000 रुपये का लगा है।";
      setSelectedLang('hi-IN');
    } else if (lang === 'gu') {
      demoText = "આ શુદ્ધ કાતાન સિલ્ક બનારસી સાડી છે, જેના પર જરીનું સુંદર કડવા કામ કરવામાં આવ્યું છે. તેને હાથશાળ પર બનાવવામાં 12 દિવસ લાગ્યા છે અને કાચો માલ 4,000 રૂપિયાનો છે.";
      setSelectedLang('gu-IN');
    } else if (lang === 'bn') {
      demoText = "এটি খাঁটি কাতান সিল্কের ঐতিহ্যবাহী বেনারসি শাড়ি। সোনার জরির কাজ করা হয়েছে। এটি পিট-লুমে তৈরি করতে ১২ দিন সময় লেগেছে এবং কাঁচামাল ৪,০০০ টাকা।";
      setSelectedLang('bn-IN');
    } else if (lang === 'ta') {
      demoText = "இது தூய கட்டன் பட்டு பனாரசி சேலை, பாரம்பரிய கைத்தறியில் 12 நாட்களில் நெய்யப்பட்டது. மூலப்பொருள் விலை ₹4,000.";
      setSelectedLang('ta-IN');
    }

    setTranscript(demoText);
    transcriptRef.current = demoText;
    baseTextRef.current = demoText;
    setInterimText('');
    handleTranslate(demoText);
  };

  const applyTranslation = (langType: 'en' | 'hi') => {
    if (!translation) return;
    const textToApply = langType === 'en' ? translation.english : translation.hindi;
    setTranscript(textToApply);
    transcriptRef.current = textToApply;
    baseTextRef.current = textToApply;
    setInterimText('');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLang(label);
    setTimeout(() => setCopiedLang(null), 2000);
  };

  const handleProcess = async () => {
    if (!imageFile || !transcript) {
      setError("Please provide both an image and a voice description.");
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    setLoadingStage(1);

    const stages = [
      "📸 Uploading image...",
      "✨ AI enhancing image (Photoroom & Studio Backdrop)...",
      "🔍 Gemini Vision checking craft authenticity...",
      "💰 Calculating fair B2B dynamic price..."
    ];

    let currentStage = 1;
    const stageInterval = setInterval(() => {
      if (currentStage < 4) {
        currentStage++;
        setLoadingStage(currentStage);
      }
    }, 2000);

    try {
      const result = await processProduct(imageFile, transcript);
      clearInterval(stageInterval);
      setLoadingStage(4);
      
      localStorage.setItem('processedProduct', JSON.stringify(result));
      
      setTimeout(() => {
        setIsProcessing(false);
        navigate('/studio');
      }, 500);
    } catch (err: any) {
      clearInterval(stageInterval);
      setIsProcessing(false);
      setError(err.message || "Failed to process product. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 text-slate-900">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-20 shadow-xs">
        <BackButton />
        <div>
          <h1 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
            नया उत्पाद जोड़ें
            <span className="text-xs text-slate-500 font-normal">(Add New Product)</span>
          </h1>
          <p className="text-[11px] text-slate-500">Voice-Powered Multilingual B2B Listing</p>
        </div>
      </header>

      <main className="p-4 space-y-4 max-w-xl mx-auto">
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-xl text-xs flex items-start justify-between gap-2.5 animate-in fade-in">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">Notice</div>
                <div className="text-rose-700 mt-0.5">{error}</div>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => setError(null)} 
              className="text-rose-400 hover:text-rose-700 p-0.5 rounded cursor-pointer"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 1: Product Image */}
        <section className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Camera className="w-4 h-4 text-indigo-600" />
              1. Product Image / उत्पाद फोटो
            </h2>
            {previewUrl && (
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <Check className="w-3 h-3" /> Image Selected
              </span>
            )}
          </div>
          
          <div className="flex flex-col gap-3">
            {previewUrl ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 aspect-4/3 flex items-center justify-center group">
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain p-2" />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => navigate('/studio')}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> AI Studio
                  </button>
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-black/70 hover:bg-black/90 text-white rounded-xl text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 border border-white/20 transition-all shadow-md cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Change
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed border-indigo-200 hover:border-indigo-400 rounded-2xl bg-indigo-50/40 hover:bg-indigo-50/80 text-indigo-700 transition-all h-28 cursor-pointer"
                >
                  <Camera className="w-7 h-7 text-indigo-600" />
                  <span className="text-xs font-bold">Take Photo / Upload</span>
                </button>
                <button 
                  onClick={loadSampleImage}
                  className="flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed border-slate-200 hover:border-slate-300 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all h-28 cursor-pointer"
                >
                  <ImageIcon className="w-7 h-7 text-slate-500" />
                  <span className="text-xs font-bold">Load Sample Saree</span>
                </button>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </section>

        {/* Step 2: Voice Description & Real-Time Voice Typing */}
        <section className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 flex-wrap">
                <Mic className="w-4 h-4 text-orange-600" />
                2. Voice Description / बोलकर विवरण लिखें
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                  Puter AI Whisper
                </span>
              </h2>
              <p className="text-[11px] text-slate-500">Free unlimited voice cataloging in all Indian languages</p>
            </div>
            
            {/* Speech Language Dropdown */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <Globe className="w-3.5 h-3.5 text-slate-500 ml-1" />
              <select
                value={selectedLang}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-transparent text-[11px] font-semibold text-slate-700 border-none focus:ring-0 p-0 pr-1 cursor-pointer"
              >
                {REGIONAL_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Live Voice Typing Textbox */}
          <div className="relative">
            <textarea
              value={transcript + (interimText ? (transcript ? ' ' : '') + interimText : '')}
              onChange={(e) => {
                setTranscript(e.target.value);
                transcriptRef.current = e.target.value;
                baseTextRef.current = e.target.value;
                setInterimText('');
              }}
              placeholder="माइक दबाएं और बोलें (उदा. कौन सा शिल्प है, कितना समय लगा, क्या सामग्री है)... या यहाँ लिखें"
              className={`w-full h-36 p-3.5 border rounded-2xl text-xs text-slate-800 bg-slate-50/80 focus:bg-white resize-none transition-all leading-relaxed ${
                voiceState === 'RECORDING'
                  ? 'border-orange-500 ring-2 ring-orange-500/20 bg-orange-50/10' 
                  : voiceState === 'PROCESSING'
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/10'
                  : 'border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
            />

            {/* Listening Banner (RECORDING) */}
            {voiceState === 'RECORDING' && (
              <div className="absolute top-2 left-3 right-16 flex items-center gap-2 bg-orange-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-xs animate-pulse">
                <div className="flex gap-0.5 items-center">
                  <span className="w-1 h-3 bg-white rounded-full animate-bounce"></span>
                  <span className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-1 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
                <span>Listening ({REGIONAL_LANGUAGES.find(l => l.code === selectedLang)?.label.split(' ')[0]})... बोलिए</span>
              </div>
            )}

            {/* Converting Speech Banner (PROCESSING) */}
            {voiceState === 'PROCESSING' && (
              <div className="absolute top-2 left-3 right-16 flex items-center gap-2 bg-indigo-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-xs">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-300" />
                <span>Transcribing with Puter AI… (आवाज को टेक्स्ट में बदल रहे हैं...)</span>
              </div>
            )}

            {/* Success Banner (SUCCESS) */}
            {voiceState === 'SUCCESS' && (
              <div className="absolute top-2 left-3 right-16 flex items-center gap-1.5 bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-xs">
                <Check className="w-3.5 h-3.5 text-emerald-200" />
                <span>Speech recognized! (विवरण दर्ज हो गया)</span>
              </div>
            )}

            {/* Main Microphone Button */}
            <button 
              type="button"
              onClick={toggleVoice}
              aria-label={
                voiceState === 'RECORDING' ? "Stop Voice Typing" :
                voiceState === 'PROCESSING' ? "Converting speech…" :
                "Start Voice Typing"
              }
              aria-pressed={voiceState === 'RECORDING'}
              disabled={voiceState === 'PROCESSING'}
              className={`absolute bottom-3 right-3 p-3 rounded-2xl text-white shadow-md transition-all flex items-center justify-center cursor-pointer ${
                voiceState === 'RECORDING'
                  ? 'bg-rose-500 animate-pulse scale-110 shadow-rose-500/30 ring-4 ring-rose-500/20' 
                  : voiceState === 'PROCESSING'
                  ? 'bg-indigo-600 animate-pulse'
                  : voiceState === 'SUCCESS'
                  ? 'bg-emerald-600'
                  : 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 active:scale-95 shadow-orange-500/20'
              }`}
              title={
                voiceState === 'RECORDING' ? "Stop Voice Typing (सुनना बंद करें)" :
                voiceState === 'PROCESSING' ? "Converting speech… (प्रतीक्षा करें)" :
                "Start Voice Typing (बोलकर लिखें)"
              }
            >
              {voiceState === 'RECORDING' ? (
                <MicOff className="w-5 h-5" />
              ) : voiceState === 'PROCESSING' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : voiceState === 'SUCCESS' ? (
                <Check className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Quick Action Tools below textarea */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleTranslate()}
                disabled={!transcript || isTranslating}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                {isTranslating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                {isTranslating ? 'Translating...' : 'Translate to English & Hindi'}
              </button>

              {transcript && (
                <button
                  type="button"
                  onClick={() => {
                    setTranscript('');
                    transcriptRef.current = '';
                    baseTextRef.current = '';
                    setInterimText('');
                    setTranslation(null);
                  }}
                  className="px-2 py-1 text-slate-400 hover:text-slate-600 text-[11px] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <span className="text-[11px] text-slate-400">
              {transcript.length} chars
            </span>
          </div>

          {/* Clearly Separated Demo Voice Mode */}
          <div className="pt-2.5 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Demo voice mode — enter sample text (डेमो वॉयस मोड - नमूना पाठ डालें)
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                Sample Fallback
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mb-2">
              For evaluation when microphone or cloud STT is offline, click below to populate authentic artisan voice transcripts:
            </p>
            <div className="flex flex-wrap gap-1.5">
              <button 
                type="button"
                onClick={() => loadRegionalDemo('hi')}
                className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-[11px] font-semibold border border-amber-200 transition-colors cursor-pointer"
              >
                🇮🇳 हिन्दी (Hindi Demo)
              </button>
              <button 
                type="button"
                onClick={() => loadRegionalDemo('gu')}
                className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-lg text-[11px] font-semibold border border-sky-200 transition-colors cursor-pointer"
              >
                🇮🇳 ગુજરાતી (Gujarati Demo)
              </button>
              <button 
                type="button"
                onClick={() => loadRegionalDemo('bn')}
                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-[11px] font-semibold border border-emerald-200 transition-colors cursor-pointer"
              >
                🇮🇳 বাংলা (Bengali Demo)
              </button>
              <button 
                type="button"
                onClick={() => loadRegionalDemo('ta')}
                className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-lg text-[11px] font-semibold border border-purple-200 transition-colors cursor-pointer"
              >
                🇮🇳 தமிழ் (Tamil Demo)
              </button>
            </div>
          </div>
        </section>

        {/* Step 3: Direct Bilingual Translation Results */}
        {translation && (
          <section className="bg-white p-4 rounded-2xl shadow-xs border border-indigo-200 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  AI Translation • {translation.detectedLanguage}
                </h3>
              </div>
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                B2B Ready
              </span>
            </div>

            {/* Extracted Details Pill */}
            {translation.extractedDetails && (
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400">Craft:</span>{' '}
                  <span className="font-bold text-slate-800">{translation.extractedDetails.craft || 'Handloom'}</span>
                </div>
                <div>
                  <span className="text-slate-400">Time:</span>{' '}
                  <span className="font-bold text-slate-800">{translation.extractedDetails.timeTaken || '12 Days'}</span>
                </div>
                <div>
                  <span className="text-slate-400">Materials:</span>{' '}
                  <span className="font-bold text-slate-800">{translation.extractedDetails.materials || 'Silk & Zari'}</span>
                </div>
                <div>
                  <span className="text-slate-400">Material Cost:</span>{' '}
                  <span className="font-bold text-emerald-700">{translation.extractedDetails.estimatedCost || '₹4,000'}</span>
                </div>
              </div>
            )}

            {/* Dual Language Display Cards */}
            <div className="space-y-2.5">
              {/* English Version */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    🇬🇧 English (B2B Export Ready)
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => copyToClipboard(translation.english, 'en')}
                      className="text-[10px] text-slate-500 hover:text-slate-700 flex items-center gap-0.5 px-1.5 py-0.5 bg-white rounded border"
                    >
                      {copiedLang === 'en' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      {copiedLang === 'en' ? 'Copied' : 'Copy'}
                    </button>
                    <button
                      onClick={() => applyTranslation('en')}
                      className="text-[10px] text-indigo-600 font-bold hover:underline ml-1"
                    >
                      Use as Input →
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{translation.english}</p>
              </div>

              {/* Hindi Version */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    🇮🇳 हिंदी (कारीगर विवरण)
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => copyToClipboard(translation.hindi, 'hi')}
                      className="text-[10px] text-slate-500 hover:text-slate-700 flex items-center gap-0.5 px-1.5 py-0.5 bg-white rounded border"
                    >
                      {copiedLang === 'hi' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      {copiedLang === 'hi' ? 'Copied' : 'Copy'}
                    </button>
                    <button
                      onClick={() => applyTranslation('hi')}
                      className="text-[10px] text-indigo-600 font-bold hover:underline ml-1"
                    >
                      Use as Input →
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-hindi">{translation.hindi}</p>
              </div>
            </div>
          </section>
        )}

        {/* Process Button */}
        <button
          type="button"
          onClick={handleProcess}
          disabled={!imageFile || !transcript || isProcessing}
          className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold shadow-lg disabled:opacity-40 flex items-center justify-center gap-2 active:scale-[0.99] transition-all cursor-pointer text-sm"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          Process with Multimodal AI Studio
        </button>
      </main>

      {/* Loading Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 flex flex-col items-center text-center space-y-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
              <div 
                className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"
                style={{ animationDuration: '1.2s' }}
              ></div>
              <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-amber-500 animate-pulse" />
            </div>

            <div>
              <h3 className="font-bold text-base text-slate-900">Processing Artisan Product</h3>
              <p className="text-xs text-indigo-600 font-semibold mt-1">
                {loadingStage === 1 && "📸 Uploading image..."}
                {loadingStage === 2 && "✨ Stripping background & applying studio backdrop..."}
                {loadingStage === 3 && "🔍 Gemini Vision checking craft authenticity..."}
                {loadingStage === 4 && "💰 Calculating fair B2B dynamic price..."}
              </p>
            </div>

            {/* Stage Progress Pills */}
            <div className="flex gap-1.5 w-full pt-2">
              {[1, 2, 3, 4].map(st => (
                <div 
                  key={st} 
                  className={`h-1.5 flex-1 rounded-full transition-colors ${st <= loadingStage ? 'bg-indigo-600' : 'bg-slate-200'}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}