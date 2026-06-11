import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { UserDietPreferencesController } from "./user-diet-preferences.controller";

const router = Router();

const controller =
  new UserDietPreferencesController();

router.use(authMiddleware);

router.get(
  "/",
  controller.findAll
);

router.post(
  "/:dietPreferenceId",
  controller.add
);

router.delete(
  "/:dietPreferenceId",
  controller.remove
);

export default router;