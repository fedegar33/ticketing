import Fastify from "fastify";
import type { Database } from "./db/client.js";

export function buildApp({
  database,
  logger = false,
}: {
  database: Database;
  logger?: boolean;
}) {
  const app = Fastify({ logger });
  app.addHook("onClose", async () => database.close());

  app.get("/health/live", async () => ({ status: "ok" }));
  app.get("/health/ready", async (request, reply) => {
    try {
      await database.check();
      return { status: "ok" };
    } catch (error) {
      request.log.warn({ err: error }, "Database readiness check failed");
      return reply.code(503).send({ status: "unavailable" });
    }
  });
  return app;
}
