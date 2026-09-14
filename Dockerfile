FROM node:20-slim AS builder
WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy the entire workspace first to satisfy local package dependencies
COPY . .

# Install dependencies and build production bundle
RUN pnpm install --frozen-lockfile || pnpm install
RUN pnpm exec vite build

# Production web server stage
FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html

# SPA fallback configuration for Nginx
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
