import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { IngredientsController } from "./ingredients.controller";

const router = Router();

const controller =
  new IngredientsController();

router.get(
  "/",
  controller.findAll
);

router.get(
  "/:id",
  controller.findById
);

router.post(
  "/",
  authMiddleware,
  controller.create
);

router.patch(
  "/:id",
  authMiddleware,
  controller.update
);

router.delete(
  "/:id",
  authMiddleware,
  controller.delete
);

export default router;