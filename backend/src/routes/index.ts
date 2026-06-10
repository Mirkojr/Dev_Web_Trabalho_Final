import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import usersRoutes from "../modules/users/users.routes";
import allergensRoutes from "../modules/allergens/allergens.routes";
import dietPreferencesRoutes from "../modules/diet-preferences/diet-preferences.routes";
import ingredientsRoutes from "../modules/ingredients/ingredients.routes";
import recipesRoutes from "../modules/recipes/recipes.routes";


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

export default router;