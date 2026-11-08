import { createTRPCRouter } from "./trpc";
import { newsletterRouter } from "./routers/newsletterRouter";

export const appRouter = createTRPCRouter({
  newsletter: newsletterRouter,
});

export type AppRouter = typeof appRouter;
