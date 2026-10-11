const fs = require('fs');
const path = require('path');
const sharp = require('C:/Users/MyPC/.gemini/antigravity-ide/scratch/youtube-automation-agent-master/youtube-automation-agent-master/node_modules/sharp');

const targetDir = path.resolve('C:/Users/MyPC/.gemini/antigravity-ide/scratch/video-agent-kit/video-agent-kit/remotion/public/ai_reel_01');
fs.mkdirSync(targetDir, { recursive: true });

const svg = `
<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#0e1726" />
      <stop offset="60%" stop-color="#050811" />
      <stop offset="100%" stop-color="#020307" />
    </radialGradient>
    <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#8b5cf6" />
    </linearGradient>
  </defs>
  <rect width="1080" height="1920" fill="url(#bgGrad)" />
  
  <g stroke="rgba(255,255,255,0.05)" stroke-width="1.5">
    <line x1="120" y1="0" x2="120" y2="1920" />
    <line x1="240" y1="0" x2="240" y2="1920" />
    <line x1="360" y1="0" x2="360" y2="1920" />
    <line x1="480" y1="0" x2="480" y2="1920" />
    <line x1="600" y1="0" x2="600" y2="1920" />
    <line x1="720" y1="0" x2="720" y2="1920" />
    <line x1="840" y1="0" x2="840" y2="1920" />
    <line x1="960" y1="0" x2="960" y2="1920" />
  </g>

  <!-- Glowing UI Hologram in center -->
  <circle cx="540" cy="880" r="260" fill="url(#neonGrad)" opacity="0.12" />
  <circle cx="540" cy="880" r="190" stroke="url(#neonGrad)" stroke-width="3" fill="none" opacity="0.5" />
  <circle cx="540" cy="880" r="150" stroke="#38bdf8" stroke-dasharray="8 12" stroke-width="2" fill="none" opacity="0.7" />
  <circle cx="540" cy="880" r="25" fill="#00f0ff" opacity="0.9" />
</svg>
`;

sharp(Buffer.from(svg))
  .png()
  .toFile(path.join(targetDir, 'main_bg.png'))
  .then(() => {
    console.log('✓ main_bg.png successfully generated at:', path.join(targetDir, 'main_bg.png'));
  })
  .catch(err => {
    console.error('Error:', err);
  });
