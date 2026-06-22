import InfoSection from "@/components/auth/InfoSection";
import ErrorContent from "@/components/error/ErrorContent";
import styles from "./not-found.module.css";

export default function NotFoundPage() {
  return (
    <main className={styles.page}>
      <InfoSection
        backgroundImage="/images/notfound-bg.png"
        sloganText={"Essa receita\nainda não existe..."}
      />

      <section className={styles.side}>
        <ErrorContent
          code="404"
          title="Página não encontrada"
          message="O endereço que você tentou acessar não existe ou foi movido. Que tal voltar e encontrar algo delicioso?"
          actionLabel="Voltar para o início"
          actionHref="/"
        />
      </section>
    </main>
  );
}