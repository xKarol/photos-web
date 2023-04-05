FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
COPY ./apps/web/package*.json ./apps/web/
COPY ./packages/types/package*.json ./packages/types/

# Install dependencies based on the preferred package manager
RUN npm ci
# install prisma
RUN npm i prisma -g


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ./apps/backend/prisma/schema.prisma ./prisma/
COPY ./packages/types ./packages/types
COPY . .

RUN npx prisma generate
RUN npx lerna run build --scope='@app/types'

ENV NEXT_TELEMETRY_DISABLED 1

RUN npx lerna run build --scope='web'


# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static


COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
# merge two node_modules folders into one
COPY --from=builder /app/apps/web/node_modules /tmp/node_modules
RUN cp -R /tmp/node_modules/* /app/node_modules/ && rm -Rf /tmp/node_modules

COPY --from=builder /app/apps/web/package.json ./package.json
COPY --from=builder /app/next.config.js ./

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]