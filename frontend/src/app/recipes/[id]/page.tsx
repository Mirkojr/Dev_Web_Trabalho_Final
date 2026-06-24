"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SideMenu from "@/components/swipe/SideMenu";
import RecipeDetails from "@/components/swipe/RecipeDetails";
import { recipeService } from "@/services/recipe.service";
import { commentService } from "@/services/comment.service";
import type { RecipeComment, RecipeView } from "@/types/recipe";
import styles from "./recipe.module.css";

export default function RecipePage() {
	const params = useParams();
	const router = useRouter();
	const recipeId = String(params.id);

	const [recipe, setRecipe] = useState<RecipeView | null>(null);
	const [comments, setComments] = useState<RecipeComment[]>([]);
	const [loading, setLoading] = useState(true);
	const [commentsLoading, setCommentsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let active = true;

		async function loadRecipe() {
			setLoading(true);
			setError(null);
			try {
				const data = await recipeService.getById(recipeId);
				if (active) setRecipe(data);
			} catch (err) {
				if (active) {
					setError(
						err instanceof Error
							? err.message
							: "Não foi possível carregar a receita."
					);
				}
			} finally {
				if (active) setLoading(false);
			}
		}

		async function loadComments() {
			setCommentsLoading(true);
			try {
				const data = await commentService.getByRecipe(recipeId);
				if (active) setComments(data);
			} catch {
				if (active) setComments([]);
			} finally {
				if (active) setCommentsLoading(false);
			}
		}

		loadRecipe();
		loadComments();

		return () => {
			active = false;
		};
	}, [recipeId]);

	async function handleAddComment(text: string) {
		await commentService.create(recipeId, text);
		const updated = await commentService.getByRecipe(recipeId);
		setComments(updated);
	}

	return (
		<div className={styles.page}>
			<aside className={styles.menuWrap}>
				<SideMenu active="curtidas" />
			</aside>

			<main className={styles.main}>
				<button
					type="button"
					className={styles.back}
					onClick={() => router.back()}
					aria-label="Voltar"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="M9 14L4 9l5-5" />
						<path d="M4 9h10a6 6 0 0 1 6 6v1" />
					</svg>
				</button>

				<div className={styles.container}>
					<header className={styles.header}>
						<p className={styles.eyebrow}>Receita</p>
						<h1 className={styles.title}>{recipe?.title ?? "Receita"}</h1>
					</header>

					{error ? (
						<p className={styles.state}>{error}</p>
					) : loading ? (
						<p className={styles.state}>Carregando receita…</p>
					) : (
						<>
							<div
								className={styles.image}
								style={buildImageStyle(recipe?.imageUrl)}
							/>
							<RecipeDetails
								recipe={recipe ?? undefined}
								comments={comments}
								commentsLoading={commentsLoading}
								onAddComment={handleAddComment}
							/>
						</>
					)}
				</div>
			</main>
		</div>
	);
}

function buildImageStyle(url?: string) {
	if (!url) return undefined;
	return { backgroundImage: `url(${url})` };
}