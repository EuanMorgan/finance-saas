import "dotenv/config";
import type { Config } from "drizzle-kit";

console.log(process.env);
export default {
	schema: "./src/db/schema.ts",
	out: "./src/db/out",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL as string,
	},
	tablesFilter: ["finance_*"],
	verbose: true,
	strict: true,
} satisfies Config;
