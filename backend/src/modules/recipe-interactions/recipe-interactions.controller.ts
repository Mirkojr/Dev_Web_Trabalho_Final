import { Request, Response, NextFunction } from "express";
import { RecipeInteractionsService } from "./recipe-interactions.service";
import { createInteractionSchema } from "./recipe-interactions.schemas";

export class RecipeInteractionsController {
  private service = new RecipeInteractionsService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createInteractionSchema.parse(req.body);

      const result = await this.service.create(
        req.user!.id,
        data
      );

      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  undo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.undoLast(req.user!.id);
      return res.json(result);
    } catch (err) {
      next(err);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getUserInteractions(req.user!.id);
      return res.json(result);
    } catch (err) {
      next(err);
    }
  };
}