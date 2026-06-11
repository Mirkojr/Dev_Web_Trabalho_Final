import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import usersRoutes from "../modules/users/users.routes";
import allergensRoutes from "../modules/allergens/allergens.routes";
import dietPreferencesRoutes from "../modules/diet-preferences/diet-preferences.routes";
import ingredientsRoutes from "../modules/ingredients/ingredients.routes";
import recipesRoutes from "../modules/recipes/recipes.routes";
import moderationRoutes from "../modules/moderation/moderation.routes";
import userAllergensRoutes from "../modules/user-allergens/user-allergens.routes";
import userDietPreferencesRoutes from "../modules/user-diet-preferences/user-diet-preferences.routes";
import interactionsRoutes from "../modules/recipe-interactions/recipe-interactions.routes";
import categoriesRoutes from "../modules/categories/categories.routes";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/allergens", allergensRoutes);
router.use("/diet-preferences", dietPreferencesRoutes);
router.use("/ingredients", ingredientsRoutes);
router.use("/recipes", recipesRoutes);
router.use("/moderation", moderationRoutes);
router.use("/users/me/allergens", userAllergensRoutes);
router.use("/users/me/diet-preferences", userDietPreferencesRoutes);
router.use("/categories", categoriesRoutes);
router.use("/interactions", interactionsRoutes);

export default router;