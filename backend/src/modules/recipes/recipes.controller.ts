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
}