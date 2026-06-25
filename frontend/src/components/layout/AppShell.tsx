import type { ReactNode } from "react";
import SideMenu from "@/components/swipe/SideMenu";
import styles from "./AppShell.module.css";

type AppShellProps = {
	active?: "swipe" | "curtidas" | "conta";
	children: ReactNode;
};

export default function AppShell({ active = "conta", children }: AppShellProps) {
	return (
		<div className={styles.page}>
			<aside className={styles.menuWrap}>
				<SideMenu active={active} />
			</aside>

			<main className={styles.main}>{children}</main>
		</div>
	);
}