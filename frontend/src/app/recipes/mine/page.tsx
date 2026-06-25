import AppShell from "@/components/layout/AppShell";
import MyRecipesContent from "@/components/recipes/MyRecipesContent";

export default function MyRecipesPage() {
	return (
		<AppShell active="conta">
			<MyRecipesContent />
		</AppShell>
	);
}