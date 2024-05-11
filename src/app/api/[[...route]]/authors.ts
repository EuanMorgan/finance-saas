import { Hono } from "hono";

const app = new Hono();

app.get("/", (ctx) => {
  return ctx.json({ authors: [] });
});

export default app;
