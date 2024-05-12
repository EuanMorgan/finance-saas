import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "~/env";
import * as schema from "./schema";

const sql = neon(env.DATABASE_URL as string);

const db = drizzle(sql, { schema });

export { db, schema };
