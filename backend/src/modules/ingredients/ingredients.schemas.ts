import { z } from "zod";

export const createIngredientSchema =
  z.object({
    name: z.string()
      .min(2)
      .max(100),

    allergenIds: z
      .array(z.string().uuid())
      .default([]),
  });

export const updateIngredientSchema =
  z.object({
    name: z.string()
      .min(2)
      .max(100)
      .optional(),

    allergenIds: z
      .array(z.string().uuid())
      .optional(),
  });

export type CreateIngredientDto =
  z.infer<typeof createIngredientSchema>;

export type UpdateIngredientDto =
  z.infer<typeof updateIngredientSchema>;