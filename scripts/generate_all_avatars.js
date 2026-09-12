import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'server', 'data.json');
const avatarsDir = path.join(process.cwd(), 'public', 'images', 'avatars');

if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

let artisans = [];
if (fs.existsSync(dataPath)) {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  artisans = data.artisans || [];
}

const palettes = [
  { bg1: '#1e3a8a', bg2: '#3b82f6', skin: '#d97706', kurta: '#f8fafc', accent: '#f59e0b' },
  { bg1: '#064e3b', bg2: '#10b981', skin: '#b45309', kurta: '#ecfdf5', accent: '#34d399' },
  { bg1: '#701a75', bg2: '#c026d3', skin: '#d97706', kurta: '#fae8ff', accent: '#f472b6' },
  { bg1: '#831843', bg2: '#db2777', skin: '#b45309', kurta: '#fdf2f8', accent: '#fb7185' },
  { bg1: '#312e81', bg2: '#6366f1', skin: '#c2410c', kurta: '#e0e7ff', accent: '#818cf8' },
  { bg1: '#7c2d12', bg2: '#ea580c', skin: '#b45309', kurta: '#ffedd5', accent: '#fdba74' },
  { bg1: '#0f172a', bg2: '#475569', skin: '#d97706', kurta: '#f1f5f9', accent: '#94a3b8' },
  { bg1: '#134e4a', bg2: '#14b8a6', skin: '#b45309', kurta: '#ccfbf1', accent: '#5eead4' }
];

artisans.forEach((artisan, idx) => {
  const p = palettes[idx % palettes.length];
  const initials = artisan.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="bg_${artisan.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.bg1}"/>
      <stop offset="100%" stop-color="${p.bg2}"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="28" fill="url(#bg_${artisan.id})"/>
  <circle cx="100" cy="100" r="85" fill="none" stroke="${p.accent}" stroke-width="2" opacity="0.4" stroke-dasharray="6,4"/>
  <path d="M35,200 C35,145 65,135 100,135 C135,135 165,145 165,200 Z" fill="${p.kurta}"/>
  <rect x="88" y="110" width="24" height="30" rx="6" fill="${p.skin}"/>
  <ellipse cx="100" cy="85" rx="35" ry="40" fill="${p.skin}"/>
  <circle cx="100" cy="80" r="26" fill="${p.bg1}" fill-opacity="0.25"/>
  <text x="100" y="89" font-family="sans-serif" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">${initials}</text>
  <rect x="10" y="168" width="180" height="24" rx="6" fill="#0f172a" fill-opacity="0.9"/>
  <text x="100" y="184" font-family="sans-serif" font-size="9" font-weight="bold" fill="${p.accent}" text-anchor="middle">${artisan.name.toUpperCase().slice(0, 20)}</text>
</svg>`;

  fs.writeFileSync(path.join(avatarsDir, `${artisan.id}.svg`), svg);
});

console.log(`Generated avatars for all ${artisans.length} artisans in public/images/avatars/`);
