import { z } from "zod";

export const createDietPreferenceSchema =
  z.object({
    name: z.string().min(2).max(100),
  });

export const updateDietPreferenceSchema =
  z.object({
    name: z.string().min(2).max(100),
  });

export const dietPreferenceIdParamSchema =
  z.object({
    id: z.uuid(),
  });

export type CreateDietPreferenceDto =
  z.infer<
    typeof createDietPreferenceSchema
  >;

export type UpdateDietPreferenceDto =
  z.infer<
    typeof updateDietPreferenceSchema
  >;