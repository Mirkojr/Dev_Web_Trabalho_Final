import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { UserAllergensController } from "./user-allergens.controller";

const router = Router();

const controller =
  new UserAllergensController();

router.use(authMiddleware);

router.get(
  "/",
  controller.findAll
);

router.post(
  "/:allergenId",
  controller.add
);

router.delete(
  "/:allergenId",
  controller.remove
);

export default router;