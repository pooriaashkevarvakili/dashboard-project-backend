# =========================
# 1. Build stage
# =========================
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies first (better cache)
COPY package*.json ./

RUN npm ci

# Copy source
COPY . .

# Build NestJS
RUN npm run build

# Remove dev dependencies
RUN npm prune --omit=dev


# =========================
# 2. Production stage
# =========================
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy only production artifacts
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# مهم برای NestJS
ENV NODE_ENV=production

EXPOSE 8000

# اجرای صحیح NestJS
CMD ["node", "dist/main.js"]