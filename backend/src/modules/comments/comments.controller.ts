import { Request, Response, NextFunction } from "express";
import { CommentsService } from "./comments.service";
import {
  createCommentSchema,
  updateCommentSchema,
  commentIdParamSchema,
} from "./comments.schemas";

export class CommentsController {
  private service = new CommentsService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createCommentSchema.parse(req.body);

      const comment = await this.service.create(
        req.user!.id,
        data
      );

      return res.status(201).json(comment);
    } catch (err) {
      next(err);
    }
  };

  findByRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { recipeId } = req.params;

      const comments = await this.service.findByRecipe(String(recipeId));

      return res.json(comments);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = commentIdParamSchema.parse(req.params);
      const data = updateCommentSchema.parse(req.body);

      const isAdmin = req.user!.role === "ADMIN";

      const comment = await this.service.update(
        id,
        req.user!.id,
        isAdmin,
        data
      );

      return res.json(comment);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = commentIdParamSchema.parse(req.params);

      const isAdmin = req.user!.role === "ADMIN";

      const result = await this.service.delete(
        id,
        req.user!.id,
        isAdmin
      );

      return res.json(result);
    } catch (err) {
      next(err);
    }
  };
}