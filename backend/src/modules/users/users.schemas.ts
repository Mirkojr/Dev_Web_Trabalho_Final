import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(3).optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.url().optional(),
});

export type UpdateProfileDto =
  z.infer<typeof updateProfileSchema>;

export const updateUserAllergensSchema =
  z.object({
    allergenIds: z.array(z.uuid()),
  });

export const updateUserDietPreferencesSchema =
  z.object({
    dietPreferenceIds: z.array(z.uuid()),
  });

export type UpdateUserAllergensDto =
  z.infer<
    typeof updateUserAllergensSchema
  >;

export type UpdateUserDietPreferencesDto =
  z.infer<
    typeof updateUserDietPreferencesSchema
  >;