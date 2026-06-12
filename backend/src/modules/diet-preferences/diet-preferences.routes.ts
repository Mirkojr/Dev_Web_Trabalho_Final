import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";

import { DietPreferencesController } from "./diet-preferences.controller";

const router = Router();

const controller =
  new DietPreferencesController();

/**
 * @openapi
 * /diet-preferences:
 *   get:
 *     tags:
 *       - Diet Preferences
 *     summary: Listar todas as preferências alimentares
 *     responses:
 *       200:
 *         description: Lista de preferências alimentares
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *             example:
 *               - id: 8d8e9f2b-7b54-4e0b-9b2e-5a7fd0a1d123
 *                 name: Vegetariana
 *               - id: 9a2f4c1d-63f0-4d1a-8d66-4a8f7e2b4567
 *                 name: Vegana
 */
router.get("/", controller.findAll);

/**
 * @openapi
 * /diet-preferences/{id}:
 *   get:
 *     tags:
 *       - Diet Preferences
 *     summary: Buscar preferência alimentar por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Preferência alimentar encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *             example:
 *               id: 8d8e9f2b-7b54-4e0b-9b2e-5a7fd0a1d123
 *               name: Vegana
 *       404:
 *         description: Preferência alimentar não encontrada
 */
router.get("/:id", controller.findById);

/**
 * @openapi
 * /diet-preferences:
 *   post:
 *     tags:
 *       - Diet Preferences
 *     summary: Criar preferência alimentar
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: Vegetariana
 *     responses:
 *       201:
 *         description: Preferência alimentar criada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *             example:
 *               id: 8d8e9f2b-7b54-4e0b-9b2e-5a7fd0a1d123
 *               name: Vegetariana
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado
 */
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  controller.create
);

/**
 * @openapi
 * /diet-preferences/{id}:
 *   patch:
 *     tags:
 *       - Diet Preferences
 *     summary: Atualizar preferência alimentar
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: Vegetariana estrita
 *     responses:
 *       200:
 *         description: Preferência alimentar atualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *             example:
 *               id: 8d8e9f2b-7b54-4e0b-9b2e-5a7fd0a1d123
 *               name: Vegetariana estrita
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Preferência alimentar não encontrada
 */
router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.update
);

/**
 * @openapi
 * /diet-preferences/{id}:
 *   delete:
 *     tags:
 *       - Diet Preferences
 *     summary: Remover preferência alimentar
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Preferência alimentar removida com sucesso
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Preferência alimentar não encontrada
 */
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.delete
);

export default router;