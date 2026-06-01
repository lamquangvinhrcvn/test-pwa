# Nuxt 4 + PWA — Môi trường Docker Compose (Container-first)

> **Workflow**: Tạo container rỗng có sẵn Node.js + pnpm → `exec` vào container →
> cài Nuxt + PWA + Nuxt UI từ bên trong. Source code mount từ host, hot-reload hoạt động bình thường.
>
> Một môi trường duy nhất, không tách dev/prod.

---

## Stack

| Thành phần | Phiên bản |
|---|---|
| Node.js | 22 LTS |
| pnpm | 9.x (qua corepack) |
| Nuxt | 4.x |
| @vite-pwa/nuxt | ^1.1.1 |
| @nuxt/ui | ^3.x |

---

## 1. Cấu trúc ban đầu (trước khi cài Nuxt)

Tạo dự án, **chỉ có 3 file**:

```
├── .docker/node/Dockerfile
├── docker-compose.yml
└── .gitignore
```

Sau khi `exec` vào container và chạy `nuxi init`, các file Nuxt sẽ tự sinh ở host (do mount volume).

---

## 2. Dockerfile

```dockerfile
# Dockerfile
FROM node:22-bookworm-slim

# Cài git (nuxi init cần) + utilities
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Bật pnpm qua corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Tạo user không phải root để file sinh ra không bị chown root ở host
# UID 1000 thường khớp với user host trên Linux
ARG USER_UID=1000
ARG USER_GID=1000
RUN groupmod -g ${USER_GID} node 2>/dev/null || true && \
    usermod -u ${USER_UID} -g ${USER_GID} node 2>/dev/null || true

WORKDIR /app
RUN chown -R node:node /app

USER node

# Pre-fetch pnpm vào cache để lần install đầu nhanh hơn
RUN pnpm config set store-dir /home/node/.pnpm-store

EXPOSE 3000

# Container "không làm gì cả" — chờ mình exec vào
CMD ["tail", "-f", "/dev/null"]
```

> **⚠️ macOS / Windows**: Có thể bỏ phần `usermod` vì Docker Desktop đã xử lý permission qua VirtioFS/gRPC FUSE. Trên Linux thì cần để không bị file root-owned.

---

## 3. docker-compose.yml

```yaml
# docker-compose.yml
services:
  nuxt:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        USER_UID: ${USER_UID:-1000}
        USER_GID: ${USER_GID:-1000}
    container_name: pwa-fager-ug
    working_dir: /app
    ports:
      - "3000:3000"      # Nuxt dev server
      - "24678:24678"    # Vite HMR websocket (nếu cần expose riêng)
    volumes:
      - ./ug-ccas-app:/app                              # Source code từ host
      - pnpm_store:/home/node/.pnpm-store    # Cache pnpm (tăng tốc install)
    environment:
      - HOST=0.0.0.0
      - PORT=3000
      - CHOKIDAR_USEPOLLING=true             # Hot-reload ổn định trong Docker
      - NODE_ENV=development
    stdin_open: true     # Cho phép tương tác khi exec
    tty: true
    restart: unless-stopped

volumes:
  pnpm_store:
```

---

## 4. .gitignore

```gitignore
# Nuxt
.nuxt
.output
.nitro
.cache
dist

# Node
node_modules
*.log

# Env
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
```

---

## 5. Quy trình khởi tạo (chạy lần đầu)

### Bước 1 — Up container

```bash
# Trên Linux: lấy UID/GID hiện tại để truyền vào build
export USER_UID=$(id -u)
export USER_GID=$(id -g)

docker compose up -d --build
```

Container giờ đã chạy và đang `tail -f /dev/null` (chờ lệnh).

### Bước 2 — Exec vào container

```bash
docker compose exec nuxt bash
```

Từ đây trở đi, mọi lệnh chạy **bên trong container** (`/app`).

### Bước 3 — Khởi tạo Nuxt 4

```bash
# Trong container, tại /app
pnpm dlx nuxi@latest init . --package-manager pnpm --no-install --no-git-init
pnpm install
```

> `--no-install` để tự kiểm soát; `--no-git-init` vì sẽ init git ở host.

### Bước 4 — Cài các module

```bash
# Vẫn trong container
pnpm dlx nuxi@latest module add @vite-pwa/nuxt
pnpm dlx nuxi@latest module add @nuxt/ui
```

### Bước 5 — Cấu hình `nuxt.config.ts`

Mở file `nuxt.config.ts` (ở host, qua VS Code) và thay nội dung:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: { compatibilityVersion: 4 },

  modules: [
    '@nuxt/ui',
    '@vite-pwa/nuxt',
  ],

  // Cần thiết để Vite HMR hoạt động qua Docker
  vite: {
    server: {
      watch: { usePolling: true },
      hmr: { host: 'localhost', port: 24678 },
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'My Nuxt PWA',
      short_name: 'NuxtPWA',
      description: 'Nuxt 4 PWA',
      theme_color: '#18181b',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        { src: '/pwa-icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/pwa-icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
      navigateFallback: '/',
      cleanupOutdatedCaches: true,
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600,
    },
    devOptions: {
      enabled: false,   // Đặt true khi muốn test SW trong dev
      type: 'module',
    },
  },
})
```

### Bước 6 — Sửa `app/app.vue`

```vue
<!-- app/app.vue -->
<template>
  <NuxtPwaAssets />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

