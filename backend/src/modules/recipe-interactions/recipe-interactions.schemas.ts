import { z } from "zod";

export const createInteractionSchema = z.object({
  recipeId: z.string().uuid(),
  type: z.enum(["SMASH", "PASS"]),
});

export const undoInteractionSchema = z.object({
  interactionId: z.string().uuid(),
});

export type CreateInteractionDto = z.infer<typeof createInteractionSchema>;