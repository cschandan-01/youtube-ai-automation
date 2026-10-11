# Video Agent Kit: autonomous reel editor

This is the same stack and process used to edit Chandan's reels, packaged so an AI agent can do the **whole edit on its own**:
probe → watch → prep → stabilize → transcribe → cut → plan (EDL) → QA stills → sound → render → verify.

```
video-agent-kit/
├── setup.sh               one-time install (everything below)
├── agent/
│   ├── agent.py           the backend: Claude API loop + tools (bash, view_image, ask_user)
│   └── SYSTEM_PROMPT.md   the editor brain: rules + process + kit commands
├── tools/                 what the agent calls
│   ├── doctor.sh          health check
│   ├── probe.sh           file info, rotation, loudness, black-video check
│   ├── contact_sheet.py   thumbnail grid so the agent can SEE footage
│   ├── prep_footage.sh    any clip → 1080×1920, 30 fps CFR, H.264 + voice wav
│   ├── jitter.py          shake score
│   ├── stabilize.sh       vidstab 2-pass (tripod / smooth), auto keeps better
│   ├── transcribe.py      Whisper small (Hindi/Hinglish → meaning + roman)
│   ├── silences.py        safe cut points
│   ├── voice.py           clean voice chain, optional cut with fades + time map
│   ├── sfx_lib.py         synth SFX (whoosh, riser, impact, heartbeat…) + music engine
│   ├── build_audio.py     edl.json → music.wav + sfx.wav
│   ├── mix.sh             voice + ducked music + sfx → −14 LUFS
│   ├── qa_stills.sh       key-moment stills straight from the composition
│   └── render.sh          Remotion render → mux → ≤20 MB MP4 (+faststart)
├── remotion/              rendering engine (React)
│   ├── src/Reel.tsx       EDL-driven composition (camera, blur, subs, titles, UI, CTA, end card)
│   ├── src/index.tsx
│   ├── edl.example.json   full real example (the "AI Office" reel)
│   └── public/<job>/      footage the render reads
├── sfx/                   CC0 UI sound pack (uisfx, 1800+ sounds), installed by setup
├── models/                Whisper model, installed by setup (~640 MB)
├── work/<job>/            per-job files (transcript, edl, audio stems, QA)
└── out/                   final videos
```

## 1. What's installed (backend stack)

| Part | Version used | Job |
|---|---|---|
| OS | Ubuntu 24.04 (macOS also works) | – |
| ffmpeg | 6.1.1 **with libvidstab** | decode/encode, rotation, crop, stabilization, voice chain, mix, loudness |
| Python | 3.13 + numpy, scipy, pillow | SFX/music synthesis, silences, contact sheets |
| sherpa-onnx | 1.13.8 | runs Whisper offline (no API cost) |
| Whisper small (ONNX int8) | k2-fsa release | Hindi/Hinglish speech → text |
| Node.js | 22 | Remotion |
| Remotion | 4.0.532 + React 19 | motion graphics + final render (headless Chrome) |
| Fonts | Poppins, JetBrains Mono, Playfair Display (@fontsource) | text |
| uisfx | 0.4.0 | CC0 UI sounds (pops, sends, notifications, typing) |
| Claude API (`anthropic` pip) | model via `AGENT_MODEL` | the agent's brain |

Hardware: any 4+ core machine with 8 GB RAM. A 25 s reel renders in about 3–6 min on 2 cores. No GPU needed.

## 2. Install

```bash
bash setup.sh            # apt/brew packages, pip, Whisper model, SFX pack, Remotion + Chrome
bash tools/doctor.sh     # every line should be OK
pip install anthropic && export ANTHROPIC_API_KEY=sk-ant-...
```
On Linux servers you can set `REMOTION_CHROME=/path/to/chrome-headless-shell` if you want to use a Chrome that's already installed.

## 3. Run the agent

```bash
python3 agent/agent.py --job reel01 --files ~/Videos/ai_office.mov \
  "Professional clean edit, cut pe smooth transitions, SFX + music, voice cut mat karna, CTA: comment AI"
```
The agent copies the files into `work/reel01/input/`, works through the pipeline using only `tools/`, looks at its own contact sheets and QA stills, and finishes with `out/reel01.mp4` plus a short Hinglish delivery note.
It calls `ask_user` only when it's really stuck (for example, the script is unclear).

To plug the kit into **your own agent framework** (n8n, LangGraph, Claude Agent SDK, OpenAI Agents, etc.), give it these 3 tools and `agent/SYSTEM_PROMPT.md` as the system prompt:
- `bash(command)`: runs inside the kit folder
- `view_image(path)`: returns the image to the model; this is how it "watches" footage
- `ask_user(question)`

## 4. Manual pipeline (the same steps the agent runs)

