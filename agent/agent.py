#!/usr/bin/env python3
"""Minimal autonomous editor agent (backend) — Claude API + 3 tools: bash, view_image, ask_user.

  pip install anthropic          export ANTHROPIC_API_KEY=sk-...
  python3 agent/agent.py --job reel01 --files ~/Videos/clip.mov "Clean professional edit, voice cut mat karna, CTA comment AI"

The agent works inside the kit folder, calls tools/*.sh|py, looks at contact sheets/QA stills
with view_image, and finishes with out/<job>.mp4. Change MODEL with env AGENT_MODEL.
"""
import os, sys, json, base64, subprocess, argparse, shutil
import anthropic

KIT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL = os.environ.get('AGENT_MODEL', 'claude-opus-5-5')
SYSTEM = open(os.path.join(KIT, 'agent', 'SYSTEM_PROMPT.md')).read()

TOOLS = [
    {"name": "bash", "description": "Run a shell command in the kit folder (cwd = kit root). Use the tools/ scripts. Long renders are fine (timeout 30 min).",
     "input_schema": {"type": "object", "properties": {"command": {"type": "string"}}, "required": ["command"]}},
    {"name": "view_image", "description": "Look at an image file (contact sheet, QA stills, grid frame). Path relative to kit root.",
     "input_schema": {"type": "object", "properties": {"path": {"type": "string"}}, "required": ["path"]}},
    {"name": "ask_user", "description": "Ask the creator a short question (Hinglish) and wait for the answer. Use only when truly blocked (e.g. script unclear).",
     "input_schema": {"type": "object", "properties": {"question": {"type": "string"}}, "required": ["question"]}},
]

def run_tool(name, inp):
    if name == 'bash':
        try:
            p = subprocess.run(inp['command'], shell=True, cwd=KIT, capture_output=True, text=True, timeout=1800)
            out = (p.stdout + p.stderr)[-12000:]
            return [{"type": "text", "text": f"exit={p.returncode}\n{out}"}]
        except subprocess.TimeoutExpired:
            return [{"type": "text", "text": "timeout after 30 min"}]
    if name == 'view_image':
        path = os.path.join(KIT, inp['path'])
        if not os.path.exists(path): return [{"type": "text", "text": "not found"}]
        tmp = '/tmp/_view.jpg'  # downscale so the request stays small
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', path, '-vf', "scale='min(1600,iw)':-2", '-q:v', '4', tmp])
        data = base64.b64encode(open(tmp, 'rb').read()).decode()
        return [{"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": data}}]
    if name == 'ask_user':
        return [{"type": "text", "text": input(f"\n🤖 {inp['question']}\n> ")}]
    return [{"type": "text", "text": "unknown tool"}]

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--job', required=True); ap.add_argument('--files', nargs='*', default=[]); ap.add_argument('brief')
    a = ap.parse_args()
    job_in = os.path.join(KIT, 'work', a.job, 'input'); os.makedirs(job_in, exist_ok=True)
    for f in a.files: shutil.copy(os.path.expanduser(f), job_in)
    msg = (f"JOB: {a.job}\nInput files (in work/{a.job}/input/): {os.listdir(job_in)}\n"
           f"Creator brief: {a.brief}\n\nDo the full edit with the kit and deliver out/{a.job}.mp4 + a short Hinglish delivery note.")
    client = anthropic.Anthropic(); messages = [{"role": "user", "content": msg}]
    while True:
        r = client.messages.create(model=MODEL, max_tokens=16000, system=SYSTEM, tools=TOOLS, messages=messages)
        messages.append({"role": "assistant", "content": r.content})
        for b in r.content:
            if b.type == 'text' and b.text.strip(): print('\n' + b.text)
            if b.type == 'tool_use': print(f"  ⚙ {b.name}: {json.dumps(b.input)[:160]}")
        if r.stop_reason != 'tool_use': break
        messages.append({"role": "user", "content": [
            {"type": "tool_result", "tool_use_id": b.id, "content": run_tool(b.name, b.input)} for b in r.content if b.type == 'tool_use']})

if __name__ == '__main__':
    main()
