# Multimodal Artisan B2B Platform: Full-Stack Architecture Plan

## 1. Architecture Overview
This document outlines the transition of the KarigarSetu artisan B2B platform from a frontend prototype to a fully automated, multimodal full-stack system. The system automates three core areas:
1. **Cinematic Image Enhancement**: Automated background removal (Photoroom / Cloudinary API) with studio-grade backdrop composition (dark slate `#0f172a` / `#1e293b` or clean white `#f8fafc`).
2. **Vision-Based Authenticity & Smart Cataloging**: Google Gemini Vision API (`gemini-1.5-flash`) executing Master Authenticator analysis with strict JSON output schema.
3. **Vision-Driven Dynamic Pricing**: AI estimation of physical variables (labor complexity & hours) paired with a deterministic backend pricing algorithm applying a strict 30% B2B margin.

```
                    ┌────────────────────────┐
                    │     React Frontend     │
                    │  (Catalog & Pricing)   │
                    └───────────┬────────────┘
                                │ multipart/form-data
                                ▼
                    ┌────────────────────────┐
                    │  Express / Multer API  │
                    │  POST /process-product │
                    └─────┬────────────┬─────┘
                          │            │
         ┌────────────────┘            └────────────────┐
         ▼                                              ▼
┌──────────────────┐                           ┌──────────────────┐
│  Area 1: Image   │                           │ Area 2 & Area 3: │
│    Processor     │                           │  Gemini Vision   │
│ (Photoroom /     │                           │ (gemini-1.5-flash│
│  Cloudinary /    │                           │  Master Auth &   │
│  Sharp Studio)   │                           │  Physical Vars)  │
└────────┬─────────┘                           └────────┬─────────┘
         │ Enhanced Image                               │ Physical Estimates
         │                                              ▼
         │                                     ┌──────────────────┐
         │                                     │ Deterministic    │
         │                                     │ Pricing Engine   │
         │                                     │ Base + 30% B2B   │
         │                                     └────────┬─────────┘
         │                                              │
         └──────────────────────┬───────────────────────┘
                                ▼
                    ┌────────────────────────┐
                    │ Consolidated JSON +    │
                    │ Enhanced Image Payload │
                    └────────────────────────┘
```

---

## 2. Node.js / Express API Routes

### 2.1 `POST /api/ai/process-product`
* **Input**: `multipart/form-data` with:
  - `image`: Image file (JPEG, PNG, WebP up to 10MB)
  - `voiceTranscript` (optional): Artisan audio transcript or text description
  - `backdrop` (optional): `'dark_slate'` | `'clean_white'` (default: `'dark_slate'`)
* **Execution Flow**:
  1. Multer receives file in memory buffer.
  2. **Area 1**: Strips background via Photoroom API or Cloudinary API (with Sharp fallback). Composites transparent cutout onto selected studio backdrop (solid dark slate `#0f172a` or studio clean white `#f8fafc`). Saves to `/uploads/enhanced/`.
  3. **Area 2 & 3**: Sends enhanced image to Google Gemini Vision (`gemini-1.5-flash`) using strict JSON schema with Master Authenticator prompt.
  4. If `is_artisan_made === false`, early-returns rejection with detected manufacturing flaws.
  5. **Area 3**: Passes Gemini's `estimatedLaborHours`, `laborComplexity`, and `estimatedMaterialCostINR` into the deterministic pricing engine:
     `Base Cost = (Estimated Hours * Base Artisan Wage) + Estimated Material Cost`
     `Final Price = Base Cost * 1.30` (30% B2B margin)
  6. Returns unified payload containing enhancement details, authenticity verification, catalog specs, and transparent cost breakdown.

### 2.2 `POST /api/ai/enhance-image`
* **Input**: `multipart/form-data` or JSON with `imageUrl` and `backdrop` choice.
* **Output**: `{ rawUrl, enhancedUrl, backdrop, improvements }`

### 2.3 `POST /api/ai/calculate-pricing`
* **Input**: `{ estimatedLaborHours: number, laborComplexity: number, estimatedMaterialCostINR: number, baseWage?: number }`
* **Output**: Complete pricing breakdown `{ baseCost, finalPrice, bulkPrice, festivalPrice, marginAmount, formula }`

### 2.4 Static Asset Route: `GET /uploads/*`
* Serves raw and enhanced images from `server/uploads/raw` and `server/uploads/enhanced`.

---

## 3. Environment Variables Configuration

Create or update `.env` in the root directory:

```env
# Google Gemini API Key (from https://aistudio.google.com/apikey)
GEMINI_API_KEY=your_gemini_api_key_here

# Photoroom API Key (from https://www.photoroom.com/api)
PHOTOROOM_API_KEY=your_photoroom_api_key_here

# Cloudinary Alternative (Optional fallback if Photoroom is not used)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Pricing Algorithm Configuration
BASE_ARTISAN_WAGE=150 # Base hourly wage in INR (default: ₹150/hr)
B2B_MARGIN_RATE=0.30  # Standard 30% B2B margin

# Server Port
PORT=3001
```

---

