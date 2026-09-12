/**
 * Puter.js Free, Unlimited Speech-to-Text Integration
 * Official Documentation: https://developer.puter.com/tutorials/free-unlimited-speech-to-text-api/
 * 
 * Free, unlimited, keyless Speech-to-Text powered by Puter.js.
 * - Default Model: 'gpt-4o-mini-transcribe' (fast interactive voice-input)
 * - Configurable Model: 'gpt-4o-transcribe' (higher precision) or 'whisper-1'
 * - Zero API key / zero backend proxy requirement.
 * - Native File / Blob handling.
 * - Multilingual verbatim transcription (preserves user's spoken language without forced translation).
 */

import puter from '@heyputer/puter.js';

export type PuterSTTModel = 'gpt-4o-mini-transcribe' | 'gpt-4o-transcribe' | 'whisper-1';

export const DEFAULT_STT_MODEL: PuterSTTModel = 'gpt-4o-mini-transcribe';

/**
 * Ensures Puter instance is initialized in the browser environment
 */
export async function getPuterInstance(): Promise<any> {
  if (typeof window !== 'undefined' && typeof (window as any).puter?.ai?.speech2txt === 'function') {
    return (window as any).puter;
  }

  if (typeof (puter as any)?.ai?.speech2txt === 'function') {
    return puter;
  }

  // Fallback: Dynamically ensure official script is loaded if not already ready
  if (typeof window !== 'undefined') {
    const existing = document.querySelector('script[src*="js.puter.com"]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://js.puter.com/v2/';
      script.async = true;
      document.head.appendChild(script);
      await new Promise((resolve) => {
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        setTimeout(() => resolve(false), 2000);
      });
    }

    if (typeof (window as any).puter?.ai?.speech2txt === 'function') {
      return (window as any).puter;
    }
  }

  return puter;
}

/**
 * Normalizes language locale to ISO 639-1 code hint (e.g. 'hi-IN' -> 'hi')
 */
export function mapLanguageToIso(lang: string = 'hi-IN'): string {
  if (!lang) return 'hi';
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
  return validIsoCodes[code] || code;
}

export interface PuterTranscriptionResult {
  success: boolean;
  text: string;
  modelUsed: PuterSTTModel | 'default';
  error?: string;
}

export interface PuterTranscriptionOptions {
  model?: PuterSTTModel;
  language?: string;
}

/**
 * Transcribes an audio recording using Puter.js Speech-to-Text.
 * Passes the browser File or Blob directly to puter.ai.speech2txt().
 * 
 * @param audioFile - Browser File or Blob from MediaRecorder
 * @param options - Configuration options (model, language hint) or a language string (e.g. 'hi-IN')
 */
export async function transcribeWithPuter(
  audioFile: Blob | File,
  options?: PuterTranscriptionOptions | string
): Promise<PuterTranscriptionResult> {
  const opts: PuterTranscriptionOptions = typeof options === 'string' ? { language: options } : (options || {});
  const modelToUse: PuterSTTModel = opts.model || DEFAULT_STT_MODEL;
  const isoLang = mapLanguageToIso(opts.language || 'hi-IN');

  // Guard against empty / truncated audio
  if (!audioFile || audioFile.size < 500) {
    return {
      success: false,
      text: '',
      modelUsed: modelToUse,
      error: 'Audio recording is empty or too short.'
    };
  }

  try {
    const puterInstance = await getPuterInstance();
    if (!puterInstance?.ai?.speech2txt) {
      throw new Error('Puter Speech-to-Text library is not initialized.');
    }

    console.log(`[Puter STT] Transcribing ${audioFile.size} bytes using model: ${modelToUse}, lang hint: ${isoLang}`);

    // PRIMARY ATTEMPT: Specified model (defaults to gpt-4o-mini-transcribe for fast interactive voice input)
    // IMPORTANT: translate is NOT enabled to preserve the user's spoken language verbatim.
    const result = await puterInstance.ai.speech2txt(audioFile, {
      model: modelToUse,
      language: isoLang
    });

    const parsedText = (typeof result === 'string' ? result : (result?.text || '')).trim();
    if (parsedText) {
      console.log(`[Puter STT] Successfully transcribed (${modelToUse}): "${parsedText}"`);
      return {
        success: true,
        text: parsedText,
        modelUsed: modelToUse
      };
    }
  } catch (err: any) {
    console.warn(`[Puter STT] Primary attempt with ${modelToUse} failed:`, err?.message || err);
  }

  // FALLBACK ATTEMPT 1: If gpt-4o-mini-transcribe failed or returned empty, try whisper-1
  if (modelToUse !== 'whisper-1') {
    try {
      const puterInstance = await getPuterInstance();
      const result = await puterInstance.ai.speech2txt(audioFile, {
        model: 'whisper-1',
        language: isoLang
      });

      const parsedText = (typeof result === 'string' ? result : (result?.text || '')).trim();
      if (parsedText) {
        console.log(`[Puter STT] Fallback to whisper-1 succeeded: "${parsedText}"`);
        return {
          success: true,
          text: parsedText,
          modelUsed: 'whisper-1'
        };
      }
    } catch (whisperErr: any) {
      console.warn('[Puter STT] Fallback whisper-1 failed:', whisperErr?.message || whisperErr);
    }
  }

  // FALLBACK ATTEMPT 2: Bare source invocation
  try {
    const puterInstance = await getPuterInstance();
    const result = await puterInstance.ai.speech2txt(audioFile);
    const parsedText = (typeof result === 'string' ? result : (result?.text || '')).trim();
    if (parsedText) {
      return {
        success: true,
        text: parsedText,
        modelUsed: 'default'
      };
    }
  } catch (bareErr: any) {
    console.warn('[Puter STT] Bare speech2txt failed:', bareErr?.message || bareErr);
  }

  return {
    success: false,
    text: '',
    modelUsed: modelToUse,
    error: 'Speech-to-text could not transcribe audio.'
  };
}
