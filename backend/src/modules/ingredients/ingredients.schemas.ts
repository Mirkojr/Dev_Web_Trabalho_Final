import { z } from "zod";

export const ingredientIdParamSchema = z.object({
  id: z.uuid(),
});

export const createIngredientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(100),
});

export const updateIngredientSchema = createIngredientSchema.partial();

export type CreateIngredientDto =
  z.infer<typeof createIngredientSchema>;

export type UpdateIngredientDto =
  z.infer<typeof updateIngredientSchema>;