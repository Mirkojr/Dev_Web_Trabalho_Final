import { apiRequest } from "./api";
import type { Allergen } from "@/types/recipe";

type ApiAllergen = { id: string; name: string };

type ApiUserAllergen = {
	userId: string;
	allergenId: string;
	allergen: ApiAllergen;
};

export const allergenService = {
	/** Todos os alérgenos cadastrados (catálogo fixo, endpoint público). */
	async getAll(): Promise<Allergen[]> {
		const data = await apiRequest<ApiAllergen[]>("/allergens");
		return data
			.map((a) => ({ id: a.id, name: a.name }))
			.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
	},

	/** Alérgenos salvos no perfil do usuário autenticado. */
	async getMine(): Promise<Allergen[]> {
		const data = await apiRequest<ApiUserAllergen[]>("/users/me/allergens", {
			auth: true,
		});
		return data.map((entry) => ({
			id: entry.allergen.id,
			name: entry.allergen.name,
		}));
	},

	/** Adiciona um alérgeno ao perfil. */
	async add(allergenId: string): Promise<void> {
		await apiRequest(`/users/me/allergens/${allergenId}`, {
			method: "POST",
			auth: true,
		});
	},

	/** Remove um alérgeno do perfil. */
	async remove(allergenId: string): Promise<void> {
		await apiRequest(`/users/me/allergens/${allergenId}`, {
			method: "DELETE",
			auth: true,
		});
	},
};