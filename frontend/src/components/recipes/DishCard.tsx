"use client";

import { useRouter } from "next/navigation";
import type { RecipeView } from "@/types/recipe";
import styles from "./DishCard.module.css";

type DishCardProps = {
	recipe: RecipeView;
};

function buildImageStyle(url?: string) {
	if (!url) return undefined;
	return { backgroundImage: `url(${url})` };
}

function buildMeta(recipe: RecipeView): string {
	return [recipe.difficultyLabel, recipe.timeLabel]
		.filter((value) => value)
		.join(" · ");
}

export default function DishCard({ recipe }: DishCardProps) {
	const router = useRouter();

	return (
		<article className={styles.card}>
			<div className={styles.body}>
				<span className={styles.image} style={buildImageStyle(recipe.imageUrl)} />
				<h2 className={styles.title}>{recipe.title}</h2>
				<p className={styles.meta}>{buildMeta(recipe)}</p>
			</div>

			<button
				type="button"
				className={styles.editBtn}
				onClick={() => router.push(`/recipes/${recipe.id}/edit`)}
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<path d="M12 20h9" />
					<path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
				</svg>
				Edit dish
			</button>
		</article>
	);
}