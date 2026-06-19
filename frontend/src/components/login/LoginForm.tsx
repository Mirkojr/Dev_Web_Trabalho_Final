"use client";

import { useState } from "react";
import Link from "next/link";
import InputField from "@/components/ui/InputField";
import SubmitButton from "@/components/ui/SubmitButton";
import { useAuth } from "@/hooks/useAuth";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputField label="Email" type="email" placeholder="exemplo@email.com"
        value={email} onChangeText={setEmail} />
      <InputField label="Senha" type="password" placeholder="Use letras e números"
        value={password} onChangeText={setPassword} />

      {error && <p className={styles.error}>{error}</p>}

      <SubmitButton label="☆ Logar" isLoading={loading} />

      <p className={styles.registerHint}>
        Não possui uma conta?{" "}
        <Link href="/register" className={styles.registerLink}>Registre-se</Link>
      </p>
    </form>
  );
}