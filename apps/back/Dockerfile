# Base
FROM node:26-alpine AS base
RUN npm install -g pnpm@11.1.3
WORKDIR /app

# Builder
FROM base AS build
# Copy files required to install dependencies
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/back/package.json apps/back/
COPY packages/eslint-config/package.json packages/eslint-config/
COPY packages/prettier-config/package.json packages/prettier-config/
# Install deps
RUN pnpm install --frozen-lockfile --filter @transcendence/back...
# Copy source code and build
COPY apps/back apps/back
COPY packages packages
RUN pnpm --filter @transcendence/back db:generate \
  && pnpm --filter @transcendence/back build \
  && pnpm --filter @transcendence/back build:seed
# Creates a "prod" version with no dev dependencies --> lighter
# Also actually copies node_modules from internal packages
RUN pnpm --filter @transcendence/back deploy --prod --legacy /prod

# Runtime - final 
FROM base AS runtime
WORKDIR /app
COPY --from=build /prod .
RUN chmod +x /app/docker-entrypoint.sh
ENV NODE_ENV=production
EXPOSE 8080
ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["node", "build/index.js"]
