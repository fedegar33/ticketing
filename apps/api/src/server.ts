import { buildApp } from "./app.js";
import { readConfig } from "./config.js";
import { createDatabase } from "./db/client.js";

const config = readConfig();
const app = buildApp({
  database: createDatabase(config.databaseUrl),
  logger: true,
});

async function shutdown() {
  try {
    await app.close();
  } catch (error) {
    app.log.error(error);
    process.exitCode = 1;
  }
}
process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);

try {
  await app.listen({ host: config.host, port: config.port });
} catch (error) {
  app.log.error(error);
  process.exitCode = 1;
  await app.close();
}
