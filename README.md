# IELTS Practice Hub

Web app untuk latihan IELTS Reading & Listening dari Cambridge IELTS 1-20.

## Fitur

- Login with Google (simulasi demo)
- Sistem kunci: 2 gratis/hari + donate unlimited
- 14 tipe soal Reading + 7 tipe soal Listening dengan icon
- Audio player untuk Listening
- Statistik belajar: streak, chart, breakdown per kategori, history
- Timer otomatis, scoring otomatis

## Run Locally

```bash
npm install
npm run dev
```

Buka http://localhost:5173

## Deploy to Vercel

1. Push repo ini ke GitHub
2. Buka https://vercel.com/new
3. Import GitHub repo
4. Klik Deploy (Vercel auto-detect Vite)

## Tech Stack

- React 18 + Vite
- Inline styles (tanpa CSS framework)
- localStorage untuk persistence
