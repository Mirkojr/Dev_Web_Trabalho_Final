import { prisma } from "../../lib/prisma";

export class DashboardService {
  async getMetrics() {
    const [
      users,
      recipes,
      approvedRecipes,
      pendingRecipes,
      rejectedRecipes,
      categories,
      pendingCategories,
      ingredients,
      pendingIngredients,
      comments,
      smashes,
      passes,
    ] = await Promise.all([
      prisma.user.count(),

      prisma.recipe.count(),

      prisma.recipe.count({
        where: {
          status: "APPROVED",
        },
      }),

      prisma.recipe.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.recipe.count({
        where: {
          status: "REJECTED",
        },
      }),

      prisma.category.count(),

      prisma.category.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.ingredient.count(),

      prisma.ingredient.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.comment.count(),

      prisma.recipeInteraction.count({
        where: {
          type: "SMASH",
        },
      }),

      prisma.recipeInteraction.count({
        where: {
          type: "PASS",
        },
      }),
    ]);

    return {
      users,
      recipes,
      approvedRecipes,
      pendingRecipes,
      rejectedRecipes,
      categories,
      pendingCategories,
      ingredients,
      pendingIngredients,
      comments,
      smashes,
      passes,
    };
  }
}