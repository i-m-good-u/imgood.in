# imgood.in

Personal portfolio of **Guddu Kumar** — backend engineer, AI agents & distributed systems, Bengaluru.

Terminal-themed one-page scroll story: BIOS boot intro, `git log` career timeline, pinned horizontal project showcase, `htop` skills, and a real interactive terminal (press `/` — try `sudo hire-me`).

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- GSAP ScrollTrigger
- Self-hosted JetBrains Mono + Space Grotesk
- 100% static — no backend

## Develop

```bash
npm install
npm run dev
```

## Deploy

Pushes to `main` build and FTP-deploy `dist/` to Hostinger via GitHub Actions.
Required repo secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` (from hPanel → Files → FTP Accounts).

## Easter eggs

`/` opens a live shell · `sudo hire-me` · konami code (↑↑↓↓←→←→BA) · `vim` · `rm -rf /`
