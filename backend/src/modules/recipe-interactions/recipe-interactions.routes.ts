import { Router } from "express";
import { RecipeInteractionsController } from "./recipe-interactions.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new RecipeInteractionsController();

router.use(authMiddleware);

/**
 * @openapi
 * /interactions/swipe:
 *   post:
 *     tags:
 *       - Recipe Interactions
 *     summary: Registrar swipe em uma receita
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipeId
 *               - type
 *             properties:
 *               recipeId:
 *                 type: string
 *                 format: uuid
 *               type:
 *                 type: string
 *                 enum:
 *                   - SMASH
 *                   - PASS
 *     responses:
 *       200:
 *         description: Interação registrada
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Receita não encontrada
 */
router.post("/swipe", controller.swipe);

/**
 * @openapi
 * /interactions/feed:
 *   get:
 *     tags:
 *       - Recipe Interactions
 *     summary: Obter feed de receitas para o usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de receitas disponíveis no feed
 */
router.get("/feed", controller.feed);

/**
 * @openapi
 * /interactions/undo:
 *   post:
 *     tags:
 *       - Recipe Interactions
 *     summary: Desfazer a última interação do usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Interação desfeita
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 undone:
 *                   type: boolean
 *             example:
 *               undone: true
 *       404:
 *         description: Nenhuma interação encontrada
 */
router.post("/undo", controller.undo);

export default router;