import styles from "./SubmitButton.module.css";

type SubmitButtonProps = {
  label: string;
  isLoading?: boolean;
  onClick?: () => void;
  type?: "submit" | "button";
};

export default function SubmitButton({
  label,
  isLoading = false,
  onClick,
  type = "submit",
}: SubmitButtonProps) {
  return (
    <button
      className={styles.button}
      type={type}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? "Enviando..." : label}
    </button>
  );
}