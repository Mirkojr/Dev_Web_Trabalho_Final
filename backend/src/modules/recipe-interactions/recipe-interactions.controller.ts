import { Request, Response, NextFunction } from "express";
import { RecipeInteractionsService } from "./recipe-interactions.service";
import { swipeSchema } from "./recipe-interactions.schemas";
import { getAuthUser } from "../../utils/get-auth-user";

export class RecipeInteractionsController {
  private service = new RecipeInteractionsService();

  swipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = getAuthUser(req);

      const { recipeId, type } = swipeSchema.parse(req.body);

      const result = await this.service.swipe(user.id, recipeId, type);

      return res.json(result);
    } catch (err) {
      next(err);
    }
  };

  feed = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = getAuthUser(req);

      const limit = Number(req.query.limit ?? 10);

      const feed = await this.service.feed(user.id, limit);

      return res.json(feed);
    } catch (err) {
      next(err);
    }
  };

  undo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = getAuthUser(req);

      const result = await this.service.undo(user.id);

      return res.json(result);
    } catch (err) {
      next(err);
    }
  };
}