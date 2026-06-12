import styles from "./InputField.module.css";

type InputFieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
  name?: string;
};

export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChangeText,
  name,
}: InputFieldProps) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input
        className={styles.input}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
      />
    </label>
  );
}