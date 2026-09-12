import { useState, useCallback, useEffect, useRef } from 'react';
import { transcribeWithPuter } from '@/lib/puterVoice';

export type VoiceState = 'IDLE' | 'RECORDING' | 'PROCESSING' | 'SUCCESS' | 'ERROR';

export const useSpeechRecognition = (defaultLang = 'hi-IN') => {
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [voiceState, setVoiceState] = useState<VoiceState>('IDLE');
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState(defaultLang);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const level1ProducedTextRef = useRef<boolean>(false);
  const baseTextRef = useRef<string>('');
  const transcriptRef = useRef<string>('');

  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSupported(false);
      }
    }
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

  useEffect(() => {
    return () => {
      releaseMediaStream();
      cleanupRecognition();
    };
  }, []);

  const stopListening = useCallback(() => {
    cleanupRecognition();

    const currentText = transcriptRef.current.trim();
    const baseText = baseTextRef.current.trim();
    const hasNewSpokenText = level1ProducedTextRef.current && currentText.length > baseText.length;

    if (hasNewSpokenText) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try { mediaRecorderRef.current.stop(); } catch (e) {}
      }
      releaseMediaStream();
      setInterimTranscript('');
      baseTextRef.current = currentText;
      setVoiceState('SUCCESS');
      setTimeout(() => setVoiceState('IDLE'), 1000);
      return;
    }

    setVoiceState('PROCESSING');
    setInterimTranscript('');

    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.onstop = async () => {
        releaseMediaStream();
        const chunks = audioChunksRef.current;
        const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
        audioChunksRef.current = [];

        if (blob.size < 1000) {
          setError('Voice typing could not be completed. You can type manually or try again.');
          setVoiceState('ERROR');
          return;
        }

        try {
          // Priority 1: Free Unlimited Puter.js Speech-to-Text (Whisper & GPT-4o)
          const puterResult = await transcribeWithPuter(blob, lang);
          if (puterResult.success && puterResult.text) {
            console.log(`[Puter STT Hook] Recognized via ${puterResult.provider}: "${puterResult.text}"`);
            const base = baseTextRef.current;
            const updated = base ? `${base} ${puterResult.text}` : puterResult.text;
            setTranscript(updated);
            transcriptRef.current = updated;
            baseTextRef.current = updated;
            setInterimTranscript('');
            setVoiceState('SUCCESS');
            setTimeout(() => setVoiceState('IDLE'), 1200);
            return;
          }

          // Priority 2: Fallback to Backend Speech-to-Text
          const formData = new FormData();
          formData.append('audio', blob, 'recording.webm');
          formData.append('language', lang);

          const response = await fetch('/api/speech-to-text', {
            method: 'POST',
            body: formData
          });

          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const data = await response.json();
          const recognizedText = data.text ? data.text.trim() : '';

          if (recognizedText) {
            const base = baseTextRef.current;
            const updated = base ? `${base} ${recognizedText}` : recognizedText;
            setTranscript(updated);
            transcriptRef.current = updated;
            baseTextRef.current = updated;
            setInterimTranscript('');
            setVoiceState('SUCCESS');
            setTimeout(() => setVoiceState('IDLE'), 1200);
          } else {
            setError('Voice typing could not be completed. You can type manually or try again.');
            setVoiceState('ERROR');
          }
        } catch (serverErr) {
          console.error('[STT Hook] Error:', serverErr);
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
  }, [lang]);

  const startListening = useCallback(async () => {
    setError(null);
    level1ProducedTextRef.current = false;
    audioChunksRef.current = [];
    baseTextRef.current = transcriptRef.current.trim();
    setInterimTranscript('');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Microphone access is not supported in this browser.');
      setVoiceState('ERROR');
      return;
    }

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Microphone permission was blocked. Please allow microphone access in your browser settings.');
      } else {
        setError('Voice typing could not be completed. You can type manually or try again.');
      }
      setVoiceState('ERROR');
      return;
    }

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
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      recorder.start(250);
      mediaRecorderRef.current = recorder;
    } catch (e) {
      console.warn('MediaRecorder error:', e);
    }

    setVoiceState('RECORDING');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        cleanupRecognition();
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = lang;

        recognition.onresult = (event: any) => {
          let sessionFinal = '';
          let currentInterim = '';

          for (let i = 0; i < event.results.length; ++i) {
            const res = event.results[i];
            if (res.isFinal) sessionFinal += res[0].transcript + ' ';
            else currentInterim += res[0].transcript;
          }

          sessionFinal = sessionFinal.trim();
          if (sessionFinal || currentInterim) level1ProducedTextRef.current = true;

          const base = baseTextRef.current;
          const combined = base ? (sessionFinal ? `${base} ${sessionFinal}` : base) : sessionFinal;

          setTranscript(combined);
          transcriptRef.current = combined;
          setInterimTranscript(currentInterim);
        };

        recognition.onerror = (event: any) => {
          console.warn('[useSpeechRecognition] Level 1 Web Speech error:', event.error);
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch (e) {
        console.warn('SpeechRecognition start error:', e);
      }
    }
  }, [lang]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    transcriptRef.current = '';
    baseTextRef.current = '';
    setInterimTranscript('');
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { 
    transcript, 
    interimTranscript,
    isListening: voiceState === 'RECORDING',
    voiceState,
    isSupported, 
    startListening, 
    stopListening, 
    resetTranscript,
    setTranscript,
    clearError,
    setLang,
    lang,
    error 
  };
};
