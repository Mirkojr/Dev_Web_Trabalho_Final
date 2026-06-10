import { prisma } from "../../lib/prisma";

import { HttpError } from "../../utils/http-error";

import {
  CreateDietPreferenceDto,
  UpdateDietPreferenceDto,
} from "./diet-preferences.schemas";

export class DietPreferencesService {
  async findAll() {
    return prisma.dietPreference.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(id: string) {
    const dietPreference = await prisma.dietPreference.findUnique({
      where: { id },
    });

    if (!dietPreference) {
      throw new HttpError(
        404,
        "Diet preference not found"
      );
    }

    return dietPreference;
  }

  async create(data: CreateDietPreferenceDto) {
    return prisma.dietPreference.create({
      data,
    });
  }

  async update(
    id: string,
    data: UpdateDietPreferenceDto
  ) {
    await this.findById(id);

    return prisma.dietPreference.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.findById(id);

    await prisma.dietPreference.delete({
      where: { id },
    });

    return;
  }
}