// src/server/router/index.ts
import { t } from "./trpc";

import { userRouter } from "./subroutes/user";
import { linkRouter } from "./subroutes/link";

export const appRouter = t.router({
  user: userRouter,
  link: linkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
