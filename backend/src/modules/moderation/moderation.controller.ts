import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  ModerationService,
} from "./moderation.service";

export class ModerationController {
  private service =
    new ModerationService();

  approveRecipe = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const recipe =
        await this.service
          .approveRecipe(
            String(req.params.id)
          );

      return res.json(recipe);
    } catch (error) {
      next(error);
    }
  };

  rejectRecipe = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const recipe =
        await this.service
          .rejectRecipe(
            String(req.params.id)
          );

      return res.json(recipe);
    } catch (error) {
      next(error);
    }
  };
}