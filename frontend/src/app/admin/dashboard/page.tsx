import type { Metadata } from "next";
import DashboardView from "@/components/admin/DashboardView";

export const metadata: Metadata = {
  title: "Dashboard | Painel administrativo",
  description: "Métricas gerais de usuários, receitas e interações do sistema.",
};

export default function AdminDashboardPage() {
  return <DashboardView />;
}