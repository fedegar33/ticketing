import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export interface Database {
  check(): Promise<void>;
  close(): Promise<void>;
}

export function createDatabase(connectionString: string): Database {
  const pool = new Pool({
    connectionString,
    connectionTimeoutMillis: 2000,
    query_timeout: 2000,
    max: 5,
  });
  // Idle connections can fail independently of an active query.
  pool.on("error", (error) => console.error("PostgreSQL pool error", error));
  const db = drizzle({ client: pool });
  return {
    async check() {
      await db.execute(sql`select 1`);
    },
    async close() {
      await pool.end();
    },
  };
}
