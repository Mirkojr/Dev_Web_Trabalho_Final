import { prisma } from "../../lib/prisma";
import { HttpError } from "../../utils/http-error";
import { CreateInteractionDto } from "./recipe-interactions.schemas";

export class RecipeInteractionsService {
  async create(userId: string, data: CreateInteractionDto) {
    const recipe = await prisma.recipe.findFirst({
      where: {
        id: data.recipeId,
        status: "APPROVED",
      },
      select: { id: true },
    });

    if (!recipe) {
      throw new HttpError(404, "Recipe not found or not approved");
    }

    try {
      return await prisma.recipeInteraction.create({
        data: {
          userId,
          recipeId: data.recipeId,
          type: data.type,
        },
      });
    } catch (err: any) {
      // Prisma unique constraint violation
      if (err.code === "P2002") {
        throw new HttpError(409, "User already interacted with this recipe");
      }

      throw err;
    }
  }

  async undoLast(userId: string) {
    const lastInteraction = await prisma.recipeInteraction.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { id: true },
    });

    if (!lastInteraction) {
      throw new HttpError(404, "No interaction found");
    }

    await prisma.recipeInteraction.delete({
      where: {
        id: lastInteraction.id,
      },
    });

    return { undone: true };
  }

  async getUserInteractions(userId: string) {
    return prisma.recipeInteraction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        recipe: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
          },
        },
      },
    });
  }
}