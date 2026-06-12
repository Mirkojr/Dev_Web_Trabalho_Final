import { Router } from "express";
import { CommentsController } from "./comments.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new CommentsController();

/**
 * @openapi
 * /comments/recipe/{recipeId}:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Listar comentários de uma receita
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de comentários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   content:
 *                     type: string
 *                   recipeId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       username:
 *                         type: string
 *                       avatarUrl:
 *                         type: string
 *                         nullable: true
 */
router.get("/recipe/:recipeId", controller.findByRecipe);

router.use(authMiddleware);

/**
 * @openapi
 * /comments:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Criar comentário
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
 *               - content
 *             properties:
 *               recipeId:
 *                 type: string
 *                 format: uuid
 *               content:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 500
 *                 example: Ficou excelente.
 *     responses:
 *       201:
 *         description: Comentário criado
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Receita não encontrada
 */
router.post("/", controller.create);

/**
 * @openapi
 * /comments/{id}:
 *   put:
 *     tags:
 *       - Comments
 *     summary: Atualizar comentário
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
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 500
 *                 example: Atualizando o comentário.
 *     responses:
 *       200:
 *         description: Comentário atualizado
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Comentário não encontrado
 */
router.patch("/:id", controller.update);

/**
 * @openapi
 * /comments/{id}:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Remover comentário
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
 *         description: Comentário removido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted:
 *                   type: boolean
 *             example:
 *               deleted: true
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Comentário não encontrado
 */
router.delete("/:id", controller.delete);

export default router;