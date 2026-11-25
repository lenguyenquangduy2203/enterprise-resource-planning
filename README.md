# Enterprise Resource Planning System

## Build & Run

### 1. Build base images (required)

Base Dockerfiles are located in ./dev/base and are not published.

Build them locally before running the system.

```bash
docker build -f ./dev/base/Dockerfile.25-jdk-base-build \
  -t jdk25-build-base ./dev/base
```

```bash
docker build -f ./dev/base/Dockerfile.25-jdk-base-run \
  -t jdk25-runtime-base ./dev/base
```

```bash
cd ./frontend/fresh-client && deno task build
```

```bash
docker build -t erp-test-runner:latest -f testing/test-automation/Dockerfile testing/test-automation
```

### 2. Build and start services

```bash
DOCKER_BUILDKIT=1 docker compose up --build
```

Detached mode:

```bash
DOCKER_BUILDKIT=1 docker compose up -d --build
```

### 3. Clean rebuild (if needed)

```bash
docker compose down -v
docker compose up --build
```

### 4. Running Gray Box Test Runner

```bash
until curl -sf http://localhost:4444/status > /dev/null; do sleep 1; done && \
docker run --rm --network enterprise-resource-planning_erp \
    --env-file .env \
    erp-test-runner:latest
```

### Notes

Base images must be rebuilt only when files in ./dev/base change

MySQL initialization scripts run only on a fresh volume

## ⚠️ MySQL Init Script Not Executed (Docker Volume Gotcha)

### Problem

After starting the MySQL container, the database runs normally but:

- `01-init.sql` is not executed
- Only default databases (mysql, information_schema, etc.) exist
- No custom databases or tables are created

Even though:

- 01-init.sql exists in `/docker-entrypoint-initdb.d`
- The file path and permissions are correct

Root Cause

The official MySQL Docker image executes init scripts only once, during the first initialization of the data directory.

If the Docker volume mapped to `/var/lib/mysql` already exists, MySQL considers itself already initialized and silently skips all init scripts.

This commonly happens when:

- docker `compose down` is run without `-v`
- A named volume (e.g. mysql_data) is reused
- The container is recreated but the volume persists

How MySQL Init Scripts Work (Important)

MySQL runs files in `/docker-entrypoint-initdb.d` only if:

- `/var/lib/mysql` is empty
- The container is starting for the first time
- The scripts have valid extensions (.sql, .sh, .sql.gz)

If any of these conditions are not met, init scripts are skipped.

### ✅ Correct Fix (Required)

To force MySQL to re-run init scripts, you must remove the data volume.

Run the following commands:

```bash
docker compose down -v
docker compose up
```

⚠️ The `-v` flag is mandatory.

Without it, Docker will reuse the existing MySQL data volume and init scripts will NOT run.

### How to Verify Init Scripts Ran Successfully

1. Check container logs

```bash
docker logs mysql_db
```

You should see lines similar to:

```sh
[Entrypoint]: Initializing database
[Entrypoint]: Running /docker-entrypoint-initdb.d/01-init.sql
```

2. Verify databases inside MySQL

```bash
docker exec -it mysql_db mysql -u root -p
SHOW DATABASES;
```

Expected output includes your custom databases (e.g. erp_db, auth_db, etc.).

### ⚠️ Warning About Data Loss

Running:

```bash
docker compose down -v
```

Deletes all MySQL data stored in the Docker volume.

Do not use this command in production environments.

### Recommended Best Practice

Use docker-entrypoint-initdb.d only for:

- Creating databases
- Creating users
- Granting privileges

Use a migration tool (Flyway / Liquibase) for:

- Tables
- Schema changes
- Versioned migrations