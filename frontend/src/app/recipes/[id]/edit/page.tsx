"use client";

import { useParams } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import RecipeForm from "@/components/recipes/RecipeForm";

export default function EditRecipePage() {
	const params = useParams();
	const recipeId = String(params.id);

	return (
		<AppShell active="conta">
			<RecipeForm mode="edit" recipeId={recipeId} />
		</AppShell>
	);
}