import assert from "node:assert/strict";
import { test } from "node:test";
import { buildApp } from "../src/app.js";
import type { Database } from "../src/db/client.js";

function database(check: Database["check"] = async () => {}): Database {
  return { check, close: async () => {} };
}

test("liveness does not query an unavailable database", async (t) => {
  let calls = 0;
  const app = buildApp({
    database: database(async () => {
      calls++;
      throw new Error("offline");
    }),
  });
  t.after(() => app.close());
  const response = await app.inject({ method: "GET", url: "/health/live" });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { status: "ok" });
  assert.equal(calls, 0);
});

test("readiness succeeds after checking the database", async (t) => {
  let calls = 0;
  const app = buildApp({
    database: database(async () => {
      calls++;
    }),
  });
  t.after(() => app.close());
  const response = await app.inject({ method: "GET", url: "/health/ready" });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { status: "ok" });
  assert.equal(calls, 1);
});

test("readiness returns 503 without leaking database errors and recovers", async (t) => {
  let available = false;
  const app = buildApp({
    database: database(async () => {
      if (!available) throw new Error("private database details");
    }),
  });
  t.after(() => app.close());
  const response = await app.inject({ method: "GET", url: "/health/ready" });
  assert.equal(response.statusCode, 503);
  assert.deepEqual(response.json(), { status: "unavailable" });
  assert.ok(!response.body.includes("private"));
  available = true;
  assert.equal((await app.inject("/health/ready")).statusCode, 200);
});

test("closing the application releases the database", async () => {
  let closed = false;
  const app = buildApp({
    database: {
      check: async () => {},
      close: async () => {
        closed = true;
      },
    },
  });
  await app.ready();
  await app.close();
  assert.equal(closed, true);
});
