import { Router } from "express";
import { CommentsController } from "./comments.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new CommentsController();

router.get("/recipe/:recipeId", controller.findByRecipe);

router.use(authMiddleware);

router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;