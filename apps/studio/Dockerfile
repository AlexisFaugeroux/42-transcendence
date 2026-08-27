# Base
FROM node:24-alpine AS base
RUN npm install -g pnpm@11.1.3
WORKDIR /app

# Builder
FROM base AS build
# Copy files required to install dependencies
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/studio/package.json apps/studio/
COPY packages/auth/package.json packages/auth/
COPY packages/date/package.json packages/date/
COPY packages/ui/package.json packages/ui/
COPY packages/eslint-config/package.json packages/eslint-config/
COPY packages/prettier-config/package.json packages/prettier-config/
# Install deps
RUN pnpm install --frozen-lockfile --filter @transcendence/studio...
# Copy source code and build
COPY apps/studio apps/studio
COPY packages packages
RUN pnpm --filter @transcendence/studio build

# Runtime - serves statique app file with nginx
FROM nginx:1.30.3-alpine AS runtime
COPY --from=build /app/apps/studio/dist /usr/share/nginx/html
COPY apps/studio/nginx-spa.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
