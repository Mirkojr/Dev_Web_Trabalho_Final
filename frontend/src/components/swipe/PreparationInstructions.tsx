import styles from "./PreparationInstructions.module.css";

export default function PreparationInstructions({ text }: { text?: string }) {
	const steps = (text ?? "")
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line.length > 0);

	return (
		<div>
			<h3 className={styles.heading}>Modo de preparo</h3>
			{steps.length === 0 ? (
				<p className={styles.step}>Modo de preparo não informado.</p>
			) : (
				<div className={styles.text}>
					{steps.map((step, index) => (
						<p key={index} className={styles.step}>
							{step}
						</p>
					))}
				</div>
			)}
		</div>
	);
}