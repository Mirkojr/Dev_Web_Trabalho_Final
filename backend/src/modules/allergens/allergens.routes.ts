import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";

import { AllergensController } from "./allergens.controller";

const router = Router();

const controller = new AllergensController();

/**
 * @openapi
 * /allergens:
 *   get:
 *     tags:
 *       - Allergens
 *     summary: Listar todos os alergênicos
 *     responses:
 *       200:
 *         description: Lista de alergênicos
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
 *                 name: Amendoim
 *               - id: 9a2f4c1d-63f0-4d1a-8d66-4a8f7e2b4567
 *                 name: Leite
 */
router.get("/", controller.findAll);

/**
 * @openapi
 * /allergens/{id}:
 *   get:
 *     tags:
 *       - Allergens
 *     summary: Buscar alergênico por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Alergênico encontrado
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
 *               name: Amendoim
 *       404:
 *         description: Alergênico não encontrado
 */
router.get("/:id", controller.findById);

/**
 * @openapi
 * /allergens:
 *   post:
 *     tags:
 *       - Allergens
 *     summary: Criar alergênico
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
 *                 example: Amendoim
 *     responses:
 *       201:
 *         description: Alergênico criado
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
 *               name: Amendoim
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado
 */
router.post("/", authMiddleware, adminMiddleware, controller.create);

/**
 * @openapi
 * /allergens/{id}:
 *   patch:
 *     tags:
 *       - Allergens
 *     summary: Atualizar alergênico
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
 *                 example: Amendoim torrado
 *     responses:
 *       200:
 *         description: Alergênico atualizado
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
 *               name: Amendoim torrado
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Alergênico não encontrado
 */
router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.update
);

/**
 * @openapi
 * /allergens/{id}:
 *   delete:
 *     tags:
 *       - Allergens
 *     summary: Remover alergênico
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
 *         description: Alergênico removido com sucesso
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Alergênico não encontrado
 */
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.delete
);

export default router;