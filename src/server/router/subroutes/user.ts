import { createRouter } from "../trpc/context";
import { z } from "zod";
import { User } from "@prisma/client";
import { t } from "../trpc";
import { protectedProcedure } from "../utils/protected-procedure";

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
  updateUser: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        bio: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log(ctx.session);

      const user = await ctx.prisma.user.update({
        data: {
          name: input.name,
          bio: input.bio,
        },
        where: {
          id: ctx.session.user.id,
        },
      });

      return user;
    }),
});
