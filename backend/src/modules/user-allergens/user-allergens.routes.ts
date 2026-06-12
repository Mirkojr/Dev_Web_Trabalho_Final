import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { UserAllergensController } from "./user-allergens.controller";

const router = Router();

const controller =
  new UserAllergensController();

router.use(authMiddleware);

/**
 * @openapi
 * /users/me/allergens:
 *   get:
 *     tags:
 *       - Users
 *     summary: Listar alergênicos do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alergênicos do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                   allergenId:
 *                     type: string
 *                   allergen:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 */
router.get(
  "/",
  controller.findAll
);

/**
 * @openapi
 * /users/me/allergens/{allergenId}:
 *   post:
 *     tags:
 *       - Users
 *     summary: Adicionar alergênico ao usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: allergenId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: Vínculo criado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 allergenId:
 *                   type: string
 *             example:
 *               userId: cm1q2w3e4r5t6y7u8i9o0p
 *               allergenId: 8d8e9f2b-7b54-4e0b-9b2e-5a7fd0a1d123
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Alergênico não encontrado
 */
router.post(
  "/:allergenId",
  controller.add
);

/**
 * @openapi
 * /users/me/allergens/{allergenId}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Remover alergênico do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: allergenId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Vínculo removido com sucesso
 *       401:
 *         description: Token ausente ou inválido
 */
router.delete(
  "/:allergenId",
  controller.remove
);

export default router;