import { Router }
  from "express";

import {
  RecipesController,
} from "./recipes.controller";

import {
  authMiddleware,
} from "../../middlewares/auth.middleware";

const router = Router();

const controller =
  new RecipesController();

router.post(
  "/",
  authMiddleware,
  controller.create
);

export default router;