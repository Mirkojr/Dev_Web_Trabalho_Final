import {
  Request,
  Response,
  NextFunction,
} from "express";

import { IngredientsService } from "./ingredients.service";

import {
  ingredientIdParamSchema,
  createIngredientSchema,
  updateIngredientSchema,
} from "./ingredients.schemas";

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

      return res.json(ingredients);
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
      const { id } =
        ingredientIdParamSchema.parse(
          req.params
        );

      const ingredient =
        await this.service.findById(id);

      return res.json(ingredient);
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
      const data =
        createIngredientSchema.parse(
          req.body
        );

      const ingredient =
        await this.service.create(
          req.user!.id,
          data
        );

      return res
        .status(201)
        .json(ingredient);
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } =
        ingredientIdParamSchema.parse(
          req.params
        );

      const data =
        updateIngredientSchema.parse(
          req.body
        );

      const ingredient =
        await this.service.update(
          id,
          data
        );

      return res.json(ingredient);
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } =
        ingredientIdParamSchema.parse(
          req.params
        );

      await this.service.delete(id);

      return res
        .status(204)
        .send();
    } catch (error) {
      next(error);
    }
  };
}