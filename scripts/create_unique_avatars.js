import fs from 'fs';
import path from 'path';

const avatarsDir = path.join(process.cwd(), 'public', 'images', 'avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// 26 Female Palettes and Styles
const femaleThemes = [
  { bg1: '#831843', bg2: '#db2777', skin: '#d97706', saree: '#fdf2f8', border: '#be185d', bindi: '#dc2626', accent: '#f472b6' },
  { bg1: '#701a75', bg2: '#c026d3', skin: '#b45309', saree: '#fae8ff', border: '#a21caf', bindi: '#b91c1c', accent: '#e879f9' },
  { bg1: '#1e3a8a', bg2: '#3b82f6', skin: '#c2410c', saree: '#eff6ff', border: '#1d4ed8', bindi: '#dc2626', accent: '#60a5fa' },
  { bg1: '#064e3b', bg2: '#10b981', skin: '#d97706', saree: '#ecfdf5', border: '#047857', bindi: '#dc2626', accent: '#34d399' },
  { bg1: '#7c2d12', bg2: '#ea580c', skin: '#b45309', saree: '#fff7ed', border: '#c2410c', bindi: '#facc15', accent: '#fb923c' },
  { bg1: '#4c1d95', bg2: '#7c3aed', skin: '#c2410c', saree: '#f5f3ff', border: '#6d28d9', bindi: '#f43f5e', accent: '#a78bfa' },
  { bg1: '#9f1239', bg2: '#e11d48', skin: '#d97706', saree: '#fff1f2', border: '#be123c', bindi: '#fef08a', accent: '#fb7185' },
  { bg1: '#14532d', bg2: '#22c55e', skin: '#b45309', saree: '#f0fdf4', border: '#15803d', bindi: '#e11d48', accent: '#4ade80' }
];

// 26 Male Palettes and Styles
const maleThemes = [
  { bg1: '#0f172a', bg2: '#334155', skin: '#b45309', kurta: '#f8fafc', vest: '#1e293b', tilak: '#dc2626', accent: '#38bdf8' },
  { bg1: '#78350f', bg2: '#b45309', skin: '#c2410c', kurta: '#fffbeb', vest: '#78350f', tilak: '#f59e0b', accent: '#fbbf24' },
  { bg1: '#1e1b4b', bg2: '#4338ca', skin: '#d97706', kurta: '#eef2ff', vest: '#312e81', tilak: '#ef4444', accent: '#818cf8' },
  { bg1: '#134e4a', bg2: '#0d9488', skin: '#b45309', kurta: '#f0fdfa', vest: '#115e59', tilak: '#f59e0b', accent: '#2dd4bf' },
  { bg1: '#3b0764', bg2: '#7e22ce', skin: '#c2410c', kurta: '#faf5ff', vest: '#581c87', tilak: '#f43f5e', accent: '#c084fc' },
  { bg1: '#431407', bg2: '#9a3412', skin: '#d97706', kurta: '#fff7ed', vest: '#7c2d12', tilak: '#fbbf24', accent: '#ea580c' },
  { bg1: '#14532d', bg2: '#16a34a', skin: '#b45309', kurta: '#f0fdf4', vest: '#166534', tilak: '#f59e0b', accent: '#4ade80' },
  { bg1: '#1e293b', bg2: '#475569', skin: '#c2410c', kurta: '#f1f5f9', vest: '#0f172a', tilak: '#dc2626', accent: '#94a3b8' }
];

export function generateFemaleAvatar(id, name, craft, index) {
  const t = femaleThemes[index % femaleThemes.length];
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="bg_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${t.bg1}"/>
      <stop offset="100%" stop-color="${t.bg2}"/>
    </linearGradient>
    <linearGradient id="skin_${id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${t.skin}"/>
      <stop offset="100%" stop-color="#92400e"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="28" fill="url(#bg_${id})"/>
  <!-- Decorative Mandala Ring in Background -->
  <circle cx="100" cy="100" r="86" fill="none" stroke="${t.accent}" stroke-width="2" opacity="0.3" stroke-dasharray="5,4"/>
  <circle cx="100" cy="100" r="74" fill="none" stroke="${t.accent}" stroke-width="1" opacity="0.2"/>
  <!-- Saree Drape / Shoulders -->
  <path d="M30,200 C30,140 60,132 100,132 C140,132 170,140 170,200 Z" fill="${t.saree}"/>
  <!-- Saree Pallu / Zari Border -->
  <path d="M40,150 Q75,135 110,200" stroke="${t.border}" stroke-width="12" fill="none" stroke-linecap="round"/>
  <path d="M40,150 Q75,135 110,200" stroke="#facc15" stroke-width="2" fill="none" stroke-dasharray="3,3"/>
  <!-- Neck & Face -->
  <rect x="88" y="112" width="24" height="28" rx="6" fill="url(#skin_${id})"/>
  <ellipse cx="100" cy="86" rx="34" ry="40" fill="url(#skin_${id})"/>
  <!-- Traditional Indian Female Hair (Soft Bun with Flowers) -->
  <path d="M64,80 C62,48 76,40 100,40 C124,40 138,48 136,80 C130,56 118,50 100,50 C82,50 70,56 64,80 Z" fill="#18181b"/>
  <!-- Small Jhumka Earrings -->
  <circle cx="64" cy="94" r="3.5" fill="#facc15"/>
  <circle cx="136" cy="94" r="3.5" fill="#facc15"/>
  <!-- Eyes & Eyebrows -->
  <path d="M78,75 Q85,71 92,75" stroke="#18181b" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M108,75 Q115,71 122,75" stroke="#18181b" stroke-width="2" stroke-linecap="round" fill="none"/>
  <ellipse cx="85" cy="83" rx="3.5" ry="3.5" fill="#18181b"/>
  <ellipse cx="115" cy="83" rx="3.5" ry="3.5" fill="#18181b"/>
  <!-- Red Bindi -->
  <circle cx="100" cy="72" r="3" fill="${t.bindi}"/>
  <!-- Gentle Smile -->
  <path d="M90,102 Q100,110 110,102" stroke="#991b1b" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <!-- Name Label Plate -->
  <rect x="12" y="168" width="176" height="24" rx="6" fill="#0f172a" fill-opacity="0.92"/>
  <text x="100" y="184" font-family="sans-serif" font-size="9" font-weight="bold" fill="${t.accent}" text-anchor="middle">👩 ${name.toUpperCase().slice(0, 20)}</text>
</svg>`;
}

export function generateMaleAvatar(id, name, craft, index) {
  const t = maleThemes[index % maleThemes.length];
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="bg_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${t.bg1}"/>
      <stop offset="100%" stop-color="${t.bg2}"/>
    </linearGradient>
    <linearGradient id="skin_${id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${t.skin}"/>
      <stop offset="100%" stop-color="#78350f"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="28" fill="url(#bg_${id})"/>
  <!-- Geometric Craft Frame in Background -->
  <circle cx="100" cy="100" r="86" fill="none" stroke="${t.accent}" stroke-width="2" opacity="0.3" stroke-dasharray="6,4"/>
  <circle cx="100" cy="100" r="74" fill="none" stroke="${t.accent}" stroke-width="1" opacity="0.2"/>
  <!-- Kurta & Nehru Jacket / Shoulders -->
  <path d="M30,200 C30,140 60,132 100,132 C140,132 170,140 170,200 Z" fill="${t.kurta}"/>
  <!-- Vest / Waistcoat -->
  <path d="M45,200 C45,150 70,140 85,140 L85,200 Z" fill="${t.vest}"/>
  <path d="M155,200 C155,150 130,140 115,140 L115,200 Z" fill="${t.vest}"/>
  <!-- Neck & Strong Jawline Face -->
  <rect x="88" y="112" width="24" height="28" rx="6" fill="url(#skin_${id})"/>
  <ellipse cx="100" cy="85" rx="35" ry="41" fill="url(#skin_${id})"/>
  <!-- Male Traditional Haircut -->
  <path d="M65,74 C63,42 78,36 100,36 C122,36 137,42 135,74 C128,52 116,46 100,46 C84,46 72,52 65,74 Z" fill="#18181b"/>
  <!-- Eyebrows & Eyes -->
  <path d="M78,73 Q85,70 92,73" stroke="#18181b" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M108,73 Q115,70 122,73" stroke="#18181b" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <ellipse cx="85" cy="81" rx="3.5" ry="3.5" fill="#18181b"/>
  <ellipse cx="115" cy="81" rx="3.5" ry="3.5" fill="#18181b"/>
  <!-- Tilak / Mark -->
  <rect x="98" y="60" width="4" height="10" rx="2" fill="${t.tilak}"/>
  <!-- Mustache -->
  <path d="M84,97 Q100,94 100,101 Q100,94 116,97 Q124,103 118,105 Q100,102 100,106 Q100,102 82,105 Q76,103 84,97 Z" fill="#18181b"/>
  <!-- Name Label Plate -->
  <rect x="12" y="168" width="176" height="24" rx="6" fill="#0f172a" fill-opacity="0.92"/>
  <text x="100" y="184" font-family="sans-serif" font-size="9" font-weight="bold" fill="${t.accent}" text-anchor="middle">👨 ${name.toUpperCase().slice(0, 20)}</text>
</svg>`;
}

console.log("Avatar generator ready.");
