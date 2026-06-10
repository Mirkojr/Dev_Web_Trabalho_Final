import { prisma } from "../../lib/prisma";

import { HttpError }
  from "../../utils/http-error";

import {
  CreateRecipeDto,
} from "./recipes.schemas";

export class RecipesService {
  async create(
    userId: string,
    data: CreateRecipeDto
  ) {
    const categories =
      await prisma.category.findMany({
        where: {
          id: {
            in: data.categoryIds,
          },

          status: "APPROVED",
        },
      });

    if (
      categories.length !==
      data.categoryIds.length
    ) {
      throw new HttpError(
        400,
        "Invalid categories"
      );
    }

    const ingredients =
      await prisma.ingredient.findMany({
        where: {
          id: {
            in: data.ingredients.map(
              (item) =>
                item.ingredientId
            ),
          },

          status: "APPROVED",
        },
      });

    if (
      ingredients.length !==
      data.ingredients.length
    ) {
      throw new HttpError(
        400,
        "Invalid ingredients"
      );
    }

    return prisma.recipe.create({
      data: {
        title: data.title,

        description:
          data.description,

        preparationMethod:
          data.preparationMethod,

        preparationTimeMinutes:
          data.preparationTimeMinutes,

        difficulty:
          data.difficulty,

        status: "PENDING",

        authorId: userId,

        categories: {
          create:
            data.categoryIds.map(
              (categoryId) => ({
                categoryId,
              })
            ),
        },

        dietPreferences: {
          create:
            data.dietPreferenceIds.map(
              (
                dietPreferenceId
              ) => ({
                dietPreferenceId,
              })
            ),
        },

        ingredients: {
          create:
            data.ingredients.map(
              (ingredient) => ({
                ingredientId:
                  ingredient.ingredientId,

                quantity:
                  ingredient.quantity,

                unit:
                  ingredient.unit,
              })
            ),
        },
      },

      include: {
        categories: true,
        ingredients: true,
        dietPreferences: true,
      },
    });
  }
}