```bash
J=reel01; IN=work/$J/input/clip.mov
bash tools/probe.sh $IN
python3 tools/contact_sheet.py $IN work/$J/sheet.jpg --every 1
bash tools/prep_footage.sh $IN remotion/public/$J/main.mp4
python3 tools/jitter.py remotion/public/$J/main.mp4                       # > ~1.5 → stabilize
bash tools/stabilize.sh remotion/public/$J/main.mp4 remotion/public/$J/main_st.mp4 tripod
python3 tools/transcribe.py remotion/public/$J/main_voice.wav --out work/$J/transcript.json
python3 tools/silences.py  remotion/public/$J/main_voice.wav --out work/$J/silences.json
python3 tools/voice.py clean remotion/public/$J/main_voice.wav work/$J/voice_clean.wav
#   … write work/$J/edl.json …
bash tools/qa_stills.sh work/$J/edl.json work/$J/qa.jpg 0.5 2 5 8 12 16 20
python3 tools/build_audio.py work/$J/edl.json work/$J
bash tools/mix.sh work/$J/voice_clean.wav work/$J/music.wav work/$J/sfx.wav 24.9 work/$J/mix.wav
bash tools/render.sh work/$J/edl.json work/$J/mix.wav out/$J.mp4 20
```

## 5. edl.json format (the agent's edit decision list)

All times are **output seconds**. See `remotion/edl.example.json` for a complete real example.

```jsonc
{
  "duration": 24.9,
  "theme": {"accent": "#22d3ee", "accent2": "#34d399", "bg": "#06080b", "serifAccent": false},
  "shots": [                       // video or image, stacked in order
    {"src": "reel01/main.mp4", "from": 0, "to": 22.95, "in": 0, "rate": 1,
     "cam": [[0,1.0,540,900],[0.56,1.06,560,800], …],   // [t, zoom, originX, originY], eased
     "zoom": [1, 1.08], "origin": [540, 960],            // simple alternative to cam
     "dark": 0.2, "fadeIn": 0.2, "fadeOut": 0.2}
  ],
  "whips": [[4.3, 5.85]],          // directional blur during a real camera pan
  "punches": [0.53, 8.6],          // 0.12 s motion blur on punch-zoom cuts
  "vignette": 0.4, "fadeOutAt": 22.95,
  "layers": [
    {"type":"sub",   "from":0.6,"to":2.2,"text":"Bhai, abhi bhi kaam kar raha hai?","hl":"kaam"},
    {"type":"big",   "from":5.8,"to":8.4,"small":"Ruk… ye dekh.","big":"AI OFFICE hai","accent":"AI OFFICE","y":260},
    {"type":"slam",  "from":0,"to":1.4,"text":"YE DEKHO","size":120},
    {"type":"tag",   "from":…,"to":…,"text":"Trying… 👀"},
    {"type":"chips", "from":…,"to":…,"items":[{"text":"Agent 1 → task","x":150,"y":980}]},
    {"type":"prompt","from":…,"to":…,"text":"Add video editing to Anya.","label":"ai-agent › anya/","typeFrom":0.3,"typeTo":2.0,"sendAt":2.3},
    {"type":"status","from":…,"to":…,"label":"PC 1","dots":5,"value":"5 agents"},
    {"type":"progress","from":…,"to":…,"label":"Building","p0":10,"p1":67},
    {"type":"cta",   "from":16.6,"to":22.9,"question":"Ye use karna hai?","keyword":"AI","typeAt":3.8,"dm":"Link DM mein milega"},
    {"type":"follow","from":…,"to":…,"title":"PART 2 → RESULT","sub":"Follow to find out 🔥"},
    {"type":"end",   "from":22.95,"to":24.9,"title":"Comment \"AI\" 👇","accent":"\"AI\"","sub":"Link DM mein bhej dunga"},
    {"type":"black", "from":…,"to":…},
    {"type":"image", "from":…,"to":…,"src":"reel01/screenshot.png","x":90,"y":500,"w":900}
  ],
  "audio": {
    "music": {"mood":"tech|calm|upbeat|none","bpm":100,"fadeOut":1.2,
              "sections":[[0,5.8,"hook"],[5.8,22.9,"pulse"],[22.9,24.9,"outro"]],   // hook|pulse|lift|suspense|black|outro
              "dips":[[5.2,5.75,0.35]]},
    "sfx": [ {"t":4.3,"fx":"air","d":1.4,"bright":1.3,"g":0.55},
             {"t":5.75,"fx":"impact","big":false,"g":0.4},
             {"t":5.8,"fx":"ui:glass/open","g":0.3,"speed":1.0,"pan":0} ]
    // fx: air/whoosh(d,bright) riser(d) impact(big) thud glitch(d) heartbeat tick powerdown(d) subdrop(d) blip(f) keys(times[]) ui:<pack>/<name>
  }
}
```
To list UI sounds: `ls sfx/node_modules/uisfx/sounds/*/`. Packs include soft, glass, rubber, scifi, cinematic, mechanical and more.

Safe zones: keep text out of the top 250 px and bottom 400 px. Subtitles sit 470 px from the bottom, and top titles start at y≈260 with an automatic dark scrim.

## 6. Limits to know
- Stock footage sites and HuggingFace can be blocked on some servers. If downloads fail, the agent asks the creator for B-roll.
- Whisper small handles Hindi meaning well, but its exact Hinglish wording is weak. A creator script always wins for captions.
- Stabilization can't remove motion blur that's baked into the footage.
- Without footage in `remotion/public/example/main.mp4`, `edl.example.json` renders a black background. Drop any vertical clip there to try it.
