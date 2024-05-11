import { z } from "zod";

import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import authors from "./authors";
export const runtime = "edge";

const app = new Hono().basePath("/api");

app.route("/authors", authors);

app.get("/hello", clerkMiddleware(), (ctx) => {
  const auth = getAuth(ctx);
  if (!auth?.userId) {
    return ctx.json({ error: "Unauthorized" }, 401);
  }
  return ctx.json({ hello: "world", user: auth.userId });
});

export const GET = handle(app);
export const POST = handle(app);
