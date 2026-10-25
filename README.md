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

Pushes to `main` build and deploy `dist/` to Hostinger over SSH via GitHub Actions.
Required repo secrets: `SSH_HOST`, `SSH_PORT` (65002), `SSH_USER`, `SSH_PASSWORD`
(from hPanel → Advanced → SSH Access). Web root: `~/domains/imgood.in/public_html`.

## Easter eggs

`/` opens a live shell · `sudo hire-me` · konami code (↑↑↓↓←→←→BA) · `vim` · `rm -rf /`
