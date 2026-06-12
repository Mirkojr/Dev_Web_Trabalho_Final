import { z } from "zod";

export const createAllergenSchema = z.object({
  name: z.string().min(2).max(100),
});

export const updateAllergenSchema = z.object({
  name: z.string().min(2).max(100),
});

export const allergenIdParamSchema = z.object({
  id: z.uuid(),
});

export type CreateAllergenDto =
  z.infer<typeof createAllergenSchema>;

export type UpdateAllergenDto =
  z.infer<typeof updateAllergenSchema>;