import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { IngredientsController } from "./ingredients.controller";

const router = Router();

const controller = new IngredientsController();

/**
 * @openapi
 * /ingredients:
 *   get:
 *     tags:
 *       - Ingredients
 *     summary: Listar todos os ingredientes
 *     responses:
 *       200:
 *         description: Lista de ingredientes
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
 *                   status:
 *                     type: string
 *                   createdById:
 *                     type: string
 *                     nullable: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *             example:
 *               - id: 5b54-4e0b-9b2e-5a7fd0a1d126
 *                 name: Tomate
 *                 status: APPROVED
 *                 createdById: cm1q2w3e4r5t6y7u8i9o0p
 *                 createdAt: 2026-06-10T04:22:33.000Z
 *                 updatedAt: 2026-06-10T04:22:33.000Z
 *               - id: 6b54-4e0b-9b2e-5a7fd0a1d127
 *                 name: Alho
 *                 status: PENDING
 *                 createdById: cm1q2w3e4r5t6y7u8i9o0p
 *                 createdAt: 2026-06-10T04:22:33.000Z
 *                 updatedAt: 2026-06-10T04:22:33.000Z
 */
router.get("/", controller.findAll);

/**
 * @openapi
 * /ingredients/{id}:
 *   get:
 *     tags:
 *       - Ingredients
 *     summary: Buscar ingrediente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Ingrediente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 status:
 *                   type: string
 *                 createdById:
 *                   type: string
 *                   nullable: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 allergens:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ingredientId:
 *                         type: string
 *                       allergenId:
 *                         type: string
 *                       allergen:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *             example:
 *               id: 5b54-4e0b-9b2e-5a7fd0a1d126
 *               name: Tomate
 *               status: APPROVED
 *               createdById: cm1q2w3e4r5t6y7u8i9o0p
 *               createdAt: 2026-06-10T04:22:33.000Z
 *               updatedAt: 2026-06-10T04:22:33.000Z
 *               allergens:
 *                 - ingredientId: 5b54-4e0b-9b2e-5a7fd0a1d126
 *                   allergenId: 3b54-4e0b-9b2e-5a7fd0a1d128
 *                   allergen:
 *                     id: 3b54-4e0b-9b2e-5a7fd0a1d128
 *                     name: Glúten
 *       404:
 *         description: Ingrediente não encontrado
 */
router.get("/:id", controller.findById);

/**
 * @openapi
 * /ingredients:
 *   post:
 *     tags:
 *       - Ingredients
 *     summary: Criar ingrediente
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
 *                 example: Tomate
 *           example:
 *             name: Tomate
 *     responses:
 *       201:
 *         description: Ingrediente criado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 status:
 *                   type: string
 *                 createdById:
 *                   type: string
 *                   nullable: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *             example:
 *               id: 5b54-4e0b-9b2e-5a7fd0a1d126
 *               name: Tomate
 *               status: PENDING
 *               createdById: cm1q2w3e4r5t6y7u8i9o0p
 *               createdAt: 2026-06-10T04:22:33.000Z
 *               updatedAt: 2026-06-10T04:22:33.000Z
 *       400:
 *         description: Payload inválido
 *       401:
 *         description: Token ausente ou inválido
 */
router.post("/", authMiddleware, controller.create);

/**
 * @openapi
 * /ingredients/{id}:
 *   patch:
 *     tags:
 *       - Ingredients
 *     summary: Atualizar ingrediente
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
 *                 example: Tomate Italiano
 *           example:
 *             name: Tomate Italiano
 *     responses:
 *       200:
 *         description: Ingrediente atualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 status:
 *                   type: string
 *                 createdById:
 *                   type: string
 *                   nullable: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *             example:
 *               id: 5b54-4e0b-9b2e-5a7fd0a1d126
 *               name: Tomate Italiano
 *               status: APPROVED
 *               createdById: cm1q2w3e4r5t6y7u8i9o0p
 *               createdAt: 2026-06-10T04:22:33.000Z
 *               updatedAt: 2026-06-10T04:22:33.000Z
 *       400:
 *         description: Payload inválido
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Ingrediente não encontrado
 */
router.patch("/:id", authMiddleware, controller.update);

/**
 * @openapi
 * /ingredients/{id}:
 *   delete:
 *     tags:
 *       - Ingredients
 *     summary: Deletar ingrediente
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
 *         description: Ingrediente deletado com sucesso
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Ingrediente não encontrado
 */
router.delete("/:id", authMiddleware, controller.delete);

export default router;