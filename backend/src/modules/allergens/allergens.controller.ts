import {
  Request,
  Response,
  NextFunction,
} from "express";

import { AllergensService } from "./allergens.service";

import {
  allergenIdParamSchema,
  createAllergenSchema,
  updateAllergenSchema,
} from "./allergens.schemas";

export class AllergensController {
  private service = new AllergensService();

  findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const allergens = await this.service.findAll();

      return res.json(allergens);
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
      const { id } = allergenIdParamSchema.parse(
        req.params
      );

      const allergen =
        await this.service.findById(id);

      return res.json(allergen);
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
        createAllergenSchema.parse(req.body);

      const allergen =
        await this.service.create(data);

      return res
        .status(201)
        .json(allergen);
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
      const { id } = allergenIdParamSchema.parse(
        req.params
      );

      const data =
        updateAllergenSchema.parse(req.body);

      const allergen =
        await this.service.update(
          id,
          data
        );

      return res.json(allergen);
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
      const { id } = allergenIdParamSchema.parse(
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