import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { db, schema } from "~/db";
import { accounts, insertAccountSchema } from "~/db/schema";
const app = new Hono()
	.get("/", clerkMiddleware(), async (c) => {
		const auth = getAuth(c);

		if (!auth?.userId) {
			return c.json(
				{
					error: "Unauthorized",
				},
				401,
			);
		}

		const data = await db
			.select({
				id: schema.accounts.id,
				name: schema.accounts.name,
			})
			.from(schema.accounts)
			.where(eq(accounts.userId, auth.userId));

		return c.json({ data });
	})
	.post(
		"/",
		clerkMiddleware(),
		zValidator(
			"json",
			insertAccountSchema.pick({
				name: true,
			}),
		),

		async (c) => {
			const auth = getAuth(c);

			const values = c.req.valid("json");

			if (!auth?.userId) {
				return c.json(
					{
						error: "Unauthorized",
					},
					401,
				);
			}

			const [data] = await db
				.insert(schema.accounts)
				.values({
					id: createId(),
					userId: auth.userId,
					...values,
				})
				.returning();

			return c.json({ data });
		},
	);

export default app;
