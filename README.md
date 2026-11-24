# Ticketing

A minimal ticketing platform scaffold: a Fastify modular monolith and a Next.js starter. Business features will be added incrementally. There are no shared packages or business tables yet.

## Requirements

- Node.js **24.15.0** (see `.nvmrc`; use `nvm install && nvm use` if using nvm).
- pnpm **10.33.2** (`npm install --global pnpm@10.33.2`, or use your package manager version manager).
- Docker Engine / Docker Desktop with Docker Compose v2 or later, running.

## First-time setup

Run from the repository root:

```sh
cp .env.example .env
cp apps/api/.env.example apps/api/.env
pnpm install --frozen-lockfile
pnpm db:up
pnpm dev
```

`pnpm db:up` waits for PostgreSQL's health check. `pnpm dev` starts both host applications through Turborepo:

- Frontend: <http://127.0.0.1:3000>
- API liveness: <http://127.0.0.1:3001/health/live>
- API readiness: <http://127.0.0.1:3001/health/ready>

The frontend renders a static starter page and does not need an API URL or secrets. The backend loads `apps/api/.env`; Compose loads the root `.env`. Both files are ignored by Git. Example credentials are for local development only. Do not put real credentials in tracked files.

PostgreSQL is bound to loopback port **5434**, with persistent data in a Compose-managed named volume. If changing `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, or `POSTGRES_PORT` in `.env`, update `DATABASE_URL` in `apps/api/.env` as well. URL-encode special characters in credentials. PostgreSQL initialization settings only take effect on an empty volume; use the reset procedure to recreate an existing local database.

The API defaults to `HOST=127.0.0.1` and `PORT=3001`. Environment variables exported in the shell override values loaded from `.env`. Next.js uses port 3000; to override it, run `pnpm --filter @ticketing/web dev --port 3100`. Another worktree must use distinct app/database ports and a distinct Compose project name (set `COMPOSE_PROJECT_NAME` in its root `.env`). Resources are not isolated automatically.

## Workspace layout

- `apps/api/src/app.ts`: Fastify app construction and health routes; no listening port opened during tests.
- `apps/api/src/server.ts`: configuration, listening, signal handling, and shutdown.
- `apps/api/src/db`: PostgreSQL pool, Drizzle connection, and future schema.
- `apps/api/test`: deterministic health and configuration tests using Node's test runner and Fastify injection.
- `apps/web/app`: minimal Next.js App Router page and layout.

pnpm manages workspace dependencies and the lockfile. Turborepo orchestrates development, builds, type checking, and tests. Biome checks source files from one root configuration. The API uses `tsx` for development and `tsc` for production compilation and separate type checking.

## Database schema and migrations

Drizzle uses the `pg` connection pool. Readiness runs `select 1` through Drizzle, returning HTTP 200 on success and HTTP 503 on failure. Connection and query timeouts are two seconds each. Liveness always returns HTTP 200 while the process is serving. Closing the app closes the pool.

The schema in `apps/api/src/db/schema.ts` is intentionally empty. An empty Drizzle journal is included so migration tooling can run without placeholder tables or SQL migrations. To introduce a real domain table in a future feature:

1. Define and export the table in `apps/api/src/db/schema.ts` using `drizzle-orm/pg-core`.
2. Run `pnpm db:generate` from the root.
3. Review the generated SQL and metadata in `apps/api/drizzle/` and include them in the feature commit.
4. With PostgreSQL running, run `pnpm db:migrate` to apply pending migrations.

The generation and migration commands load `apps/api/.env` and use `apps/api/drizzle.config.ts`. Do not run migrations automatically on server startup. With the empty schema, generation reports no changes and migration application has no pending SQL to run. Avoid `drizzle-kit push` for the tracked schema workflow.

## Verification

```sh
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
```

These checks do not need a running database. Tests exercise liveness, readiness success/failure/recovery, response privacy, pool cleanup, and configuration. Type checking generates Next.js route types, including on a fresh checkout. `pnpm format` formats files; `pnpm check` checks formatting, lint, and imports together.

For a real database smoke test, with `pnpm dev` running:

```sh
curl --fail http://127.0.0.1:3000
curl --fail http://127.0.0.1:3001/health/live
curl --fail http://127.0.0.1:3001/health/ready
# Stop only this project's database; readiness must return 503, liveness 200.
docker compose stop postgres
curl -i http://127.0.0.1:3001/health/ready
curl --fail http://127.0.0.1:3001/health/live
pnpm db:up
curl --fail http://127.0.0.1:3001/health/ready
```

After building, production processes can be run separately on the host with `pnpm --filter @ticketing/api start` and `pnpm --filter @ticketing/web start`.

## Shutdown and database reset

Stop host applications with Ctrl+C. The API drains requests and closes its database pool. Stop and remove this project's containers and network while retaining data:

```sh
pnpm db:down
```

To **delete all local database data** for the current Compose project and start fresh:

```sh
docker compose down --volumes
pnpm db:up
# Once feature migrations exist:
pnpm db:migrate
```

Select the correct Compose project before running reset commands. Never reset a database or volume belonging to another worktree.
