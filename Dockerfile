# Dockerfile for Expo Web
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* yarn.lock* ./

# Install dependencies
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; elif [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .

# Build the Expo project (static export)
RUN npx expo export

FROM node:22-alpine AS runner
WORKDIR /app

# Install a simple static server and add non-root user
RUN npm install -g serve \
    && adduser -D appuser

# Copy built web files from builder
COPY --from=builder /app/dist /app/dist

# Switch to non-root user
USER appuser

EXPOSE 3000

# Add healthcheck for production
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --spider -q http://localhost:3000 || exit 1

CMD ["serve", "-s", "dist", "-l", "3000"]
