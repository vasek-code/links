// src/server/router/index.ts
import { t } from "./trpc";

import { userRouter } from "./subroutes/user";

export const appRouter = t.router({
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
