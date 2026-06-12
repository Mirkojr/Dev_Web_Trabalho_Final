import { RoleName } from "../../generated/prisma";

import { prisma } from "../../lib/prisma";

import { HttpError } from "../../utils/http-error";

import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from "./categories.schemas";

export class CategoriesService {
  async findAll() {
    return prisma.category.findMany({
      where: {
        status: "APPROVED",
      },
      include: {
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
    const category =
      await prisma.category.findUnique({
        where: {
          id,
        },
        include: {
          createdBy: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });

    if (!category) {
      throw new HttpError(
        404,
        "Category not found"
      );
    }

    return category;
  }

  async create(
    userId: string,
    data: CreateCategoryDto
  ) {
    const existing =
      await prisma.category.findUnique({
        where: {
          name: data.name,
        },
      });

    if (existing) {
      throw new HttpError(
        409,
        "Category already exists"
      );
    }

    return prisma.category.create({
      data: {
        name: data.name,
        createdById: userId,
        status: "PENDING",
      },
    });
  }

  async update(
    id: string,
    userId: string,
    role: RoleName,
    data: UpdateCategoryDto
  ) {
    const category =
      await prisma.category.findUnique({
        where: {
          id,
        },
      });

    if (!category) {
      throw new HttpError(
        404,
        "Category not found"
      );
    }

    const isOwner =
      category.createdById === userId;

    const isAdmin =
      role === "ADMIN";

    if (!isOwner && !isAdmin) {
      throw new HttpError(
        403,
        "Not allowed"
      );
    }

    return prisma.category.update({
      where: {
        id,
      },
      data: {
        name: data.name,
      },
    });
  }

  async delete(
    id: string,
    userId: string,
    role: RoleName
  ) {
    const category =
      await prisma.category.findUnique({
        where: {
          id,
        },
      });

    if (!category) {
      throw new HttpError(
        404,
        "Category not found"
      );
    }

    const isOwner =
      category.createdById === userId;

    const isAdmin =
      role === "ADMIN";

    if (!isOwner && !isAdmin) {
      throw new HttpError(
        403,
        "Not allowed"
      );
    }

    await prisma.category.delete({
      where: {
        id,
      },
    });
  }
}