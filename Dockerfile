# Edd Norris portfolio — Railway production image (monorepo root).
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/personal/package.json apps/personal/
COPY packages/career-data/package.json packages/career-data/
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY apps/personal apps/personal
COPY packages packages
COPY scripts scripts
COPY schema schema
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/personal ./apps/personal
COPY --from=builder /app/packages ./packages

EXPOSE 3000
CMD ["npm", "run", "start"]
