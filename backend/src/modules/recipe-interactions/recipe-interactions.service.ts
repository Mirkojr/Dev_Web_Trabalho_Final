import { prisma } from "../../lib/prisma";
import { HttpError } from "../../utils/http-error";
import { InteractionType } from "../../generated/prisma";

export class RecipeInteractionsService {
  async swipe(userId: string, recipeId: string, type: InteractionType) {
    const recipe = await prisma.recipe.findFirst({
      where: {
        id: recipeId,
        status: "APPROVED",
      },
    });

    if (!recipe) {
      throw new HttpError(404, "Recipe not found");
    }

    return prisma.recipeInteraction.upsert({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
      update: {
        type,
      },
      create: {
        userId,
        recipeId,
        type,
      },
    });
  }

  async feed(userId: string, limit = 10) {
    const interactions = await prisma.recipeInteraction.findMany({
      where: { userId },
      select: { recipeId: true },
    });

    const excludedIds = interactions.map((i) => i.recipeId);

    return prisma.recipe.findMany({
      where: {
        status: "APPROVED",
        id: {
          notIn: excludedIds,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
  }

  async undo(userId: string) {
    const last = await prisma.recipeInteraction.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    if (!last) {
      throw new HttpError(404, "No interaction found");
    }

    await prisma.recipeInteraction.delete({
      where: {
        userId_recipeId: {
          userId,
          recipeId: last.recipeId,
        },
      },
    });

    return { undone: true };
  }
}