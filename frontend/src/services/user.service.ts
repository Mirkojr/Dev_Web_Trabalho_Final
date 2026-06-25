import { apiRequest } from "./api";
import type { AuthUser } from "@/types/auth";

export type UpdateProfilePayload = {
	name?: string;
	bio?: string;
	avatarUrl?: string;
};

export const userService = {
	/** Atualiza o perfil do usuário autenticado (PATCH /users/me). */
	async updateProfile(payload: UpdateProfilePayload): Promise<AuthUser> {
		return apiRequest<AuthUser>("/users/me", {
			method: "PATCH",
			body: payload,
			auth: true,
		});
	},
};