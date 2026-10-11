const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const workDir = path.resolve('work/ai_reel_01');
const outDir = path.resolve('out');
const rawVideo = path.join(outDir, 'ai_reel_01.mp4');
const musicWav = path.join(workDir, 'music.wav');
const sfxWav = path.join(workDir, 'sfx.wav');
const finalVideo = path.join(outDir, 'ai_reel_01_master.mp4');

const ffmpegPath = path.resolve('C:/Users/MyPC/.gemini/antigravity-ide/scratch/youtube-automation-agent-master/youtube-automation-agent-master/bin/ffmpeg.exe');

console.log('Muxing video with music and SFX stems...');
const cmd = `"${ffmpegPath}" -y -i "${rawVideo}" -i "${musicWav}" -i "${sfxWav}" -filter_complex "[1:a][2:a]amix=inputs=2:duration=first[aout]" -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k "${finalVideo}"`;

execSync(cmd, { stdio: 'inherit' });
console.log('✓ Master Reel rendered successfully at:', finalVideo);
console.log('Size:', (fs.statSync(finalVideo).size / 1024 / 1024).toFixed(2), 'MB');
