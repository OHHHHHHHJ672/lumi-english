"""
Batch generate TTS audio for all unique English sentences in the course.
Uses edge-tts (Microsoft Edge online TTS, free, high-quality neural voices).
Output: assets/audio/tts/{hash}.mp3
Resume-safe: skips files that already exist.
"""
import asyncio
import json
import os
import sys
from pathlib import Path

try:
    import edge_tts
except ImportError:
    print("ERROR: edge-tts not installed. Run: python -m pip install edge-tts")
    sys.exit(1)

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
SENTENCES_FILE = SCRIPT_DIR / "tts-sentences.json"
OUTPUT_DIR = PROJECT_ROOT / "app" / "src" / "main" / "assets" / "audio" / "tts"

# TTS settings
VOICE = "en-US-AriaNeural"  # High-quality female neural voice
RATE = "+0%"                  # Normal speed
VOLUME = "+0%"
CONCURRENCY = 8               # Concurrent requests

async def generate_one(text: str, out_path: Path, semaphore: asyncio.Semaphore) -> bool:
    """Generate TTS for a single sentence. Returns True if successful."""
    async with semaphore:
        try:
            communicate = edge_tts.Communicate(text, VOICE, rate=RATE, volume=VOLUME)
            await communicate.save(str(out_path))
            return True
        except Exception as e:
            print(f"  FAIL: {text[:50]}... -> {e}")
            return False

async def main():
    # Load sentences
    if not SENTENCES_FILE.exists():
        print(f"ERROR: {SENTENCES_FILE} not found. Run extract-tts-sentences.js first.")
        sys.exit(1)

    with open(SENTENCES_FILE, "r", encoding="utf-8") as f:
        sentences = json.load(f)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Filter out already generated
    todo = []
    for item in sentences:
        out_path = OUTPUT_DIR / f"{item['id']}.mp3"
        if out_path.exists() and out_path.stat().st_size > 100:
            continue
        todo.append((item, out_path))

    total = len(sentences)
    already = total - len(todo)
    print(f"Total sentences: {total}")
    print(f"Already generated: {already}")
    print(f"To generate: {len(todo)}")
    print(f"Voice: {VOICE}, Concurrency: {CONCURRENCY}")
    print(f"Output: {OUTPUT_DIR}")
    print("-" * 60)

    if not todo:
        print("All sentences already generated!")
        return

    semaphore = asyncio.Semaphore(CONCURRENCY)
    success = 0
    fail = 0

    # Process in batches for progress reporting
    batch_size = 50
    for batch_start in range(0, len(todo), batch_size):
        batch = todo[batch_start:batch_start + batch_size]
        tasks = [generate_one(item["text"], out_path, semaphore) for item, out_path in batch]
        results = await asyncio.gather(*tasks)
        batch_success = sum(results)
        batch_fail = len(results) - batch_success
        success += batch_success
        fail += batch_fail
        progress = batch_start + len(batch)
        pct = progress / len(todo) * 100
        print(f"  [{progress}/{len(todo)}] {pct:.1f}% — OK: {batch_success}, FAIL: {batch_fail}")

    print("-" * 60)
    print(f"Done! Success: {success}, Failed: {fail}")
    print(f"Output directory: {OUTPUT_DIR}")
    if fail > 0:
        print("Re-run to retry failed items (already-generated are skipped).")

if __name__ == "__main__":
    asyncio.run(main())
