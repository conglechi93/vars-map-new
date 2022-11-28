FROM node:16-alpine AS base

WORKDIR /app

# Copy source
COPY . .

# Run build bundle
RUN npm ci --force
RUN npm run build

#
# --- Production Image ---
FROM nginx:1.20-alpine
COPY --from=base /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=base /app/build/ /usr/share/nginx/html/