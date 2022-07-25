import { createRouter } from "../trpc/context";
import { z } from "zod";
import * as trpc from "@trpc/server";
import { User } from "@prisma/client";
import { t } from "../trpc";

export const userRouter = t.router({
  getByName: t.procedure
    .input(
      z.object({
        name: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = ctx.prisma.user.findFirst({
        where: {
          name: input.name,
        },
        select: {
          links: true,
          image: true,
          name: true,
          bio: true,
        },
      });

      return user;
    }),
});
