import { createTRPCRouter } from "./trpc";
import { testRouter } from "./routers/testRouter";

export const appRouter = createTRPCRouter({
  test: testRouter,
});

export type AppRouter = typeof appRouter;
