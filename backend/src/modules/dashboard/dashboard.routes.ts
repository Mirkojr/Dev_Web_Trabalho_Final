import { Router } from "express";

import { DashboardController }
  from "./dashboard.controller";

import { authMiddleware }
  from "../../middlewares/auth.middleware";

import { adminMiddleware }
  from "../../middlewares/admin.middleware";

const router = Router();

const controller =
  new DashboardController();

/**
 * @openapi
 * /dashboard:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Obter métricas gerais do painel
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Métricas consolidadas do sistema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: integer
 *                 recipes:
 *                   type: integer
 *                 approvedRecipes:
 *                   type: integer
 *                 pendingRecipes:
 *                   type: integer
 *                 rejectedRecipes:
 *                   type: integer
 *                 categories:
 *                   type: integer
 *                 pendingCategories:
 *                   type: integer
 *                 ingredients:
 *                   type: integer
 *                 pendingIngredients:
 *                   type: integer
 *                 comments:
 *                   type: integer
 *                 smashes:
 *                   type: integer
 *                 passes:
 *                   type: integer
 *             example:
 *               users: 120
 *               recipes: 58
 *               approvedRecipes: 44
 *               pendingRecipes: 10
 *               rejectedRecipes: 4
 *               categories: 18
 *               pendingCategories: 3
 *               ingredients: 72
 *               pendingIngredients: 6
 *               comments: 240
 *               smashes: 840
 *               passes: 412
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado
 */
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  controller.getMetrics
);

export default router;