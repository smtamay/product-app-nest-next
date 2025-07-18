# frontend/Dockerfile
FROM node:22-alpine

# Usa pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]

