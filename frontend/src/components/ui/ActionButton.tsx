"use client";

import styles from "./ActionButton.module.css";

type ActionButtonProps = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
};

export default function ActionButton({
  label,
  onClick,
  variant = "primary",
}: ActionButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}