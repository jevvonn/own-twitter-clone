import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.comment.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          postId: input.postId,
        },
        include: {
          user: true,
          likedBy: ctx.session
            ? {
                cursor: {
                  id: ctx.session.user.id,
                },
                select: {
                  id: true,
                },
              }
            : false,
          _count: {
            select: {
              likedBy: true,
            },
          },
        },
      });
    }),
  create: protectedProcedure
    .input(z.object({ postId: z.string(), content: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.comment.create({
        data: {
          content: input.content,
          post: {
            connect: {
              id: input.postId,
            },
          },
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  like: protectedProcedure
    .input(z.object({ commentId: z.string(), isLiked: z.boolean() }))
    .mutation(({ ctx, input }) => {
      if (input.isLiked) {
        return ctx.prisma.comment.update({
          where: {
            id: input.commentId,
          },
          data: {
            likedBy: {
              disconnect: {
                id: ctx.session.user.id,
              },
            },
          },
        });
      } else {
        return ctx.prisma.comment.update({
          where: {
            id: input.commentId,
          },
          data: {
            likedBy: {
              connect: {
                id: ctx.session.user.id,
              },
            },
          },
        });
      }
    }),
});
