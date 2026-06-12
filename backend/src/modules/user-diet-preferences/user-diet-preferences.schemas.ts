import { z } from "zod";

export const dietPreferenceIdParamSchema = z.object({
  dietPreferenceId: z.uuid(),
});