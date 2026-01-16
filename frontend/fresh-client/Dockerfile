# Force amd64 to avoid Rollup / Vite ARM optional-deps bug
FROM --platform=linux/amd64 denoland/deno:1.40.2

# App directory
WORKDIR /app

# Copy source
COPY . .

# Build Fresh app
RUN deno task build \
    && deno cache _fresh/server.js

# Fresh default port
EXPOSE 5173

# Run Fresh production server
CMD ["deno", "serve", "-A", "_fresh/server.js"]
