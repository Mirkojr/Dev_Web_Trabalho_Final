import { z } from "zod";

export const allergenIdParamSchema = z.object({
  allergenId: z.uuid(),
});