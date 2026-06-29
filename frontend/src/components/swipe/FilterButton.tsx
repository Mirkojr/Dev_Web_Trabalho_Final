"use client";

import { FilterIcon } from "./SwipeIcons";
import styles from "./FilterButton.module.css";

export default function FilterButton({
	onClick,
	count = 0,
}: {
	onClick?: () => void;
	count?: number;
}) {
	return (
		<button type="button" className={styles.button} onClick={onClick}>
			<FilterIcon />
			<span>Filtros</span>
			{count > 0 ? <span className={styles.badge}>{count}</span> : null}
		</button>
	);
}