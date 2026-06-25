import { apiRequest } from "./api";
import type { CatalogItem } from "@/types/recipe";

type ApiCatalogItem = { id: string; name: string; status?: string };

function mapItem(item: ApiCatalogItem): CatalogItem {
	return { id: item.id, name: item.name };
}

export const catalogService = {
	/** Categorias aprovadas (para o seletor da criação de receita). */
	async getCategories(): Promise<CatalogItem[]> {
		const data = await apiRequest<ApiCatalogItem[]>("/categories", {
			auth: true,
		});
		return data.map(mapItem);
	},

	/**
	 * Ingredientes aprovados. O POST /recipes só aceita ingredientes APPROVED,
	 * então filtramos para não oferecer opções que causariam erro 400.
	 */
	async getIngredients(): Promise<CatalogItem[]> {
		const data = await apiRequest<ApiCatalogItem[]>("/ingredients", {
			auth: true,
		});
		return data
			.filter((item) => !item.status || item.status === "APPROVED")
			.map(mapItem);
	},
};