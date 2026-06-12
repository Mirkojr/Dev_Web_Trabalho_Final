import {
  Request,
  Response,
  NextFunction,
} from "express";

import { CategoriesService } from "./categories.service";

import {
  createCategorySchema,
  updateCategorySchema,
} from "./categories.schemas";
import { getAuthUser } from "../../utils/get-auth-user";
import { getParamId } from "../../utils/get-param-id";

export class CategoriesController {
  private service =
    new CategoriesService();

  findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categories =
        await this.service.findAll();

      return res.json(categories);
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
      const category =
        await this.service.findById(
          getParamId(req)
        );

      return res.json(category);
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
        createCategorySchema.parse(
          req.body
        );

      const user = getAuthUser(req);

      const category =
        await this.service.create(
          user.id,
          data
        );

      return res
        .status(201)
        .json(category);
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
      const data =
        updateCategorySchema.parse(
          req.body
        );

      const user = getAuthUser(req);
      
      const category =
        await this.service.update(
          getParamId(req),
          user.id,
          user.role,
          data
        );

      return res.json(category);
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
      const user = getAuthUser(req);

      await this.service.delete(
        getParamId(req),
        user.id,
        user.role
      );

      return res
        .status(204)
        .send();
    } catch (error) {
      next(error);
    }
  };
}