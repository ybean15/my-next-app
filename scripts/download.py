# scripts/download.py
import sys
import subprocess

def download_video(url):
    command = [
        "yt-dlp",
        "-f", "bestvideo+bestaudio",
        "--merge-output-format", "mp4",
        url,
        "-o", "public/downloaded_video.mp4"
    ]
    subprocess.run(command, check=True)

if __name__ == "__main__":
    url = sys.argv[1]
    download_video(url)
