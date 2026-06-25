"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { recipeService } from "@/services/recipe.service";
import type { RecipeView } from "@/types/recipe";
import DishCard from "./DishCard";
import styles from "./MyRecipesContent.module.css";

export default function MyRecipesContent() {
	const router = useRouter();
	const [recipes, setRecipes] = useState<RecipeView[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let active = true;

		async function load() {
			setLoading(true);
			setError(null);
			try {
				const me = await authService.me();
				const mine = await recipeService.getMine(me.id);
				if (active) setRecipes(mine);
			} catch (err) {
				if (active) {
					setError(
						err instanceof Error
							? err.message
							: "Não foi possível carregar suas receitas."
					);
				}
			} finally {
				if (active) setLoading(false);
			}
		}

		load();

		return () => {
			active = false;
		};
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Minhas receitas</h1>

			{error && <p className={styles.state}>{error}</p>}

			<div className={styles.grid}>
				<button
					type="button"
					className={styles.addCard}
					onClick={() => router.push("/recipes/new")}
				>
					<span className={styles.addPlus}>+</span>
					<span className={styles.addLabel}>Add new dish</span>
				</button>

				{recipes.map((recipe) => (
					<DishCard key={recipe.id} recipe={recipe} />
				))}
			</div>

			{!loading && !error && recipes.length === 0 && (
				<p className={styles.state}>
					Você ainda não tem receitas aprovadas. Crie uma nova receita para começar.
				</p>
			)}

			{loading && <p className={styles.state}>Carregando suas receitas…</p>}
		</div>
	);
}