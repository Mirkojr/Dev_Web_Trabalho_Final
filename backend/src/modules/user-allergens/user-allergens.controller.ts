import {
  Request,
  Response,
  NextFunction,
} from "express";

import { UserAllergensService } from "./user-allergens.service";

import {
  allergenIdParamSchema,
} from "./user-allergens.schemas";

export class UserAllergensController {
  private service =
    new UserAllergensService();

  findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const allergens =
        await this.service.findAll(
          req.user!.id
        );

      return res.json(allergens);
    } catch (error) {
      next(error);
    }
  };

  add = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { allergenId } =
        allergenIdParamSchema.parse(
          req.params
        );

      const result =
        await this.service.add(
          req.user!.id,
          allergenId
        );

      return res
        .status(201)
        .json(result);
    } catch (error) {
      next(error);
    }
  };

  remove = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { allergenId } =
        allergenIdParamSchema.parse(
          req.params
        );

      await this.service.remove(
        req.user!.id,
        allergenId
      );

      return res
        .status(204)
        .send();
    } catch (error) {
      next(error);
    }
  };
}