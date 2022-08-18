import { createRouter } from "../trpc/context";
import { z } from "zod";
import { t } from "../trpc";
import { protectedProcedure } from "../utils/protected-procedure";

export const linkRouter = t.router({
  updateLink: protectedProcedure
    .input(
      z.object({
        text: z.string().optional(),
        linkUrl: z.string().url().optional(),
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          links: {
            update: {
              where: {
                id: input.id,
              },
              data: {
                linkUrl: input.linkUrl,
                text: input.text,
              },
            },
          },
        },
      });

      return user;
    }),
  deleteLink: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          links: {
            delete: {
              id: input.id,
            },
          },
        },
      });

      return user;
    }),
  createLink: protectedProcedure
    .input(
      z.object({
        linkUrl: z.string().url(),
        text: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const link = await ctx.prisma.link.create({
        data: {
          linkUrl: input.linkUrl,
          text: input.text,
          userId: ctx.session.user.id as string,
        },
      });

      return link;
    }),
});
