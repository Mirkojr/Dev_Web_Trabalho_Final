import { prisma } from "../../lib/prisma";

import { HttpError } from "../../utils/http-error";

import {
  CreateIngredientDto,
  UpdateIngredientDto,
} from "./ingredients.schemas";

export class IngredientsService {
  async findAll() {
    return prisma.ingredient.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(id: string) {
    const ingredient =
      await prisma.ingredient.findUnique({
        where: { id },

        include: {
          allergens: {
            include: {
              allergen: true,
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
    return prisma.ingredient.create({
      data: {
        name: data.name,
        createdById: userId,
      },
    });
  }

  async update(
    id: string,
    data: UpdateIngredientDto
  ) {
    await this.findById(id);

    return prisma.ingredient.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.findById(id);

    await prisma.ingredient.delete({
      where: { id },
    });
  }
}