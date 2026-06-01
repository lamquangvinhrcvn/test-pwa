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
