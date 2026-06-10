import { Router }
  from "express";

import {
  IngredientsController,
} from "./ingredients.controller";

import {
  authMiddleware,
} from "../../middlewares/auth.middleware";

const router = Router();

const controller =
  new IngredientsController();

/**
 * @openapi
 * /ingredients:
 *   get:
 *     tags:
 *       - Ingredients
 *     summary: Listar todos os ingredientes aprovados
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
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   createdBy:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       username:
 *                         type: string
 *                   allergens:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         allergenId:
 *                           type: string
 *                         allergen:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             name:
 *                               type: string
 *             example:
 *               - id: 8d8e9f2b-7b54-4e0b-9b2e-5a7fd0a1d123
 *                 name: Tomate
 *                 status: APPROVED
 *                 createdById: cm1q2w3e4r5t6y7u8i9o0p
 *                 createdAt: 2026-06-10T04:22:33.000Z
 *                 createdBy:
 *                   id: cm1q2w3e4r5t6y7u8i9o0p
 *                   username: artur_silva
 *                 allergens:
 *                   - allergenId: 9a2f4c1d-63f0-4d1a-8d66-4a8f7e2b4567
 *                     allergen:
 *                       id: 9a2f4c1d-63f0-4d1a-8d66-4a8f7e2b4567
 *                       name: Leite
 */
router.get(
  "/",
  controller.findAll
);

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
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 createdBy:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                 allergens:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
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
 *               id: 8d8e9f2b-7b54-4e0b-9b2e-5a7fd0a1d123
 *               name: Tomate
 *               status: APPROVED
 *               createdById: cm1q2w3e4r5t6y7u8i9o0p
 *               createdAt: 2026-06-10T04:22:33.000Z
 *               createdBy:
 *                 id: cm1q2w3e4r5t6y7u8i9o0p
 *                 username: artur_silva
 *               allergens:
 *                 - allergenId: 9a2f4c1d-63f0-4d1a-8d66-4a8f7e2b4567
 *                   allergen:
 *                     id: 9a2f4c1d-63f0-4d1a-8d66-4a8f7e2b4567
 *                     name: Leite
 *       404:
 *         description: Ingrediente não encontrado
 */
router.get(
  "/:id",
  controller.findById
);

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
 *               allergenIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 example:
 *                   - 9a2f4c1d-63f0-4d1a-8d66-4a8f7e2b4567
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
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 createdBy:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                 allergens:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
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
 *               id: 8d8e9f2b-7b54-4e0b-9b2e-5a7fd0a1d123
 *               name: Tomate
 *               status: PENDING
 *               createdById: cm1q2w3e4r5t6y7u8i9o0p
 *               createdAt: 2026-06-10T04:22:33.000Z
 *               createdBy:
 *                 id: cm1q2w3e4r5t6y7u8i9o0p
 *                 username: artur_silva
 *               allergens:
 *                 - allergenId: 9a2f4c1d-63f0-4d1a-8d66-4a8f7e2b4567
 *                   allergen:
 *                     id: 9a2f4c1d-63f0-4d1a-8d66-4a8f7e2b4567
 *                     name: Leite
 *       400:
 *         description: IDs de alergênicos inválidos
 *       401:
 *         description: Token ausente ou inválido
 *       409:
 *         description: Ingrediente já existe
 */
router.post(
  "/",
  authMiddleware,
  controller.create
);

export default router;