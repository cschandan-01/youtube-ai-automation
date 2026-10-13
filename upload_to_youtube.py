#!/usr/bin/env python3
"""
upload_to_youtube.py — Autonomous YouTube Shorts & Video Publisher
Uses the official YouTube Data API v3 with resumable chunked upload.

Supports:
1. Local execution (using token.json or client_secrets.json)
2. CI/CD GitHub Actions execution (using YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, YOUTUBE_REFRESH_TOKEN)
"""

import os
import sys
import json
import time
from pathlib import Path
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request

BASE_DIR = Path(__file__).parent.resolve()
OUT_DIR = BASE_DIR / "out"


def get_latest_video_package():
    """Finds the most recent master video and its metadata JSON in out/."""
    meta_files = sorted(OUT_DIR.glob("*_youtube_metadata.json"), key=lambda f: f.stat().st_mtime, reverse=True)
    if not meta_files:
        print("❌ No youtube metadata JSON found in out/.")
        return None, None

    latest_meta = meta_files[0]
    with open(latest_meta, "r", encoding="utf-8") as f:
        meta_data = json.load(f)

    video_path = Path(meta_data.get("video_file", ""))
    if not video_path.exists():
        # Fallback to corresponding master mp4 in out/
        stem = latest_meta.name.replace("_youtube_metadata.json", "")
        candidate = OUT_DIR / f"{stem}_master.mp4"
        if candidate.exists():
            video_path = candidate
        else:
            print(f"❌ Video file {video_path} not found.")
            return None, None

    return video_path, meta_data


def get_authenticated_service():
    """Returns an authenticated YouTube API service using Secrets or token.json."""
    client_id = os.getenv("YOUTUBE_CLIENT_ID")
    client_secret = os.getenv("YOUTUBE_CLIENT_SECRET")
    refresh_token = os.getenv("YOUTUBE_REFRESH_TOKEN")

    creds = None

    # Priority 1: GitHub Secrets / Environment Variables
    if client_id and client_secret and refresh_token:
        print("🔑 Authenticating via GitHub Secrets / Environment Variables...")
        creds = Credentials(
            token=None,
            refresh_token=refresh_token,
            token_uri="https://oauth2.googleapis.com/token",
            client_id=client_id,
            client_secret=client_secret,
            scopes=["https://www.googleapis.com/auth/youtube.upload"]
        )
    # Priority 2: Local token.json
    elif (BASE_DIR / "token.json").exists():
        print("🔑 Authenticating via local token.json...")
        creds = Credentials.from_authorized_user_file(str(BASE_DIR / "token.json"), ["https://www.googleapis.com/auth/youtube.upload"])
    else:
        print("⚠️ No YouTube API credentials found.")
        print("To enable 100% automated uploads:")
        print("Set YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, and YOUTUBE_REFRESH_TOKEN in GitHub Repository Secrets.")
        return None

    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())

    return build("youtube", "v3", credentials=creds)


def upload_video(video_path: Path, metadata: dict):
    """Uploads video to YouTube with resumable chunks."""
    youtube = get_authenticated_service()
    if not youtube:
        print("⏭️ Skipping YouTube upload (Credentials not configured).")
        return None

    title = metadata.get("title", "High-Retention AI Short #Shorts")
    description = metadata.get("description", "")
    tags = metadata.get("tags", ["shorts", "finance"])
    category_id = metadata.get("category_id", "27")
    privacy = metadata.get("privacy", "public")

    print(f"\n=======================================================")
    print(f"🚀 UPLOADING TO YOUTUBE: {title}")
    print(f"📁 Video: {video_path.name} ({video_path.stat().st_size / (1024*1024):.2f} MB)")
    print(f"=======================================================\n")

    body = {
        "snippet": {
            "title": title[:100], # YouTube max 100 chars
            "description": description[:5000],
            "tags": tags,
            "categoryId": category_id,
        },
        "status": {
            "privacyStatus": privacy,
            "selfDeclaredMadeForKids": False,
        }
    }

    media = MediaFileUpload(
        str(video_path),
        chunksize=1024 * 1024 * 4, # 4MB chunks
        resumable=True,
        mimetype="video/mp4"
    )

    request = youtube.videos().insert(
        part=",".join(body.keys()),
        body=body,
        media_body=media
    )

    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            print(f"⏳ Upload progress: {int(status.progress() * 100)}%")

    video_id = response.get("id")
    video_url = f"https://youtube.com/shorts/{video_id}"
    print(f"\n🎉 SUCCESS! Video published live on YouTube!")
    print(f"🔗 URL: {video_url}\n")
    return video_url


def main():
    video_path, metadata = get_latest_video_package()
    if not video_path:
        sys.exit(1)

    url = upload_video(video_path, metadata)
    if url:
        # Save published URL to out/
        log_file = OUT_DIR / "PUBLISHED_YOUTUBE_URLS.txt"
        with open(log_file, "a", encoding="utf-8") as f:
            f.write(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {metadata.get('title')} -> {url}\n")


if __name__ == "__main__":
    main()
