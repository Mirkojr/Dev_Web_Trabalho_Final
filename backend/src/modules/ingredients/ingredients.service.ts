import { prisma } from "../../lib/prisma";

import { HttpError }
  from "../../utils/http-error";

import {
  CreateIngredientDto,
} from "./ingredients.schemas";

export class IngredientsService {
  async findAll() {
    return prisma.ingredient.findMany({
      where: {
        status: "APPROVED",
      },

      include: {
        allergens: {
          include: {
            allergen: true,
          },
        },

        createdBy: {
          select: {
            id: true,
            username: true,
          },
        },
      },

      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(id: string) {
    const ingredient =
      await prisma.ingredient.findUnique({
        where: {
          id,
        },

        include: {
          allergens: {
            include: {
              allergen: true,
            },
          },

          createdBy: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });

    if (!ingredient) {
      throw new HttpError(
        404,
        "Ingredient not found"
      );
    }

    return ingredient;
  }

  async create(
    userId: string,
    data: CreateIngredientDto
  ) {
    const existing =
      await prisma.ingredient.findUnique({
        where: {
          name: data.name,
        },
      });

    if (existing) {
      throw new HttpError(
        409,
        "Ingredient already exists"
      );
    }

    const allergens =
      await prisma.allergen.findMany({
        where: {
          id: {
            in: data.allergenIds,
          },
        },
      });

    if (
      allergens.length !==
      data.allergenIds.length
    ) {
      throw new HttpError(
        400,
        "Invalid allergen ids"
      );
    }

    return prisma.ingredient.create({
      data: {
        name: data.name,

        status: "PENDING",

        createdById: userId,

        allergens: {
          create:
            data.allergenIds.map(
              (allergenId) => ({
                allergenId,
              })
            ),
        },
      },

      include: {
        allergens: {
          include: {
            allergen: true,
          },
        },

        createdBy: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }
}