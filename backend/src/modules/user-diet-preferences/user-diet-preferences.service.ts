import { prisma } from "../../lib/prisma";

import { HttpError } from "../../utils/http-error";

export class UserDietPreferencesService {
  async findAll(userId: string) {
    return prisma.userDietPreference.findMany({
      where: {
        userId,
      },

      include: {
        dietPreference: true,
      },
    });
  }

  async add(
    userId: string,
    dietPreferenceId: string
  ) {
    const dietPreference =
      await prisma.dietPreference.findUnique({
        where: {
          id: dietPreferenceId,
        },
      });

    if (!dietPreference) {
      throw new HttpError(
        404,
        "Diet preference not found"
      );
    }

    return prisma.userDietPreference.upsert({
      where: {
        userId_dietPreferenceId: {
          userId,
          dietPreferenceId,
        },
      },

      create: {
        userId,
        dietPreferenceId,
      },

      update: {},
    });
  }

  async remove(
    userId: string,
    dietPreferenceId: string
  ) {
    await prisma.userDietPreference.delete({
      where: {
        userId_dietPreferenceId: {
          userId,
          dietPreferenceId,
        },
      },
    });
  }
}