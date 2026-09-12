import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import voiceRoutes, { handleSpeechToText, uploadAudio } from './routes/voice.js';
import aiRoutes from './routes/ai.js';
import artisanRoutes from './routes/artisan.js';
import pricingRoutes from './routes/pricingRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload folders exist on boot (safely wrapped for serverless read-only environments)
const uploadsDir = path.join(__dirname, 'uploads');
try {
  fs.mkdirSync(path.join(uploadsDir, 'raw'), { recursive: true });
  fs.mkdirSync(path.join(uploadsDir, 'enhanced'), { recursive: true });
} catch (e) {
  // Ignored in read-only serverless environments
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Dedicated Speech-to-Text Endpoint (Multi-level Fallback)
// Handles both /api/speech-to-text and /speech-to-text
app.post('/api/speech-to-text', uploadAudio.fields([{ name: 'audio', maxCount: 1 }, { name: 'file', maxCount: 1 }]), handleSpeechToText);
app.post('/speech-to-text', uploadAudio.fields([{ name: 'audio', maxCount: 1 }, { name: 'file', maxCount: 1 }]), handleSpeechToText);

// Routes mounted with /api prefix (standard)
app.use('/api/voice', voiceRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api', artisanRoutes);

// Routes mounted without /api prefix (in case serverless rewrites strip the prefix)
app.use('/voice', voiceRoutes);
app.use('/ai', aiRoutes);
app.use('/pricing', pricingRoutes);
app.use('/', artisanRoutes);

// Static files & Production Frontend Bundle (used for local standalone execution)
const distPath = path.join(__dirname, '../dist');
const publicPath = path.join(__dirname, '../public');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
} else if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
}
app.use('/uploads', express.static(uploadsDir));

// Client-Side SPA Routing Wildcard Fallback (must be after all /api routes)
app.get('*', (req, res, next) => {
  // If request is for an API route that was not found, return 404 JSON instead of HTML
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found', path: req.path });
  }

  const indexHtml = path.join(distPath, 'index.html');
  if (fs.existsSync(indexHtml)) {
    res.sendFile(indexHtml);
  } else {
    next();
  }
});

export { app };
export default app;
