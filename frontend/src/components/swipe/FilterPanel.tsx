"use client";

import { useEffect, useState } from "react";
import styles from "./FilterPanel.module.css";

export type SwipeFilters = {
	difficulties: string[];
	categories: string[];
	allergens: string[]; // alérgenos a ESCONDER nesta sessão
};

type FilterPanelProps = {
	open: boolean;
	difficultyOptions: string[];
	categoryOptions: string[];
	allergenOptions: string[];
	value: SwipeFilters;
	onApply: (filters: SwipeFilters) => void;
	onClose: () => void;
};

export default function FilterPanel({
	open,
	difficultyOptions,
	categoryOptions,
	allergenOptions,
	value,
	onApply,
	onClose,
}: FilterPanelProps) {
	const [draft, setDraft] = useState<SwipeFilters>(value);

	// Sincroniza o rascunho sempre que o painel abre
	useEffect(() => {
		if (open) setDraft(value);
	}, [open, value]);

	if (!open) return null;

	function toggle(list: string[], item: string): string[] {
		return list.includes(item)
			? list.filter((x) => x !== item)
			: [...list, item];
	}

	function toggleDifficulty(item: string) {
		setDraft((prev) => ({
			...prev,
			difficulties: toggle(prev.difficulties, item),
		}));
	}

	function toggleCategory(item: string) {
		setDraft((prev) => ({
			...prev,
			categories: toggle(prev.categories, item),
		}));
	}

	function toggleAllergen(item: string) {
		setDraft((prev) => ({
			...prev,
			allergens: toggle(prev.allergens, item),
		}));
	}

	function clearAll() {
		setDraft({ difficulties: [], categories: [], allergens: [] });
	}

	return (
		<div
			className={styles.overlay}
			role="dialog"
			aria-modal="true"
			onClick={onClose}
		>
			<div className={styles.panel} onClick={(e) => e.stopPropagation()}>
				<header className={styles.header}>
					<h2 className={styles.title}>Filtros</h2>
					<button
						type="button"
						className={styles.close}
						onClick={onClose}
						aria-label="Fechar"
					>
						×
					</button>
				</header>

				<section className={styles.section}>
					<h3 className={styles.sectionTitle}>Dificuldade</h3>
					{difficultyOptions.length === 0 ? (
						<p className={styles.empty}>Nenhuma opção disponível.</p>
					) : (
						<div className={styles.chips}>
							{difficultyOptions.map((option) => (
								<button
									key={option}
									type="button"
									className={`${styles.chip} ${
										draft.difficulties.includes(option) ? styles.chipActive : ""
									}`}
									onClick={() => toggleDifficulty(option)}
								>
									{option}
								</button>
							))}
						</div>
					)}
				</section>

				<section className={styles.section}>
					<h3 className={styles.sectionTitle}>Categorias</h3>
					{categoryOptions.length === 0 ? (
						<p className={styles.empty}>
							Nenhuma categoria nas receitas atuais.
						</p>
					) : (
						<div className={styles.chips}>
							{categoryOptions.map((option) => (
								<button
									key={option}
									type="button"
									className={`${styles.chip} ${
										draft.categories.includes(option) ? styles.chipActive : ""
									}`}
									onClick={() => toggleCategory(option)}
								>
									{option}
								</button>
							))}
						</div>
					)}
				</section>

				<section className={styles.section}>
					<h3 className={styles.sectionTitle}>Esconder receitas com</h3>
					<p className={styles.note}>
						Receitas que contêm estes alérgenos não serão exibidas nesta sessão.
					</p>
					{allergenOptions.length === 0 ? (
						<p className={styles.empty}>Nenhum alérgeno cadastrado.</p>
					) : (
						<div className={styles.chips}>
							{allergenOptions.map((option) => (
								<button
									key={option}
									type="button"
									className={`${styles.chipBlock} ${
										draft.allergens.includes(option)
											? styles.chipBlockActive
											: ""
									}`}
									onClick={() => toggleAllergen(option)}
								>
									{option}
								</button>
							))}
						</div>
					)}
				</section>

				<footer className={styles.footer}>
					<button type="button" className={styles.clear} onClick={clearAll}>
						Limpar
					</button>
					<button
						type="button"
						className={styles.apply}
						onClick={() => onApply(draft)}
					>
						Aplicar
					</button>
				</footer>
			</div>
		</div>
	);
}