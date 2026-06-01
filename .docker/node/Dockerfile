# Dockerfile
FROM node:22-bookworm-slim
WORKDIR /app
# Cài git (nuxi init cần) + utilities
RUN apt-get -y update && apt-get -y upgrade

# Bật pnpm qua corepack
RUN corepack enable && corepack prepare pnpm@latest --activate


RUN node -v
RUN npm -v
# Pre-fetch pnpm vào cache để lần install đầu nhanh hơn
RUN pnpm config set store-dir /home/node/.pnpm-store

ENV HOST 0.0.0.0
ENV PORT 3000
EXPOSE 3000

# Container "không làm gì cả" — chờ mình exec vào
CMD ["tail", "-f", "/dev/null"]
