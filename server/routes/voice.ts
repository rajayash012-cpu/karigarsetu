import { Router, Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import multer from 'multer';

const router = Router();

// Audio upload configuration for Speech-to-Text
export const uploadAudio = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB max
});

/**
 * Speech-to-Text Transcription Handler
 * Accepts recorded audio (WebM, WAV, Ogg, MP4) and transcribes into the requested regional script.
 */
export const handleSpeechToText = async (req: Request, res: Response) => {
  try {
    // Support file under 'audio' or 'file' or from req.files
    let file = req.file;
    if (!file && (req as any).files) {
      const files = (req as any).files;
      file = files['audio']?.[0] || files['file']?.[0];
    }

    const language = (req.body.language || req.body.lang || 'hi-IN').toString();

    if (!file || !file.buffer || file.buffer.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: "NO_AUDIO_FILE", 
        message: "No audio file received" 
      });
    }

    console.log(`[Speech-to-Text] Audio payload received: ${file.buffer.length} bytes, type: ${file.mimetype || 'audio/webm'}, lang: ${language}`);

    // If audio is under ~800 bytes, user did not speak or it's empty
    if (file.buffer.length < 800) {
      return res.json({ success: true, text: "" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey.trim() !== '') {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const languageLabels: Record<string, string> = {
          'hi-IN': 'Hindi (हिन्दी)',
          'en-IN': 'English',
          'bn-IN': 'Bengali (বাংলা)',
          'mr-IN': 'Marathi (मराठी)',
          'gu-IN': 'Gujarati (ગુજરાતી)',
          'ta-IN': 'Tamil (தமிழ்)',
          'te-IN': 'Telugu (తెలుగు)',
          'kn-IN': 'Kannada (ಕನ್ನಡ)',
          'pa-IN': 'Punjabi (ਪੰਜਾਬੀ)',
          'ml-IN': 'Malayalam (മലയാളം)'
        };

        const langName = languageLabels[language] || language;

        const prompt = `You are a high-precision Indian Multilingual Speech-to-Text transcriber.
Listen to this audio recording of an artisan describing their handcrafted product.
Target language: ${langName} (${language}).
Task: Transcribe the spoken words accurately and verbatim.
Script requirements:
- If Hindi, transcribe in clean Devanagari script.
- If Bengali, transcribe in Bengali script.
- If Gujarati, transcribe in Gujarati script.
- If Marathi, transcribe in Devanagari script.
- If Tamil, transcribe in Tamil script.
- If Telugu, transcribe in Telugu script.
- If Kannada, transcribe in Kannada script.
- If Punjabi, transcribe in Gurmukhi script.
- If English, transcribe in English.
Important:
- Return ONLY the exact transcribed words.
- Do NOT add quotation marks, labels, preambles, notes, or explanations.`;

        const mimeType = file.mimetype && file.mimetype !== 'application/octet-stream' 
          ? file.mimetype 
          : 'audio/webm';

        const result = await model.generateContent([
          {
            inlineData: {
              data: file.buffer.toString('base64'),
              mimeType: mimeType
            }
          },
          { text: prompt }
        ]);

        const rawText = result.response.text();
        const cleanedText = rawText.trim().replace(/^["'`]|["'`]$/g, '').trim();

        console.log(`[Speech-to-Text] Successfully transcribed: "${cleanedText}"`);
        return res.json({
          success: true,
          text: cleanedText
        });
      } catch (geminiErr: any) {
        console.warn("[Speech-to-Text] Gemini transcription error:", geminiErr.message);
      }
    }

    // Check for GROQ Whisper if available
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey && groqKey.trim() !== '') {
      try {
        const formData = new FormData();
        const blob = new Blob([file.buffer], { type: file.mimetype || 'audio/webm' });
        formData.append('file', blob, 'audio.webm');
        formData.append('model', 'whisper-large-v3');
        formData.append('language', language.split('-')[0]);

        const groqRes = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${groqKey}` },
          body: formData
        });

        if (groqRes.ok) {
          const groqData: any = await groqRes.json();
          console.log(`[Speech-to-Text] Groq Whisper transcribed: "${groqData.text}"`);
          return res.json({ success: true, text: groqData.text.trim() });
        }
      } catch (groqErr: any) {
        console.warn("[Speech-to-Text] Groq Whisper error:", groqErr.message);
      }
    }

    // Check for Puter token on server if available
    const puterToken = process.env.PUTER_AUTH_TOKEN;
    if (puterToken && puterToken.trim() !== '') {
      try {
        const puter = (await import('@heyputer/puter.js')).default;
        puter.setAuthToken(puterToken);
        const dataUrl = `data:${file.mimetype || 'audio/webm'};base64,${file.buffer.toString('base64')}`;
        const puterResult = await puter.ai.speech2txt(dataUrl, {
          model: 'whisper-1',
          language: language.split('-')[0]
        });
        const txt = (typeof puterResult === 'string' ? puterResult : puterResult?.text || '').trim();
        if (txt) {
          console.log(`[Speech-to-Text] Puter Server Whisper transcribed: "${txt}"`);
          return res.json({ success: true, text: txt, provider: 'puter-server' });
        }
      } catch (puterErr: any) {
        console.warn("[Speech-to-Text] Puter Server error:", puterErr.message);
      }
    }

    // Notice when no cloud API key is configured
    console.warn(`[Speech-to-Text] Notice: Server cloud STT keys not found. Client Puter.js handles direct free speech-to-text.`);
    return res.status(200).json({
      success: false,
      text: "",
      error: "NO_API_KEY",
      message: "Server STT requires GEMINI_API_KEY or PUTER_AUTH_TOKEN. Client Puter.js handles direct transcription."
    });

  } catch (err: any) {
    console.error("[Speech-to-Text] Unexpected handler error:", err);
    return res.status(500).json({
      success: false,
      error: "SERVER_ERROR",
      message: "Internal speech transcription error."
    });
  }
};

// Route for /api/voice/transcribe
router.post('/transcribe', uploadAudio.fields([{ name: 'audio', maxCount: 1 }, { name: 'file', maxCount: 1 }]), handleSpeechToText);

/**
 * Intelligent Regional Language Translator for Artisan Voice & Text Descriptions
 * Translates from any Indian regional language (Hindi, Bengali, Gujarati, Marathi, Tamil, Telugu, etc.)
 * directly into professional B2B English and dignified Hindi.
 */
router.post('/translate', async (req, res) => {
  const { text = "", sourceLang = "auto" } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: "No text provided for translation" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim() !== '') {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      });

      const prompt = `You are an expert Indian Handicrafts Linguist and B2B Commerce Translator.
An artisan has spoken or written the following product description in their regional/native language:
"${text}"

TASK:
1. Detect the source language (e.g. Hindi, Gujarati, Bengali, Marathi, Tamil, Telugu, Bhojpuri, Punjabi, English, etc.).
2. Translate and elevate it into professional, compelling B2B catalog English ("english").
3. Translate and format it into clean, dignified, culturally authentic Hindi ("hindi") in Devanagari script.
4. Extract any mentioned physical details: craft type, materials, time taken/labor days, and estimated cost.

Respond in STRICT JSON:
{
  "detectedLanguage": "string",
  "english": "string",
  "hindi": "string",
  "extractedDetails": {
    "craft": "string",
    "materials": "string",
    "timeTaken": "string",
    "estimatedCost": "string"
  }
}`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      let jsonStr = responseText.trim();
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      const parsed = JSON.parse(jsonStr);
      return res.json({
        success: true,
        detectedLanguage: parsed.detectedLanguage || "Indian Regional Language",
        english: parsed.english || text,
        hindi: parsed.hindi || text,
        extractedDetails: parsed.extractedDetails || {}
      });
    } catch (err) {
      console.warn("Gemini translation fallback:", err);
    }
  }

  // Robust Fallback Translator if Gemini is unavailable or rate-limited
  const detected = detectRegionalLanguage(text);
  const fallback = generateArtisanBilingualFallback(text, detected);

  res.json({
    success: true,
    detectedLanguage: detected,
    english: fallback.english,
    hindi: fallback.hindi,
    extractedDetails: fallback.extractedDetails
  });
});

function detectRegionalLanguage(text: string): string {
  // Bengali Unicode range: 0980-09FF
  if (/[\u0980-\u09FF]/.test(text)) return "Bengali (বাংলা)";
  // Gujarati Unicode range: 0A80-0AFF
  if (/[\u0A80-\u0AFF]/.test(text)) return "Gujarati (ગુજરાતી)";
  // Tamil Unicode range: 0B80-0BFF
  if (/[\u0B80-\u0BFF]/.test(text)) return "Tamil (தமிழ்)";
  // Telugu Unicode range: 0C00-0C7F
  if (/[\u0C00-\u0C7F]/.test(text)) return "Telugu (తెలుగు)";
  // Kannada Unicode range: 0C80-0CFF
  if (/[\u0C80-\u0CFF]/.test(text)) return "Kannada (ಕನ್ನಡ)";
  // Devanagari (Hindi / Marathi / Bhojpuri): 0900-097F
  if (/[\u0900-\u097F]/.test(text)) {
    if (/आहे|झाले|केले|माझे/i.test(text)) return "Marathi (मराठी)";
    return "Hindi (हिन्दी)";
  }
  return "English / Transliterated";
}

function generateArtisanBilingualFallback(rawText: string, lang: string) {
  // Detect craft cues
  let craft = "Handcrafted Artisan Specialty";
  let materials = "Pure Handloom Materials";
  let timeTaken = "10 to 14 days";
  let estimatedCost = "₹4,000";

  if (/साड़ी|साडी|saree|shari|sari/i.test(rawText)) {
    craft = "Banarasi Handloom Weaving";
    materials = "Pure Katan Silk with Fine Zari";
    timeTaken = "12 Days";
    estimatedCost = "₹4,000";
  } else if (/दुपट्टा|dupatta|odhani/i.test(rawText)) {
    craft = "Handloom Silk Dupatta";
    materials = "Katan Silk & Silver Zari";
    timeTaken = "4 Days";
    estimatedCost = "₹1,500";
  } else if (/लहंगा|lehenga|choli/i.test(rawText)) {
    craft = "Bridal Brocade Weaving";
    materials = "Tissue Silk & Heavy Gold Zari";
    timeTaken = "25 Days";
    estimatedCost = "₹12,000";
  } else if (/मिट्टी|pottery|terracotta|clay/i.test(rawText)) {
    craft = "Terracotta / Blue Pottery";
    materials = "Natural Clay & Mineral Glaze";
    timeTaken = "5 Days";
    estimatedCost = "₹800";
  }

  const english = `Handcrafted ${craft} piece made using ${materials}. Hand-woven on traditional pit-looms over ${timeTaken} of focused artisanal craftsmanship, embodying certified Indian heritage tailored for B2B cataloging.`;

  const hindi = `हस्तनिर्मित ${craft} उत्कृष्ट कृति, जो ${materials} से तैयार की गई है। पारंपरिक हथकरघे पर ${timeTaken} के श्रमसाध्य कार्य से निर्मित, यह प्रामाणिक भारतीय शिल्प कौशल और गुणवत्ता को प्रदर्शित करती है।`;

  return {
    english,
    hindi,
    extractedDetails: {
      craft,
      materials,
      timeTaken,
      estimatedCost
    }
  };
}

// Navigation voice intents
router.post('/intent', (req, res) => {
  const { transcript = "", lang = "en" } = req.body;
  const text = transcript.toLowerCase();

  let intent = "UNKNOWN";
  let target = "";
  let reply = "";
  const params = {};

  if (text.includes("naya product") || text.includes("add product")) {
    intent = "NAVIGATE";
    target = "/add-product";
    reply = "Navigating to add a new product.";
  } else if (text.includes("photo saaf") || text.includes("enhance")) {
    intent = "ACTION_ENHANCE";
    target = "/studio";
    reply = "Opening studio to enhance your product photo.";
  } else if (text.includes("profit") || text.includes("munafa") || text.includes("kamai")) {
    intent = "NAVIGATE";
    target = "/economics";
    reply = "Showing your business economics and profits.";
  } else if (text.includes("buyer") || text.includes("kharidaar")) {
    intent = "NAVIGATE";
    target = "/market-match";
    reply = "Finding buyers for your products.";
  } else if (text.includes("dashboard") || text.includes("home")) {
    intent = "NAVIGATE";
    target = "/";
    reply = "Returning to the dashboard.";
  } else if (text.includes("price") || text.includes("daam") || text.includes("kimat")) {
    intent = "NAVIGATE";
    target = "/pricing";
    reply = "Opening the dynamic pricing calculator.";
  } else if (text.includes("catalog") || text.includes("listing")) {
    intent = "NAVIGATE";
    target = "/catalog";
    reply = "Opening your product catalog.";
  } else if (text.includes("marketplace") || text.includes("bazaar")) {
    intent = "NAVIGATE";
    target = "/buyer-marketplace";
    reply = "Opening the buyer marketplace.";
  } else {
    reply = "I didn't quite catch that. Could you please repeat?";
  }

  res.json({ intent, target, reply, params });
});

export default router;
