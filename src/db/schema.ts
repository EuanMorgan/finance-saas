import { text } from "drizzle-orm/pg-core";
import { pgTableCreator } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM.
 * Use the same database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const pgTable = pgTableCreator((name) => `finance_${name}`);

export const accounts = pgTable("accounts", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	userId: text("user_id").notNull(),
	plaidId: text("plaid_id"),
});

export const insertAccountSchema = createInsertSchema(accounts);
