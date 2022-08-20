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
  updateIcon: protectedProcedure
    .input(
      z.object({
        url: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        data: {
          image: input.url,
        },
        where: {
          id: ctx.session.user.id,
        },
      });

      return user;
    }),
  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    const link = await ctx.prisma.link.deleteMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    const user = await ctx.prisma.user.deleteMany({
      where: {
        id: ctx.session.user.id,
      },
    });

    const account = await ctx.prisma.account.deleteMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    const session = await ctx.prisma.session.deleteMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return [user, account, session, link];
  }),
});
