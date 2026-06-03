# Nuxt 4 PWA — Docker Dev Environment

> **Stack**: Nuxt 4 + @vite-pwa/nuxt + @nuxt/ui + Docker Compose
>
> Port: **59000** | Container: **pwa-fager-ug** | Package manager: **pnpm**

---

## Installation & Getting Started

### Requirements

- Docker + Docker Compose
- Node.js 22 (inside container)
- pnpm 9.x+ (inside container, via corepack)

### First-time setup

```bash
# 1. Build + start container
docker compose up -d --build

# 2. Exec into container
docker compose exec nuxt bash

# 3. Inside container: install deps
pnpm install

# 4. Run dev server
pnpm dev
```

Open browser: **http://localhost:59000**

### Daily workflow

```bash
# Start container + dev server
docker compose up -d
docker compose exec nuxt pnpm dev

# Or exec into container then run
docker compose exec nuxt bash
pnpm dev

# Stop container
docker compose down
```

---

## Testing PWA

### Dev mode (fast, SW enabled)

```bash
docker compose exec nuxt pnpm dev
# → http://localhost:59000
# → Open Chrome DevTools → Application → Service Workers
# → devOptions.enabled = true → SW runs in dev
```

The page displays a debug panel with 6 indicators:
| Indicator | Meaning |
|---|---|
| Connection | Online / Offline |
| Service Worker | active / not registered / installing |
| Standalone | Whether opened in PWA standalone mode |
| Installable | Browser has fired `beforeinstallprompt` |
| PWA Installed | App has been installed via manifest |
| Offline Ready | Initial cache completed |

### Production mode (full PWA test)

```bash
# Build + preview (SW operates in standard mode)
# Container runs port 3000, host maps 59000 → 3000
docker compose exec nuxt pnpm build
docker compose exec nuxt pnpm preview
# → http://localhost:59000
```

> **Important**: Install prompt (`beforeinstallprompt`) only fires when:
> - Site runs via **HTTPS** or **localhost**
> - Has **user engagement** (a few clicks, scrolls)
> - Valid manifest + PNG icons in `public/pwa-icons/`
> - User hasn't previously installed this app
>
> If you don't see the "Install to home screen" button, try:
> 1. Open Chrome DevTools → Application → Manifest → check for manifest errors
> 2. Application → Service Workers → check SW status is "activated"
> 3. Click around the page a few times to generate engagement
> 4. Go to `chrome://serviceworker-internals` → find scope → Unregister → reload page
> 5. Use Incognito mode (no cached old SW)

### Lighthouse Audit

```bash
# On host
npx lighthouse http://localhost:59000 --view --preset=desktop
```

---

## Project Structure

```
├── .docker/node/Dockerfile       # Node 22 + pnpm
├── docker-compose.yml            # Port 59000, volume mount
├── .gitignore
├── README.md                     # This file
├── .claude/skills/vite-pwa-nuxt/ # PWA skill for Claude Code
├── ug-ccas-app/                  # Nuxt source (mounted to /app)
│   ├── nuxt.config.ts            # PWA + Nuxt UI config
│   ├── package.json
│   ├── app/
│   │   ├── app.vue               # <NuxtPwaAssets /> + <NuxtPage />
│   │   └── pages/
│   │       └── index.vue         # Debug panel + UI components
│   └── public/
│       └── pwa-icons/            # Place icon.svg here → generate PNGs
```

---

## Generating PWA Icons

```bash
# 1. Place icon.svg file (≥512×512) in public/pwa-icons/
# 2. Inside container:
docker compose exec nuxt bash
pnpm dlx @vite-pwa/assets-generator --preset minimal public/pwa-icons/icon.svg
```

---

## Useful Commands

```bash
# View container logs
docker compose logs -f nuxt

# Restart container
docker compose restart

# Clean everything (including pnpm cache volume)
docker compose down -v

# Install additional packages
docker compose exec nuxt pnpm add <package-name>
```

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Blank page / 500 error | Check `docker compose logs nuxt` — usually due to SSR error (use `import.meta.client` or `onMounted` for browser APIs) |
| Hot-reload not working | Ensure `CHOKIDAR_USEPOLLING=true` + `vite.server.watch.usePolling: true` |
| Port 59000 already in use | Change port in `docker-compose.yml` + `PORT` env |
| Generated files owned by `root:root` | Export `USER_UID=$(id -u)` and `USER_GID=$(id -g)` before `docker compose build` |
| SW not updating | Hard reload (Ctrl+Shift+R), clear SW in DevTools → Application |
| Install prompt not showing | See "Testing PWA" section above, check manifest + SW + engagement |
