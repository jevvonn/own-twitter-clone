import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
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
            comments: true,
            likedBy: true,
          },
        },
      },
    });
  }),
  getSingle: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findUnique({
        where: {
          id: input.postId,
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
              comments: true,
              likedBy: true,
            },
          },
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ postId: z.string(), postUserId: z.string() }))
    .mutation(({ ctx, input }) => {
      if (input.postUserId === ctx.session.user.id) {
        return ctx.prisma.post.delete({
          where: {
            id: input.postId,
          },
        });
      }

      throw new Error("You can't delete this post");
    }),
  create: protectedProcedure
    .input(
      z.object({
        content: z
          .string()
          .max(150, "Your content must be less than 150 characters"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.post.create({
        data: {
          content: input.content,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  like: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        isLiked: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      if (input.isLiked) {
        return ctx.prisma.post.update({
          where: {
            id: input.postId,
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
        return ctx.prisma.post.update({
          where: {
            id: input.postId,
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
