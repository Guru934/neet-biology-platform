# Bloom — NEET Biology Companion

A local-first personal study companion for NEET Biology designed for the "Lazy Student". It minimizes friction with zero-typing logging, background ghost timers, and automated study streaks. Use trusted external sources (NTA, NCERT PDFs) and let Bloom track your progress silently.

## Lazy Student Features 🦥

- **Ghost Timer:** Clicking any PDF or NotebookLM link auto-starts the timer in the background. Close the PDF tab and it auto-stops and logs the session to your history.
- **Spoon-Feed Blocker:** Forces you to review 1 randomly selected error from your Error Notebook before it unlocks the dashboard for the day.
- **Math-Free Practice:** Just enter total attempted and total mistakes; the app handles the rest.
- **Gen-Z Toxicity Engine:** Random roast and meme quotes adjust dynamically to your daily streaks and accuracy percentage (e.g., "Tukka strategy failed successfully 📉").
- **Zero-Typing Error Notebook:** Ctrl+V global paste support. Simply screenshot a wrong question, paste it anywhere in the app, and click save.

## Core Features

- Time-based personalized daily greetings
- Editable NEET target-date countdown
- Class 11 & 12 syllabus tracking with integrated PDF fetching
- Spaced revision queue (Day 7 / Day 30) for NCERT reads

## Run it

This is a dependency-free static site. Open `index.html` in a modern browser, or serve the folder locally:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

All data is stored purely via `localStorage` with iOS Safari fail-safes built-in.
