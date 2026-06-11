import { prisma } from "../../lib/prisma";
import { HttpError } from "../../utils/http-error";
import { CreateCommentDto, UpdateCommentDto } from "./comments.schemas";

export class CommentsService {
  async create(userId: string, data: CreateCommentDto) {
    const recipe = await prisma.recipe.findUnique({
      where: { id: data.recipeId },
      select: { id: true },
    });

    if (!recipe) {
      throw new HttpError(404, "Recipe not found");
    }

    return prisma.comment.create({
      data: {
        userId,
        recipeId: data.recipeId,
        content: data.content,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  async findByRecipe(recipeId: string) {
    return prisma.comment.findMany({
      where: { recipeId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(commentId: string, userId: string, isAdmin: boolean, data: UpdateCommentDto) {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new HttpError(404, "Comment not found");
    }

    if (comment.userId !== userId && !isAdmin) {
      throw new HttpError(403, "Not allowed");
    }

    return prisma.comment.update({
      where: { id: commentId },
      data: {
        content: data.content,
      },
    });
  }

  async delete(commentId: string, userId: string, isAdmin: boolean) {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new HttpError(404, "Comment not found");
    }

    if (comment.userId !== userId && !isAdmin) {
      throw new HttpError(403, "Not allowed");
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });

    return { deleted: true };
  }
}