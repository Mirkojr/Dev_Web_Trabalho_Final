import { z } from "zod";

export const commentIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const createCommentSchema = z.object({
  recipeId: z.string().uuid(),
  content: z.string().min(1).max(500),
});

export const updateCommentSchema = z.object({
  content: z.string().min(1).max(500),
});

export type CreateCommentDto = z.infer<typeof createCommentSchema>;
export type UpdateCommentDto = z.infer<typeof updateCommentSchema>;