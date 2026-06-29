import type { Metadata } from "next";
import RecipesAdminView from "@/components/admin/RecipesAdminView";

export const metadata: Metadata = {
  title: "Receitas | Painel administrativo",
  description: "Modere e gerencie as receitas do sistema.",
};

export default function AdminRecipesPage() {
  return <RecipesAdminView />;
}