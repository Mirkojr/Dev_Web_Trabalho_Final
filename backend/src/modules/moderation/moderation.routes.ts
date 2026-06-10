import { Router }
  from "express";

import {
  ModerationController,
} from "./moderation.controller";

import {
  authMiddleware,
} from "../../middlewares/auth.middleware";

import {
  roleMiddleware,
} from "../../middlewares/role.middleware";

const router = Router();

const controller =
  new ModerationController();

router.patch(
  "/recipes/:id/approve",
  authMiddleware,
  roleMiddleware("ADMIN"),
  controller.approveRecipe
);

router.patch(
  "/recipes/:id/reject",
  authMiddleware,
  roleMiddleware("ADMIN"),
  controller.rejectRecipe
);

export default router;