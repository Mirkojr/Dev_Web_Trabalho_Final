import { prisma } from "../../lib/prisma";

import { HttpError } from "../../utils/http-error";

export class UserAllergensService {
  async findAll(userId: string) {
    return prisma.userAllergen.findMany({
      where: {
        userId,
      },

      include: {
        allergen: true,
      },
    });
  }

  async add(
    userId: string,
    allergenId: string
  ) {
    const allergen =
      await prisma.allergen.findUnique({
        where: {
          id: allergenId,
        },
      });

    if (!allergen) {
      throw new HttpError(
        404,
        "Allergen not found"
      );
    }

    return prisma.userAllergen.upsert({
      where: {
        userId_allergenId: {
          userId,
          allergenId,
        },
      },

      create: {
        userId,
        allergenId,
      },

      update: {},
    });
  }

  async remove(
    userId: string,
    allergenId: string
  ) {
    await prisma.userAllergen.delete({
      where: {
        userId_allergenId: {
          userId,
          allergenId,
        },
      },
    });
  }
}