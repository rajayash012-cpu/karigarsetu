import fs from 'fs';
import path from 'path';

const imagesDir = path.join(process.cwd(), 'public', 'images');
const avatarsDir = path.join(imagesDir, 'avatars');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

function getRameshSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="bg_rk" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#78350f"/>
      <stop offset="50%" stop-color="#b45309"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <linearGradient id="skin_rk" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="kurta_rk" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="brass_rk" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="28" fill="url(#bg_rk)"/>
  <circle cx="100" cy="100" r="85" fill="none" stroke="url(#brass_rk)" stroke-width="2" opacity="0.3" stroke-dasharray="4,4"/>
  <circle cx="100" cy="100" r="75" fill="none" stroke="url(#brass_rk)" stroke-width="1" opacity="0.2"/>
  <path d="M155,45 Q165,30 170,45 Q155,55 155,45 Z" fill="url(#brass_rk)" opacity="0.8"/>
  <circle cx="162" cy="36" r="3" fill="#ef4444" opacity="0.9"/>
  <path d="M35,200 C35,145 65,135 100,135 C135,135 165,145 165,200 Z" fill="url(#kurta_rk)"/>
  <path d="M82,135 L100,165 L118,135 Z" fill="#d97706"/>
  <path d="M50,150 Q75,140 85,200" stroke="#f59e0b" stroke-width="8" fill="none" stroke-linecap="round"/>
  <rect x="88" y="110" width="24" height="30" rx="6" fill="url(#skin_rk)"/>
  <ellipse cx="100" cy="85" rx="36" ry="42" fill="url(#skin_rk)"/>
  <path d="M65,75 C65,42 80,38 100,38 C120,38 135,42 135,75 C130,55 115,48 100,48 C85,48 70,55 65,75 Z" fill="#1c1917"/>
  <ellipse cx="86" cy="80" rx="4" ry="4" fill="#1c1917"/>
  <ellipse cx="114" cy="80" rx="4" ry="4" fill="#1c1917"/>
  <path d="M80,72 Q86,69 92,72" stroke="#1c1917" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M108,72 Q114,69 120,72" stroke="#1c1917" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M84,97 Q100,94 100,101 Q100,94 116,97 Q124,103 118,105 Q100,102 100,106 Q100,102 82,105 Q76,103 84,97 Z" fill="#1c1917"/>
  <rect x="98" y="60" width="4" height="10" rx="2" fill="#dc2626"/>
  <circle cx="100" cy="74" r="1.5" fill="#fef08a"/>
  <rect x="15" y="170" width="170" height="22" rx="6" fill="#0f172a" fill-opacity="0.85"/>
  <text x="100" y="185" font-family="sans-serif" font-size="10" font-weight="bold" fill="#fef08a" text-anchor="middle">RAMESH KUMAR • BRASS ART</text>
