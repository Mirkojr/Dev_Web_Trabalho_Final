import { z } from "zod";
import { InteractionType } from "../../generated/prisma";

export const swipeSchema = z.object({
  recipeId: z.uuid(),
  type: z.enum(InteractionType),
});

export const interactionIdParamSchema = z.object({
  id: z.uuid(),
});

export type CreateInteractionDto = z.infer<typeof swipeSchema>;