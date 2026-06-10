import { prisma }
  from "../../lib/prisma";

import { HttpError }
  from "../../utils/http-error";

export class ModerationService {

  async approveRecipe(
    recipeId: string
  ) {
    const recipe =
      await prisma.recipe.findUnique({
        where: {
          id: recipeId,
        },
      });

    if (!recipe) {
      throw new HttpError(
        404,
        "Recipe not found"
      );
    }

    return prisma.recipe.update({
      where: {
        id: recipeId,
      },

      data: {
        status: "APPROVED",
      },
    });
  }

  async rejectRecipe(
    recipeId: string
  ) {
    const recipe =
      await prisma.recipe.findUnique({
        where: {
          id: recipeId,
        },
      });

    if (!recipe) {
      throw new HttpError(
        404,
        "Recipe not found"
      );
    }

    return prisma.recipe.update({
      where: {
        id: recipeId,
      },

      data: {
        status: "REJECTED",
      },
    });
  }
}