"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SideMenu from "@/components/swipe/SideMenu";
import SwipeArea from "@/components/swipe/SwipeArea";
import RecipeDetails from "@/components/swipe/RecipeDetails";
import FilterPanel, { SwipeFilters } from "@/components/swipe/FilterPanel";
import { recipeService } from "@/services/recipe.service";
import { commentService } from "@/services/comment.service";
import { catalogService } from "@/services/catalog.service";
import { getToken } from "@/services/api";
import { InteractionType, RecipeComment, RecipeView } from "@/types/recipe";
import styles from "./swipe.module.css";

// Dificuldades são um enum fixo — sempre aparecem no filtro
const DIFFICULTY_OPTIONS = ["Fácil", "Médio", "Difícil"];
const EMPTY_FILTERS: SwipeFilters = { difficulties: [], categories: [] };

export default function SwipePage() {
	const router = useRouter();

	const [recipes, setRecipes] = useState<RecipeView[]>([]);
	const [swipedIds, setSwipedIds] = useState<Set<string>>(() => new Set());
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [comments, setComments] = useState<RecipeComment[]>([]);
	const [commentsLoading, setCommentsLoading] = useState(false);
	const [actionLoading, setActionLoading] = useState(false);

	const [filters, setFilters] = useState<SwipeFilters>(EMPTY_FILTERS);
	const [showFilters, setShowFilters] = useState(false);

	// Lista FIXA de categorias (todas as cadastradas), independente do feed
	const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

	// Deck após remover já interagidas e aplicar filtros (client-side)
	const filteredRecipes = useMemo(() => {
		return recipes.filter((recipe) => {
			if (swipedIds.has(recipe.id)) return false;

			const difficultyOk =
				filters.difficulties.length === 0 ||
				filters.difficulties.includes(recipe.difficultyLabel);

			const categoryOk =
				filters.categories.length === 0 ||
				recipe.tags.some((tag) => filters.categories.includes(tag));

			return difficultyOk && categoryOk;
		});
	}, [recipes, filters, swipedIds]);

	const current = filteredRecipes[0];
	const filterCount = filters.difficulties.length + filters.categories.length;

	// 1) Feed (exige login)
	useEffect(() => {
		if (!getToken()) {
			router.replace("/login");
			return;
		}

		let active = true;

		(async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await recipeService.getFeed(10);
				if (active) {
					setRecipes(data);
					setSwipedIds(new Set());
				}
			} catch (err) {
				if (active) {
					setError(
						err instanceof Error ? err.message : "Erro ao carregar receitas."
					);
				}
			} finally {
				if (active) setLoading(false);
			}
		})();

		return () => {
			active = false;
		};
	}, [router]);

	// 2) Categorias fixas do catálogo (carregadas uma vez, não dependem do feed)
	useEffect(() => {
		if (!getToken()) return;

		let active = true;

		catalogService
			.getCategories()
			.then((items) => {
				if (active) {
					setCategoryOptions(
						items
							.map((item) => item.name)
							.sort((a, b) => a.localeCompare(b, "pt-BR"))
					);
				}
			})
			.catch(() => {
				/* mantém a lista vazia se o catálogo falhar */
			});

		return () => {
			active = false;
		};
	}, []);

	// 3) Comentários da receita atual (somente leitura nesta tela)
	useEffect(() => {
		if (!current) {
			setComments([]);
			return;
		}

		let active = true;
		setCommentsLoading(true);

		commentService
			.getByRecipe(current.id)
			.then((data) => active && setComments(data))
			.catch(() => active && setComments([]))
			.finally(() => active && setCommentsLoading(false));

		return () => {
			active = false;
		};
	}, [current]);

	// 4) Swipe (SMASH/PASS) — remove a receita atual do deck
	const handleSwipe = useCallback(
		async (type: InteractionType) => {
			if (!current || actionLoading) return;
			const recipeId = current.id;
			setActionLoading(true);
			try {
				await recipeService.swipe(recipeId, type);
			} catch (err) {
				console.error("Falha ao registrar swipe:", err);
			} finally {
				setActionLoading(false);
				setSwipedIds((prev) => {
					const next = new Set(prev);
					next.add(recipeId);
					return next;
				});
			}
		},
		[current, actionLoading]
	);

	// 5) Aplica filtros (o deck recalcula automaticamente)
	const handleApplyFilters = useCallback((next: SwipeFilters) => {
		setFilters(next);
		setShowFilters(false);
	}, []);

	const emptyMessage =
		filterCount > 0 && filteredRecipes.length === 0
			? "Nenhuma receita corresponde aos filtros selecionados."
			: undefined;

	return (
		<div className={styles.page}>
			<aside className={styles.menu}>
				<SideMenu active="swipe" />
			</aside>

			<main className={styles.swipe}>
				<SwipeArea
					recipe={current}
					loading={loading}
					error={error}
					empty={!loading && !error && !current}
					emptyMessage={emptyMessage}
					disabled={actionLoading}
					filterCount={filterCount}
					onFilter={() => setShowFilters(true)}
					onPass={() => handleSwipe("PASS")}
					onSmash={() => handleSwipe("SMASH")}
				/>
			</main>

			{/* preparo → tags → ingredientes → comentários (read-only) */}
			<aside className={styles.details}>
				<RecipeDetails
					recipe={current}
					comments={comments}
					commentsLoading={commentsLoading}
				/>
			</aside>

			<FilterPanel
				open={showFilters}
				difficultyOptions={DIFFICULTY_OPTIONS}
				categoryOptions={categoryOptions}
				value={filters}
				onApply={handleApplyFilters}
				onClose={() => setShowFilters(false)}
			/>
		</div>
	);
}