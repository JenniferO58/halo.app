# Halo — Your AI Employee

## Deploy to Vercel (GitHub)

1. Push this folder to a new GitHub repo
2. Import at vercel.com → New Project
3. Vercel auto-detects Vite — no config needed
4. Add environment variable: `ANTHROPIC_API_KEY` = your key from console.anthropic.com
5. Deploy → live in ~60 seconds

## Run locally

```bash
npm install
npm run dev
```

Add `ANTHROPIC_API_KEY=sk-ant-...` to a `.env` file for the AI features to work locally.