### Bước 7 — Chạy dev server

```bash
# Trong container
pnpm dev
```

Mở trình duyệt: **http://localhost:3000** ✅

---

## 6. Workflow hàng ngày (sau khi đã init)

```bash
# Khởi động container (nếu đã stop)
docker compose up -d

# Exec vào
docker compose exec nuxt bash

# Chạy dev
pnpm dev

# Hoặc chạy thẳng không cần exec:
docker compose exec nuxt pnpm dev
```

Dừng:
```bash
docker compose down              # Stop container
docker compose down -v           # Stop + xoá volumes (mất pnpm cache)
```

Xem log:
```bash
docker compose logs -f nuxt
```

---

## 7. Cài MCP servers + Skill cho Claude Code

Trước khi bắt đầu code, cấu hình AI assistant để có context Nuxt mới nhất:

### MCP servers (tra cứu docs/components real-time)

```bash
# Trên host
claude mcp add --transport http nuxt-ui-remote https://ui.nuxt.com/mcp
claude mcp add --transport http nuxt-remote https://nuxt.com/mcp
```

| MCP Server | URL | Dùng để |
|---|---|---|
| `nuxt-ui-remote` | `https://ui.nuxt.com/mcp` | Tra component/props/examples của Nuxt UI v4 |
| `nuxt-remote` | `https://nuxt.com/mcp` | Tra docs Nuxt 4, deploy guides, migration |

Trong Claude Code, gõ `@` để truy cập resources, `/` để dùng prompts của MCP.

> **Lưu ý**: MCP tiêu khá nhiều token mỗi lần query. Chỉ enable khi cần tra cứu, không cần để mặc định cho mọi project.

### Skill `@vite-pwa/nuxt`

Copy folder skill vào project hoặc user-level:

```bash
# Project-level (chỉ project này dùng)
mkdir -p .claude/skills
cp -r path/to/vite-pwa-nuxt .claude/skills/

# Hoặc user-level (mọi project)
mkdir -p ~/.claude/skills
cp -r path/to/vite-pwa-nuxt ~/.claude/skills/
```

Sau đó Claude Code sẽ tự load skill này khi user hỏi về PWA Nuxt, service worker, install prompt, v.v.

> **Tại sao Skill thay vì MCP cho `@vite-pwa/nuxt`?**  
> Pattern PWA tương đối ổn định (không đổi mỗi tuần). Skill load tĩnh, không tốn token query như MCP. Quy tắc chung: **MCP cho data thay đổi liên tục (component API), Skill cho pattern/best practice ổn định.**

---

## 8. Tích hợp VS Code + Claude Code

### Claude Code chạy trên host (đơn giản nhất)
- Mở thư mục dự án trong VS Code ở **host**
- Claude Code thấy code (vì mount volume), chỉnh sửa bình thường
- Mọi lệnh `pnpm dev`, `pnpm add ...` thì chạy qua `docker compose exec nuxt pnpm ...`

---

## 9. Build PWA Icons

Đặt file `public/pwa-icons/icon.svg` (kích thước ≥ 512×512), rồi trong container:

```bash
pnpm dlx @vite-pwa/assets-generator --preset minimal public/pwa-icons/icon.svg
```

---

## 10. Test PWA

PWA cần build + preview (không phải `dev`) để Service Worker hoạt động đầy đủ:

```bash
# Trong container
pnpm build
pnpm preview --host 0.0.0.0
```

Mở Chrome DevTools → **Application** → **Service Workers** để kiểm tra.

Lighthouse audit:
```bash
# Trên host
npx lighthouse http://localhost:3000 --view --preset=desktop
```

---

## 11. Troubleshooting

| Vấn đề | Cách xử lý |
|---|---|
| File sinh ra bị `root:root` ở host (Linux) | Kiểm tra `USER_UID` đã export trước khi `docker compose build` |
| Hot-reload không chạy | Đảm bảo `CHOKIDAR_USEPOLLING=true` và `vite.server.watch.usePolling: true` |
| Port 3000 bị chiếm | Đổi mapping `"3001:3000"` trong docker-compose.yml |
| `pnpm install` chậm | Volume `pnpm_store` đang cache rồi, lần 2 sẽ nhanh hơn |
| Service Worker không update | Hard reload (Ctrl+Shift+R) hoặc clear ở DevTools → Application |

---

## Tham khảo

- [Nuxt 4 Docs](https://nuxt.com/docs)
- [@vite-pwa/nuxt](https://vite-pwa-org.netlify.app/frameworks/nuxt)
- [Nuxt UI v3](https://ui.nuxt.com)
