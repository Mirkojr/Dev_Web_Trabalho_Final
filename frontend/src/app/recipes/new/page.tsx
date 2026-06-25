import AppShell from "@/components/layout/AppShell";
import RecipeForm from "@/components/recipes/RecipeForm";

export default function NewRecipePage() {
	return (
		<AppShell active="conta">
			<RecipeForm mode="create" />
		</AppShell>
	);
}