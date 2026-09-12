/**
 * Puter.js Free, Unlimited Speech-to-Text Integration
 * Based on Puter AI Speech-to-Text: https://developer.puter.com/tutorials/free-unlimited-speech-to-text-api/
 * 
 * Provides free, unlimited transcription powered by OpenAI Whisper and GPT-4o Transcribe models
 * without requiring any API keys or billing.
 */

declare global {
  interface Window {
    puter?: {
      ai?: {
        speech2txt: (
          source: string | File | Blob | { audio?: string | File | Blob; file?: string | File | Blob; [key: string]: any },
          options?: any,
          testMode?: boolean
        ) => Promise<any>;
      };
      print?: (...args: any[]) => void;
    };
  }
}

/**
 * Ensures Puter.js is loaded in the browser
 */
export async function ensurePuterLoaded(): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  if (window.puter?.ai?.speech2txt) {
    return true;
  }

  // If script is not yet present, inject it dynamically
  return new Promise((resolve) => {
    const existing = document.querySelector('script[src*="js.puter.com"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(!!window.puter?.ai?.speech2txt));
      existing.addEventListener('error', () => resolve(false));
      // In case it already loaded
      if (window.puter?.ai?.speech2txt) return resolve(true);
      setTimeout(() => resolve(!!window.puter?.ai?.speech2txt), 2500);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.puter.com/v2/';
    script.async = true;
    script.onload = () => {
      console.log('[Puter.js] Speech-to-Text library loaded successfully');
      resolve(!!window.puter?.ai?.speech2txt);
    };
    script.onerror = (err) => {
      console.warn('[Puter.js] Failed to load library script:', err);
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

/**
 * Maps full locale (e.g. 'hi-IN', 'bn-IN') to ISO 639-1 code ('hi', 'bn') for Whisper
 */
export function mapLanguageToIso(lang: string = 'hi-IN'): string {
  const code = lang.split('-')[0].toLowerCase();
  const validIsoCodes: Record<string, string> = {
    hi: 'hi', // Hindi
    en: 'en', // English
    bn: 'bn', // Bengali
    mr: 'mr', // Marathi
    gu: 'gu', // Gujarati
    ta: 'ta', // Tamil
    te: 'te', // Telugu
    kn: 'kn', // Kannada
    pa: 'pa', // Punjabi
    ml: 'ml', // Malayalam
    or: 'or', // Odia
    ur: 'ur'  // Urdu
  };
  return validIsoCodes[code] || 'hi';
}

export interface PuterTranscriptionResult {
  success: boolean;
  text: string;
  provider: 'puter-whisper' | 'puter-gpt4o' | 'backend-fallback' | 'failed';
  error?: string;
}

/**
 * Transcribes audio recording using Puter's Free, Unlimited Speech-to-Text API.
 * Uses OpenAI Whisper-1 model first, with fallback to gpt-4o-mini-transcribe.
 * 
 * @param audioBlob - The recorded audio Blob or File from MediaRecorder
 * @param language - Target language tag (e.g. 'hi-IN', 'en-IN')
 */
export async function transcribeWithPuter(
  audioBlob: Blob | File,
  language: string = 'hi-IN'
): Promise<PuterTranscriptionResult> {
  const isLoaded = await ensurePuterLoaded();
  if (!isLoaded || !window.puter?.ai?.speech2txt) {
    console.warn('[Puter STT] Puter.js is not available in current environment');
    return {
      success: false,
      text: '',
      provider: 'failed',
      error: 'Puter library not initialized'
    };
  }

  const isoLang = mapLanguageToIso(language);
  console.log(`[Puter STT] Initiating transcription with language hint: ${isoLang}, audio size: ${audioBlob.size} bytes`);

  // Attempt 1: OpenAI Whisper via Puter.js
  try {
    const result = await window.puter.ai.speech2txt(audioBlob, {
      model: 'whisper-1',
      language: isoLang,
      response_format: 'json'
    });

    const text = (typeof result === 'string' ? result : (result?.text || '')).trim();
    if (text) {
      console.log(`[Puter STT] Whisper successfully transcribed: "${text}"`);
      return {
        success: true,
        text,
        provider: 'puter-whisper'
      };
    }
  } catch (err: any) {
    console.warn('[Puter STT] Whisper attempt error:', err?.message || err);
  }

  // Attempt 2: gpt-4o-mini-transcribe via Puter.js
  try {
    const result = await window.puter.ai.speech2txt(audioBlob, {
      model: 'gpt-4o-mini-transcribe',
      language: isoLang
    });

    const text = (typeof result === 'string' ? result : (result?.text || '')).trim();
    if (text) {
      console.log(`[Puter STT] GPT-4o Mini successfully transcribed: "${text}"`);
      return {
        success: true,
        text,
        provider: 'puter-gpt4o'
      };
    }
  } catch (err: any) {
    console.warn('[Puter STT] GPT-4o Mini attempt error:', err?.message || err);
  }

  // Attempt 3: Default model invocation
  try {
    const result = await window.puter.ai.speech2txt(audioBlob);
    const text = (typeof result === 'string' ? result : (result?.text || '')).trim();
    if (text) {
      return {
        success: true,
        text,
        provider: 'puter-whisper'
      };
    }
  } catch (err: any) {
    console.warn('[Puter STT] Bare invocation error:', err?.message || err);
  }

  return {
    success: false,
    text: '',
    provider: 'failed',
    error: 'All Puter transcription attempts yielded empty text'
  };
}
