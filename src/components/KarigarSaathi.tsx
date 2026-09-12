import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { transcribeWithPuter } from '@/lib/puterVoice';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Trash2, 
  X, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Bot, 
  User, 
  Loader2,
  TrendingUp,
  Package,
  Store,
  Plus,
  BarChart2,
  Tag,
  UserCheck
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { askAssistant } from '@/lib/api';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  action?: {
    type: 'NAVIGATE' | 'CONFIRM_PRICE_CHANGE' | 'OPEN_MODAL';
    route?: string;
    label: string;
    payload?: any;
  } | null;
  isDemoMode?: boolean;
  actionConfirmed?: boolean;
}

export default function KarigarSaathi() {
  const navigate = useNavigate();
  const { state, addToast } = useApp();
  const isHi = state.language === 'hi';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: isHi 
        ? "नमस्ते! मैं कारीगर साथी हूँ—आपका AI डिजिटल व्यापार सहायक। आप मुझसे अपने मुनाफ़े, सक्रिय उत्पादों, B2B खरीदारों, या उत्पाद की कीमत के बारे में पूछ सकते हैं। बोलकर या लिखकर पूछिए!"
        : "Hello! I am Karigar Saathi, your AI Business Assistant. Ask me anything about your profit, products, B2B wholesale buyers, or pricing. You can speak or type!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDemoMode: true
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  // References
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Text to Speech
  const handleSpeak = (messageId: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown/symbols from speech
    const cleanText = text
      .replace(/[*_#`]/g, '')
      .replace(/•/g, '')
      .replace(/[\n\r]+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const hasHindiChar = /[\u0900-\u097F]/.test(text);
    utterance.lang = hasHindiChar ? 'hi-IN' : 'en-US';
    utterance.rate = 0.95;

    // Pick appropriate system voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => 
      hasHindiChar ? v.lang.startsWith('hi') : v.lang.startsWith('en')
    );
    if (matchedVoice) utterance.voice = matchedVoice;

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(messageId);
    window.speechSynthesis.speak(utterance);
  };

  // Send message to AI Assistant Backend
  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-6).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await askAssistant(textToSend, isHi ? 'hi' : 'en', historyPayload);

      const botMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: res.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: res.action || null,
        isDemoMode: Boolean(res.isDemoMode)
      };

      setMessages(prev => [...prev, botMessage]);

      // Automatically speak the response if the user triggered it via voice
      if (isRecording) {
        handleSpeak(botMessage.id, res.response);
      }
    } catch (err: any) {
      console.error('Karigar Saathi assistant error:', err);
      const errorMessage: ChatMessage = {
        id: `assistant-err-${Date.now()}`,
        role: 'assistant',
        content: isHi 
          ? "Karigar Saathi अभी उपलब्ध नहीं है। कृपया थोड़ी देर बाद फिर कोशिश करें।" 
          : "Karigar Saathi is temporarily unavailable. Please try again shortly.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDemoMode: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Two-Level Hybrid Voice Input System
  const startVoiceInput = () => {
    if (isRecording) {
      stopVoiceInput();
      return;
    }

    setIsRecording(true);

    // LEVEL 1: Try Web Speech API (Fast Path)
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = isHi ? 'hi-IN' : 'en-IN';
        recognition.interimResults = true;
        recognition.continuous = false;

        recognition.onresult = (event: any) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
          }
          if (transcript) {
            setInputText(transcript);
          }
        };

        recognition.onend = () => {
          setIsRecording(false);
          // If we captured speech, auto-send
          if (inputText.trim()) {
            handleSendMessage(inputText.trim());
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('[Karigar Saathi] Web Speech error, falling back to MediaRecorder:', event.error);
          recognition.stop();
          // LEVEL 2: Fallback to MediaRecorder + backend /api/speech-to-text
          startMediaRecorderFallback();
        };

        recognitionRef.current = recognition;
        recognition.start();
        return;
      } catch (e) {
        console.warn('SpeechRecognition initialization error:', e);
      }
    }

    // LEVEL 2: MediaRecorder fallback if Web Speech API is missing
    startMediaRecorderFallback();
  };

  // MediaRecorder Fallback
  const startMediaRecorderFallback = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

        if (audioBlob.size > 800) {
          try {
            // Priority 1: Free Unlimited Puter.js STT (OpenAI Whisper)
            const targetLang = isHi ? 'hi-IN' : 'en-IN';
            const puterRes = await transcribeWithPuter(audioBlob, targetLang);
            if (puterRes.success && puterRes.text.trim()) {
              console.log('[Puter STT Assistant] Transcribed:', puterRes.text);
              setInputText(puterRes.text.trim());
              handleSendMessage(puterRes.text.trim());
              setIsRecording(false);
              return;
            }

            // Priority 2: Fallback to backend /api/speech-to-text
            const formData = new FormData();
            formData.append('audio', audioBlob, 'speech.webm');
            formData.append('language', targetLang);

            const res = await fetch('/api/speech-to-text', {
              method: 'POST',
              body: formData
            });

            if (res.ok) {
              const data = await res.json();
              if (data.text && data.text.trim()) {
                setInputText(data.text.trim());
                handleSendMessage(data.text.trim());
              }
            }
          } catch (err) {
            console.error('Speech-to-text failed:', err);
          }
        }
        setIsRecording(false);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(250);
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone access denied:', err);
      setIsRecording(false);
      addToast(isHi ? 'माइक्रोफ़ोन अनुमति आवश्यक है' : 'Microphone permission required');
    }
  };

  const stopVoiceInput = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {}
    }
  };

  // Action Dispatcher
  const handleExecuteAction = (action: ChatMessage['action'], messageId: string) => {
    if (!action) return;

    if (action.type === 'NAVIGATE' && action.route) {
      setIsOpen(false);
      navigate(action.route);
    } else if (action.type === 'CONFIRM_PRICE_CHANGE') {
      setMessages(prev => prev.map(m => m.id === messageId ? { ...m, actionConfirmed: true } : m));
      addToast(isHi ? `मूल्य ₹${action.payload?.price} के रूप में अपडेट किया गया!` : `Price updated to ₹${action.payload?.price}!`);
    }
  };

  // Quick Action Pills
  const quickActions = [
    { label: isHi ? '💰 मेरा Profit देखें' : '💰 My Profit', query: 'मेरा profit कितना है?' },
    { label: isHi ? '📦 मेरे Products' : '📦 My Products', query: 'मेरे products दिखाओ' },
    { label: isHi ? '🤝 Buyers खोजें' : '🤝 Find Buyers', query: 'मेरे buyers दिखाओ' },
    { label: isHi ? '➕ नया Product' : '➕ New Product', query: 'नया product जोड़ना है' },
    { label: isHi ? '📊 मेरी Analytics' : '📊 My Analytics', query: 'मेरी analytics खोलो' },
    { label: isHi ? '🏷️ Price बताओ' : '🏷️ Pricing Range', query: 'इस product की price बताओ' },
    { label: isHi ? '🪪 मेरा Profile' : '🪪 My Profile', query: 'मेरी profile दिखाओ' }
  ];

  const clearChat = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMessageId(null);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: isHi 
          ? "नमस्ते! नया सत्र शुरू हुआ। आप मुझसे कोई भी प्रश्न पूछ सकते हैं।" 
          : "Hello! Fresh session started. What can I help your business with today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDemoMode: true
      }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button on Bottom-Right */}
      <div className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-1.5">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 active:scale-95 border-2 border-white/80"
          title="Karigar Saathi — AI Business Assistant"
          aria-label="Open Karigar Saathi AI Assistant"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <span className="font-bold text-xs tracking-wide">
            {isHi ? 'कारीगर साथी AI' : 'Karigar Saathi AI'}
          </span>
        </button>
      </div>

      {/* Main Bottom Sheet / Assistant Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsOpen(false)} 
          />

          {/* Assistant Sheet */}
          <div className="relative bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 overflow-hidden flex flex-col max-h-[85vh] h-[650px] w-full max-w-lg mx-auto animate-in slide-in-from-bottom duration-300">
            {/* Top Drag Indicator */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2.5 shrink-0" />

            {/* Header */}
            <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xs">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                      Karigar Saathi
                    </h3>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live AI
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {isHi ? 'कारीगरों के लिए AI व्यापार सहायक' : 'AI Business Assistant for Artisans'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button 
                  onClick={clearChat} 
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  title={isHi ? 'बातचीत साफ करें' : 'Clear chat'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Action Pills Scrollable Row */}
            <div className="px-3 py-2 bg-slate-50/80 border-b border-slate-100 flex gap-1.5 overflow-x-auto hide-scrollbar shrink-0">
              {quickActions.map((act, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(act.query)}
                  className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-[11px] font-semibold rounded-full border border-slate-200 shadow-2xs transition-all shrink-0 active:scale-95"
                >
                  {act.label}
                </button>
              ))}
            </div>

            {/* Conversation Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-2xs">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] rounded-2xl p-3 shadow-xs space-y-2 ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-br-xs' 
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                  }`}>
                    {/* Message Text */}
                    <div className="text-xs leading-relaxed whitespace-pre-line font-medium">
                      {msg.content}
                    </div>

                    {/* Action Execution Button (If any) */}
                    {msg.action && msg.role === 'assistant' && (
                      <div className="pt-1 border-t border-slate-100 flex flex-col gap-1.5">
                        {msg.action.type === 'NAVIGATE' && (
                          <button
                            onClick={() => handleExecuteAction(msg.action, msg.id)}
                            className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs py-2 px-3 rounded-xl border border-indigo-200 flex items-center justify-between transition-colors shadow-2xs group"
                          >
                            <span>{msg.action.label}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        )}

                        {msg.action.type === 'CONFIRM_PRICE_CHANGE' && (
                          <div className="space-y-1.5">
                            {!msg.actionConfirmed ? (
                              <div className="grid grid-cols-2 gap-2 pt-1">
                                <button
                                  onClick={() => handleExecuteAction(msg.action, msg.id)}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 shadow-xs"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>{isHi ? 'पुष्टि करें' : 'Confirm'}</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, actionConfirmed: true } : m));
                                    addToast(isHi ? 'मूल्य परिवर्तन रद्द किया गया' : 'Price change cancelled');
                                  }}
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-1.5 px-2 rounded-lg border border-slate-200 flex items-center justify-center gap-1"
                                >
                                  <X className="w-3.5 h-3.5" />
                                  <span>{isHi ? 'रद्द करें' : 'Cancel'}</span>
                                </button>
                              </div>
                            ) : (
                              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 p-1 rounded border border-emerald-200">
                                <Check className="w-3 h-3 text-emerald-600" />
                                {isHi ? 'कार्रवाई पूर्ण हुई' : 'Action confirmed'}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Footer: Timestamp & Audio Speak Button */}
                    <div className="flex items-center justify-between pt-0.5 text-[10px] opacity-75">
                      <span>{msg.timestamp}</span>

                      {msg.role === 'assistant' && (
                        <div className="flex items-center gap-2">
                          {msg.isDemoMode && (
                            <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">
                              Verified Data
                            </span>
                          )}
                          <button
                            onClick={() => handleSpeak(msg.id, msg.content)}
                            className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${
                              speakingMessageId === msg.id 
                                ? 'text-rose-600 font-bold bg-rose-50 animate-pulse' 
                                : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-100'
                            }`}
                            title="Listen with Speech Synthesis"
                          >
                            {speakingMessageId === msg.id ? (
                              <>
                                <VolumeX className="w-3.5 h-3.5" />
                                <span>{isHi ? 'रुकें' : 'Stop'}</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5" />
                                <span>{isHi ? 'सुनें' : 'Listen'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-xl bg-slate-200 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing / Loading Indicator */}
              {isLoading && (
                <div className="flex gap-2.5 items-center text-slate-500">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 flex items-center gap-2 shadow-2xs text-xs">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                    <span className="font-medium text-slate-600">
                      {isHi ? 'साथी सोच रहा है...' : 'Karigar Saathi is thinking...'}
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-white border-t border-slate-200 shrink-0">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                {/* Voice Input Button */}
                <button
                  type="button"
                  onClick={startVoiceInput}
                  className={`p-2.5 rounded-xl border transition-all shadow-2xs shrink-0 ${
                    isRecording 
                      ? 'bg-rose-500 text-white border-rose-600 animate-pulse scale-105' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                  title={isRecording ? 'Listening... click to stop' : 'Click to speak in Hindi/English'}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-indigo-600" />}
                </button>

                {/* Text Input */}
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    isRecording 
                      ? (isHi ? 'बोलिए, सुन रहा हूँ...' : 'Listening... speak now') 
                      : (isHi ? 'यहाँ लिखें या पूछें (हिंदी / English)...' : 'Ask anything in Hindi, Hinglish or English...')
                  }
                  disabled={isLoading}
                  className="flex-1 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all"
                />

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors shrink-0"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

