import { Router } from "express";
import { RecipeInteractionsController } from "./recipe-interactions.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new RecipeInteractionsController();

router.use(authMiddleware);

router.post("/swipe", controller.swipe);
router.get("/feed", controller.feed);
router.post("/undo", controller.undo);

export default router;