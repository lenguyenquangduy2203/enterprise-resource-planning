# Force amd64 to avoid Rollup / Vite ARM optional-deps bug --platform=linux/amd64
FROM denoland/deno:latest

# App directory
WORKDIR /app

# Copy source
COPY . .

# Build Fresh app
RUN deno cache _fresh/server.js

# Fresh default port
EXPOSE 5173

# Run Fresh production server
CMD ["deno", "task", "start"]
