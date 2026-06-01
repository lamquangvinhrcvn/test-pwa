# Nuxt 4 PWA — Docker Dev Environment

> **Stack**: Nuxt 4 + @vite-pwa/nuxt + @nuxt/ui + Docker Compose
>
> Port: **59000** | Container: **pwa-fager-ug** | Package manager: **pnpm**

---

## Cài đặt & Khởi động

### Yêu cầu

- Docker + Docker Compose
- Node.js 22 (trong container)
- pnpm 9.x+ (trong container, qua corepack)

### Lần đầu setup

```bash
# 1. Build + start container
docker compose up -d --build

# 2. Exec vào container
docker compose exec nuxt bash

# 3. Trong container: cài deps
pnpm install

# 4. Chạy dev server
pnpm dev
```

Mở trình duyệt: **http://localhost:59000**

### Workflow hàng ngày

```bash
# Start container + dev server
docker compose up -d
docker compose exec nuxt pnpm dev

# Hoặc exec vào rồi chạy
docker compose exec nuxt bash
pnpm dev

# Stop container
docker compose down
```

---

## Test PWA

### Dev mode (nhanh, SW bật)

```bash
docker compose exec nuxt pnpm dev
# → http://localhost:59000
# → Mở Chrome DevTools → Application → Service Workers
# → devOptions.enabled = true → SW chạy trong dev
```

Trang hiển thị debug panel với 6 chỉ số:
| Chỉ số | Ý nghĩa |
|---|---|
| Kết nối | Online / Offline |
| Service Worker | active / chưa đăng ký / đang cài |
| Standalone | Đã mở ở chế độ PWA standalone chưa |
| Cài đặt được | Browser đã fire `beforeinstallprompt` |
| Đã cài PWA | App đã được install qua manifest |
| Offline Ready | Cache lần đầu hoàn tất |

### Production mode (test PWA đầy đủ)

```bash
# Build + preview (SW hoạt động chuẩn)
# Container chạy port 3000, host map 59000 → 3000
docker compose exec nuxt pnpm build
docker compose exec nuxt pnpm preview
# → http://localhost:59000
```

> **Quan trọng**: Install prompt (`beforeinstallprompt`) chỉ fire khi:
> - Site chạy qua **HTTPS** hoặc **localhost**
> - Có **user engagement** (click, scroll vài lần)
> - Manifest hợp lệ + có icon PNG trong `public/pwa-icons/`
> - User chưa từng cài app này trước đó
>
> Nếu không thấy nút "Cài đặt lên màn hình chính", thử:
> 1. Mở Chrome DevTools → Application → Manifest → kiểm tra manifest có lỗi không
> 2. Application → Service Workers → check SW có status "activated"
> 3. Click vài lần trên trang để tạo engagement
> 4. Vào `chrome://serviceworker-internals` → tìm scope → Unregister → reload lại trang
> 5. Dùng chế độ Incognito (không cache SW cũ)

### Lighthouse Audit

```bash
# Trên host
npx lighthouse http://localhost:59000 --view --preset=desktop
```

---

## Cấu trúc project

```
├── .docker/node/Dockerfile       # Node 22 + pnpm
├── docker-compose.yml            # Port 59000, mount volume
├── .gitignore
├── .README.md                    # File này
├── .claude/skills/vite-pwa-nuxt/ # Skill PWA cho Claude Code
├── ug-ccas-app/                  # Source Nuxt (mount vào /app)
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

## Tạo PWA Icons

```bash
# 1. Đặt file icon.svg (≥512×512) vào public/pwa-icons/
# 2. Trong container:
docker compose exec nuxt bash
pnpm dlx @vite-pwa/assets-generator --preset minimal public/pwa-icons/icon.svg
```

---

## Lệnh hữu ích

```bash
# Xem log container
docker compose logs -f nuxt

# Restart container
docker compose restart

# Xoá sạch (kể cả volume cache pnpm)
docker compose down -v

# Cài thêm package
docker compose exec nuxt pnpm add <package-name>
```

---

## Troubleshooting

| Vấn đề | Cách xử lý |
|---|---|
| Trang trắng / 500 error | Kiểm tra `docker compose logs nuxt` — thường do SSR error (dùng `import.meta.client` hoặc `onMounted` cho browser API) |
| Hot-reload không chạy | Đảm bảo `CHOKIDAR_USEPOLLING=true` + `vite.server.watch.usePolling: true` |
| Port 59000 bị chiếm | Đổi port trong `docker-compose.yml` + `PORT` env |
| File sinh ra bị `root:root` | Export `USER_UID=$(id -u)` và `USER_GID=$(id -g)` trước `docker compose build` |
| SW không update | Hard reload (Ctrl+Shift+R), clear SW ở DevTools → Application |
| Install prompt không hiện | Xem phần "Test PWA" phía trên, kiểm tra manifest + SW + engagement |
