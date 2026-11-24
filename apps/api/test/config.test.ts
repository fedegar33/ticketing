import assert from "node:assert/strict";
import { test } from "node:test";
import { readConfig } from "../src/config.js";

const DATABASE_URL = "postgresql://example:example@localhost:5434/example";

test("configuration requires a PostgreSQL URL", () => {
  assert.throws(() => readConfig({}), /DATABASE_URL is required/);
  assert.throws(
    () => readConfig({ DATABASE_URL: "https://localhost" }),
    /must use PostgreSQL/,
  );
});

test("configuration defaults to local host and port", () => {
  assert.deepEqual(readConfig({ DATABASE_URL }), {
    databaseUrl: DATABASE_URL,
    host: "127.0.0.1",
    port: 3001,
  });
});

test("configuration accepts overrides and rejects invalid ports", () => {
  assert.equal(
    readConfig({ DATABASE_URL, PORT: "3101", HOST: "0.0.0.0" }).port,
    3101,
  );
  for (const PORT of ["", "0", "65536", "1.5", "invalid"]) {
    assert.throws(() => readConfig({ DATABASE_URL, PORT }), /PORT must be/);
  }
});
