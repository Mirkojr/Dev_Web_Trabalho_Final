import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  IngredientsService,
} from "./ingredients.service";

import {
  createIngredientSchema,
} from "./ingredients.schemas";

import {
  getAuthUser,
} from "../../utils/get-auth-user";

export class IngredientsController {
  private service =
    new IngredientsService();

  findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const ingredients =
        await this.service.findAll();

      return res.json(
        ingredients
      );
    } catch (error) {
      next(error);
    }
  };

  findById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const ingredient =
        await this.service.findById(
          String(req.params.id)
        );

      return res.json(
        ingredient
      );
    } catch (error) {
      next(error);
    }
  };

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user =
        getAuthUser(req);

      const data =
        createIngredientSchema.parse(
          req.body
        );

      const ingredient =
        await this.service.create(
          user.id,
          data
        );

      return res
        .status(201)
        .json(ingredient);
    } catch (error) {
      next(error);
    }
  };
}