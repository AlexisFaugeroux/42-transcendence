# Base
FROM node:24-alpine AS base
RUN npm install -g pnpm@11.1.3
WORKDIR /app

# Builder
FROM base AS build
# Copy files required to install dependencies
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/front/package.json apps/front/
COPY packages/auth/package.json packages/auth/
COPY packages/date/package.json packages/date/
COPY packages/ui/package.json packages/ui/
COPY packages/eslint-config/package.json packages/eslint-config/
COPY packages/prettier-config/package.json packages/prettier-config/
# Install deps
RUN pnpm install --frozen-lockfile --filter @transcendence/front...
# Copy source code and build
COPY apps/front apps/front
COPY packages packages
ARG VITE_API_URL
ARG VITE_STUDIO_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_STUDIO_URL=$VITE_STUDIO_URL
RUN pnpm --filter @transcendence/front build

# Runtime - serves statique app file with nginx
FROM nginx:1.30.3-alpine AS runtime
COPY --from=build /app/apps/front/dist /usr/share/nginx/html
COPY apps/front/nginx-spa.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
