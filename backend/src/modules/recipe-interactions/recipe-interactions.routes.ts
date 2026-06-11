import { Router } from "express";
import { RecipeInteractionsController } from "./recipe-interactions.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new RecipeInteractionsController();

router.use(authMiddleware);

router.post("/", controller.create);
router.delete("/undo", controller.undo);
router.get("/", controller.findAll);

export default router;