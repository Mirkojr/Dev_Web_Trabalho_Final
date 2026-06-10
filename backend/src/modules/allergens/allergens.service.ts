import { prisma } from "../../lib/prisma";

import { HttpError } from "../../utils/http-error";

import {
  CreateAllergenDto,
  UpdateAllergenDto,
} from "./allergens.schemas";

export class AllergensService {
  async findAll() {
    return prisma.allergen.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(id: string) {
    const allergen = await prisma.allergen.findUnique({
      where: { id },
    });

    if (!allergen) {
      throw new HttpError(
        404,
        "Allergen not found"
      );
    }

    return allergen;
  }

  async create(data: CreateAllergenDto) {
    return prisma.allergen.create({
      data,
    });
  }

  async update(
    id: string,
    data: UpdateAllergenDto
  ) {
    await this.findById(id);

    return prisma.allergen.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.findById(id);

    await prisma.allergen.delete({
      where: { id },
    });

    return;
  }
}