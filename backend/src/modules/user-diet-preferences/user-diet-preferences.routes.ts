import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { UserDietPreferencesController } from "./user-diet-preferences.controller";

const router = Router();

const controller =
  new UserDietPreferencesController();

router.use(authMiddleware);

/**
 * @openapi
 * /users/me/diet-preferences:
 *   get:
 *     tags:
 *       - Users
 *     summary: Listar preferências alimentares do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de preferências do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                   dietPreferenceId:
 *                     type: string
 *                   dietPreference:
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
 * /users/me/diet-preferences/{dietPreferenceId}:
 *   post:
 *     tags:
 *       - Users
 *     summary: Adicionar preferência alimentar ao usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dietPreferenceId
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
 *                 dietPreferenceId:
 *                   type: string
 *             example:
 *               userId: cm1q2w3e4r5t6y7u8i9o0p
 *               dietPreferenceId: 8d8e9f2b-7b54-4e0b-9b2e-5a7fd0a1d123
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Preferência alimentar não encontrada
 */
router.post(
  "/:dietPreferenceId",
  controller.add
);

/**
 * @openapi
 * /users/me/diet-preferences/{dietPreferenceId}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Remover preferência alimentar do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dietPreferenceId
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
  "/:dietPreferenceId",
  controller.remove
);

export default router;