import {
  Request,
  Response,
  NextFunction,
} from "express";

import { UserDietPreferencesService } from "./user-diet-preferences.service";

import {
  dietPreferenceIdParamSchema,
} from "./user-diet-preferences.schemas";

export class UserDietPreferencesController {
  private service =
    new UserDietPreferencesService();

  findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result =
        await this.service.findAll(
          req.user!.id
        );

      return res.json(result);
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
      const { dietPreferenceId } =
        dietPreferenceIdParamSchema.parse(
          req.params
        );

      const result =
        await this.service.add(
          req.user!.id,
          dietPreferenceId
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
      const { dietPreferenceId } =
        dietPreferenceIdParamSchema.parse(
          req.params
        );

      await this.service.remove(
        req.user!.id,
        dietPreferenceId
      );

      return res
        .status(204)
        .send();
    } catch (error) {
      next(error);
    }
  };
}