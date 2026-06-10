import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import usersRoutes from "../modules/users/users.routes";
import allergensRoutes
from "../modules/allergens/allergens.routes";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/allergens", allergensRoutes);

export default router;