## 4. Area Implementation Details

### Area 1: Cinematic Image Enhancement (`server/services/imageProcessor.ts`)
1. **Background Removal**:
   - Primary: Photoroom API (`POST https://sdk.photoroom.com/v1/segment`) using `x-api-key`.
   - Secondary: Cloudinary API (`upload` with `background_removal: 'cloudinary_ai'`).
   - Fallback: Sharp contrast/edge lighting modulation if API keys are not provided.
2. **Backdrop Composition**:
   - High-resolution studio canvas generated using `sharp`:
     - **Dark Slate**: `#0f172a` (rich obsidian / slate grey) with subtle vignette.
     - **Clean White**: `#f8fafc` / `#ffffff` with soft ambient contact shadow.
   - Cutout image centered and composited onto the backdrop with subtle sharpening for a studio catalog look.

### Area 2: Vision-Based Authenticity & Smart Cataloging (`server/services/geminiVision.ts`)
1. **Model**: `gemini-1.5-flash` using `@google/generative-ai`.
2. **System Prompt**:
   > "You are a Master Authenticator. Analyze this item. If you detect injection molding, perfect factory symmetry, or 3D printing layers, reject it. If it is an authentic handicraft, identify the exact craft category, primary materials, and provide a B2B product title and description."
3. **Structured JSON Output Schema**:
   ```json
   {
     "is_artisan_made": boolean,
     "rejection_reason": string | null,
     "craftCategory": string,
     "materials": string,
     "title": string,
     "description": string,
     "titleHi": string,
     "descriptionHi": string,
     "laborComplexity": number,
     "estimatedLaborHours": number,
     "estimatedMaterialCostINR": number,
     "tags": ["string"],
     "dimensions": string,
     "washCare": string,
     "region": string
   }
   ```

### Area 3: Vision-Driven Dynamic Pricing (`server/services/pricingEngine.ts`)
1. **Deterministic Backend Formula**:
   ```ts
   const baseArtisanWage = Number(process.env.BASE_ARTISAN_WAGE) || 150;
   const laborCost = Math.round(estimatedLaborHours * baseArtisanWage);
   const materialCost = Math.round(estimatedMaterialCostINR);
   const baseCost = laborCost + materialCost;
   
   const B2B_MARGIN = 0.30; // 30% margin
   const finalPrice = Math.round(baseCost * (1 + B2B_MARGIN));
   const bulkPrice = Math.round(finalPrice * 0.88); // 12% wholesale tier
   const festivalPrice = Math.round(finalPrice * 1.15); // 15% festival surge
   ```
2. **Key Rule**: The AI never outputs the final price in money; it only outputs physical metrics (`estimatedLaborHours`, `laborComplexity`, `estimatedMaterialCostINR`). The backend deterministically computes base cost, margin, and final price.

---

## 5. React Component Updates

### 5.1 `src/pages/Catalog.tsx`
* **Direct Image Upload & Dropzone**: Artisans/buyers can upload raw photos directly on the catalog page or load high-res sample artisan pieces.
* **Backdrop Selector**: Switch between "Cinematic Dark Slate" and "Studio Clean White".
* **Multi-Stage Progress State**:
  - `Stage 1: Enhancing`: Stripping background and rendering studio backdrop.
  - `Stage 2: Analyzing`: Gemini Vision Master Authenticator verification & metadata extraction.
  - `Stage 3: Pricing`: Calculating deterministic labor costs and 30% B2B margin.
* **Authenticity Verdict Banner**:
  - If rejected: Warning card detailing rejection reason (e.g., 3D print layer lines / mold seams detected).
  - If verified: Green GI / Handicraft Verified badge.
* **Bilingual B2B Specifications**: Editable English/Hindi title, description, materials, dimensions, and origin.
* **Raw JSON Payload Inspector**: Collapsible developer/buyer drawer displaying the exact JSON payload returned from the backend.
* **Direct Route Action**: "Proceed to Dynamic Pricing" button navigating to `/pricing`.

### 5.2 `src/pages/Pricing.tsx`
* **Direct Upload & Re-pricing**: Upload a new image or re-run pricing with the same multi-stage loader (`Enhancing -> Analyzing -> Pricing`).
* **Visual Representation**: Displays the cinematic enhanced photo alongside the financial breakdown.
* **Formula Visualization**: Clear breakdown card showing:
  - `(Estimated Labor Hours × Base Hourly Wage) + Estimated Material Cost = Base Cost`
  - `+ 30% B2B Margin = Final B2B Price`
* **Variable Separation**:
  - AI-Estimated Physical Variables: Complexity (1-10), Labor Hours, Material Cost.
  - Backend Deterministic Financials: Base Wage, Labor Total, Base Cost, B2B Margin (+30%), Final Price.
* **Toggles & Benchmark**: Retail vs Bulk B2B pricing, Normal vs Festival surge pricing, and GeM / retail market comparison.
* **JSON Payload Viewer**: Full JSON output inspector.

### 5.3 `vite.config.ts` Proxy Update
* Ensure `/uploads` is proxied to `http://localhost:3001` alongside `/api`.
