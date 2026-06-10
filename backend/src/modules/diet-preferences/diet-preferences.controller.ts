import {
  Request,
  Response,
  NextFunction,
} from "express";

import { DietPreferencesService } from "./diet-preferences.service";

import {
  dietPreferenceIdParamSchema,
  createDietPreferenceSchema,
  updateDietPreferenceSchema,
} from "./diet-preferences.schemas";

export class DietPreferencesController {
  private service = new DietPreferencesService();

  findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dietPreferences = await this.service.findAll();

      return res.json(dietPreferences);
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
      const { id } = dietPreferenceIdParamSchema.parse(
        req.params
      );

      const dietPreference =
        await this.service.findById(id);

      return res.json(dietPreference);
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
        createDietPreferenceSchema.parse(req.body);

      const dietPreference =
        await this.service.create(data);

      return res
        .status(201)
        .json(dietPreference);
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
      const { id } = dietPreferenceIdParamSchema.parse(
        req.params
      );

      const data =
        updateDietPreferenceSchema.parse(req.body);

      const dietPreference =
        await this.service.update(
          id,
          data
        );

      return res.json(dietPreference);
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
      const { id } = dietPreferenceIdParamSchema.parse(
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