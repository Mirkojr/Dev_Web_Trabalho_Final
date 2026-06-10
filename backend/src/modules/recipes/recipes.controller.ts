import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  RecipesService,
} from "./recipes.service";

import {
  createRecipeSchema,
  recipeIdParamSchema,
} from "./recipes.schemas";

import {
  getAuthUser,
} from "../../utils/get-auth-user";

export class RecipesController {
  private service =
    new RecipesService();

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user =
        getAuthUser(req);

      const data =
        createRecipeSchema.parse(
          req.body
        );

      const recipe =
        await this.service.create(
          user.id,
          data
        );

      return res
        .status(201)
        .json(recipe);
    } catch (error) {
      next(error);
    }
  };

  findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try {
        const recipes =
        await this.service.findAll();

        return res.json(recipes);
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
        recipeIdParamSchema.parse(
            req.params
        );

        const recipe =
        await this.service.findById(
            id
        );

        return res.json(recipe);
    } catch (error) {
        next(error);
    }
    };
}