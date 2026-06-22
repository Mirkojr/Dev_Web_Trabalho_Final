"use client";

import { useRouter } from "next/navigation";
import {BrandLogo} from "@/components/BrandLogo";
import ActionButton from "@/components/ui/ActionButton";
import styles from "./ErrorContent.module.css";

type ErrorContentProps = {
  code?: string;
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
};

export default function ErrorContent({
  code = "404",
  title,
  message,
  actionLabel = "Voltar para o início",
  actionHref = "/",
}: ErrorContentProps) {
  const router = useRouter();

  return (
    <div className={styles.content}>
      <BrandLogo size={96} />
      <p className={styles.code}>{code}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.message}>{message}</p>
      <ActionButton
        label={actionLabel}
        onClick={() => router.push(actionHref)}
      />
    </div>
  );
}