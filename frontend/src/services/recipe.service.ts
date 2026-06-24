import { apiRequest } from "./api";
import type { RecipeView, InteractionType } from "@/types/recipe";

/**
 * Formato cru que a API retorna para uma receita.
 * (mantido local ao service; os componentes só consomem o RecipeView mapeado)
 */
type ApiRecipe = {
	id: string;
	title: string;
	description?: string;
	preparationMethod?: string;
	preparationTimeMinutes?: number;
	difficulty?: string;
	imageUrl?: string | null;
	status?: string;
	authorId?: string;
	author?: {
		id: string;
		username: string;
		avatarUrl?: string | null;
	};
	categories?: Array<{
		category?: { id: string; name: string; status?: string };
	}>;
	ingredients?: Array<{
		quantity?: number;
		unit?: string;
		ingredient?: { id: string; name: string };
	}>;
};

const DIFFICULTY_LABELS: Record<string, string> = {
	EASY: "Fácil",
	MEDIUM: "Médio",
	HARD: "Difícil",
};

function buildIngredientLabel(item: ApiRecipe["ingredients"][number]): string {
	const quantity = item.quantity ?? "";
	const unit = item.unit ?? "";
	const name = item.ingredient?.name ?? "";
	return `${quantity} ${unit} de ${name}`.replace(/\s+/g, " ").trim();
}

export function mapRecipe(recipe: ApiRecipe): RecipeView {
	return {
		id: recipe.id,
		title: recipe.title,
		subtitle: recipe.description ?? "",
		imageUrl: recipe.imageUrl ?? undefined,
		preparation: recipe.preparationMethod ?? "",
		difficultyLabel:
			(recipe.difficulty && DIFFICULTY_LABELS[recipe.difficulty]) ??
			recipe.difficulty ??
			"",
		timeLabel: recipe.preparationTimeMinutes
			? `${recipe.preparationTimeMinutes} minutos`
			: "",
		tags: (recipe.categories ?? [])
			.map((entry) => entry.category?.name)
			.filter((name): name is string => Boolean(name)),
		ingredients: (recipe.ingredients ?? []).map(buildIngredientLabel),
		authorName: recipe.author?.username ?? "",
	};
}

export const recipeService = {
	/** Feed de swipe (receitas ainda não interagidas). */
	async getFeed(limit = 10): Promise<RecipeView[]> {
		const data = await apiRequest<ApiRecipe[]>(
			`/interactions/feed?limit=${limit}`,
			{ auth: true }
		);
		return data.map(mapRecipe);
	},

	/** Uma receita específica (Tela 8). */
	async getById(id: string): Promise<RecipeView> {
		const data = await apiRequest<ApiRecipe>(`/recipes/${id}`, { auth: true });
		return mapRecipe(data);
	},

	/** Receitas curtidas / smashs do usuário (Tela 7). */
	async getLiked(): Promise<RecipeView[]> {
		const data = await apiRequest<ApiRecipe[]>("/users/me/smashs", {
			auth: true,
		});
		return data.map(mapRecipe);
	},

	/** Registra um swipe (SMASH/PASS). */
	async swipe(recipeId: string, type: InteractionType): Promise<void> {
		await apiRequest("/interactions/swipe", {
			method: "POST",
			body: { recipeId, type },
			auth: true,
		});
	},

	/** Desfaz a última interação. */
	async undo(): Promise<void> {
		await apiRequest("/interactions/undo", {
			method: "POST",
			auth: true,
		});
	},
};