</svg>`;
}

function getMohanSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="bg_md" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9a3412"/>
      <stop offset="50%" stop-color="#c2410c"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>
    <linearGradient id="skin_md" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#c2410c"/>
      <stop offset="100%" stop-color="#9a3412"/>
    </linearGradient>
    <linearGradient id="kurta_md" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
    <linearGradient id="clay_md" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdba74"/>
      <stop offset="100%" stop-color="#fb923c"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="28" fill="url(#bg_md)"/>
  <circle cx="100" cy="100" r="85" fill="none" stroke="#fdba74" stroke-width="2" opacity="0.35"/>
  <circle cx="100" cy="100" r="60" fill="none" stroke="#fdba74" stroke-width="1" stroke-dasharray="5,5" opacity="0.3"/>
  <path d="M160,35 L165,55 L158,65 L170,62 L168,75 L160,78" stroke="#fed7aa" stroke-width="2" fill="none" opacity="0.5"/>
  <path d="M35,200 C35,145 65,135 100,135 C135,135 165,145 165,200 Z" fill="url(#kurta_md)"/>
  <path d="M40,175 Q70,140 85,200" stroke="#b91c1c" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M85,135 L100,162 L115,135 Z" fill="#e2e8f0"/>
  <rect x="88" y="110" width="24" height="30" rx="6" fill="url(#skin_md)"/>
  <ellipse cx="100" cy="85" rx="35" ry="41" fill="url(#skin_md)"/>
  <path d="M66,75 C66,45 80,40 100,40 C120,40 134,45 134,75 C128,52 115,48 100,48 C82,48 72,55 66,75 Z" fill="#18181b"/>
  <ellipse cx="86" cy="82" rx="3.5" ry="3.5" fill="#18181b"/>
  <ellipse cx="114" cy="82" rx="3.5" ry="3.5" fill="#18181b"/>
  <path d="M80,75 Q86,72 92,75" stroke="#18181b" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M108,75 Q114,72 120,75" stroke="#18181b" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M89,102 Q100,111 111,102" stroke="#451a03" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <circle cx="100" cy="66" r="3" fill="#fef08a"/>
  <rect x="15" y="170" width="170" height="22" rx="6" fill="#431407" fill-opacity="0.9"/>
  <text x="100" y="185" font-family="sans-serif" font-size="10" font-weight="bold" fill="#fdba74" text-anchor="middle">MOHAN DAS • TERRACOTTA</text>
</svg>`;
}

// Generate unique avatar for any generic artisan
function getGenericArtisanSvg(name, craft, state, id, index) {
  const palettes = [
    { bg1: '#1e3a8a', bg2: '#3b82f6', skin: '#d97706', kurta: '#f8fafc', accent: '#f59e0b' },
    { bg1: '#064e3b', bg2: '#10b981', skin: '#b45309', kurta: '#ecfdf5', accent: '#34d399' },
    { bg1: '#701a75', bg2: '#c026d3', skin: '#d97706', kurta: '#fae8ff', accent: '#f472b6' },
    { bg1: '#831843', bg2: '#db2777', skin: '#b45309', kurta: '#fdf2f8', accent: '#fb7185' },
    { bg1: '#312e81', bg2: '#6366f1', skin: '#c2410c', kurta: '#e0e7ff', accent: '#818cf8' },
    { bg1: '#7c2d12', bg2: '#ea580c', skin: '#b45309', kurta: '#ffedd5', accent: '#fdba74' },
    { bg1: '#0f172a', bg2: '#475569', skin: '#d97706', kurta: '#f1f5f9', accent: '#94a3b8' }
  ];
  const p = palettes[index % palettes.length];
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="bg_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.bg1}"/>
      <stop offset="100%" stop-color="${p.bg2}"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="28" fill="url(#bg_${id})"/>
  <circle cx="100" cy="100" r="85" fill="none" stroke="${p.accent}" stroke-width="2" opacity="0.4" stroke-dasharray="6,4"/>
  <!-- Body / Shoulders -->
  <path d="M35,200 C35,145 65,135 100,135 C135,135 165,145 165,200 Z" fill="${p.kurta}"/>
  <rect x="88" y="110" width="24" height="30" rx="6" fill="${p.skin}"/>
  <ellipse cx="100" cy="85" rx="35" ry="40" fill="${p.skin}"/>
  <circle cx="100" cy="80" r="28" fill="${p.bg1}" fill-opacity="0.2"/>
  <text x="100" y="92" font-family="sans-serif" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">${initials}</text>
  <rect x="15" y="168" width="170" height="24" rx="6" fill="#0f172a" fill-opacity="0.9"/>
  <text x="100" y="184" font-family="sans-serif" font-size="9" font-weight="bold" fill="${p.accent}" text-anchor="middle">${name.toUpperCase().slice(0, 22)}</text>
</svg>`;
}

fs.writeFileSync(path.join(imagesDir, 'ramesh_kumar.svg'), getRameshSvg());
fs.writeFileSync(path.join(imagesDir, 'mohan_das.svg'), getMohanSvg());

console.log('Created ramesh_kumar.svg and mohan_das.svg in public/images');
