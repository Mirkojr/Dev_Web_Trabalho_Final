import { BrandLogo } from "@/components/BrandLogo";
import InfoSection from "@/components/auth/InfoSection";
import RegisterForm from "@/components/register/RegisterForm";
import styles from "./register.module.css";

export default function RegisterPage() {
  return (
    <main className={styles.page}>
      <InfoSection
        backgroundImage="/images/register-bg.png"
        sloganText={"O par perfeito para\no que você tem na geladeira."}
      />

      <section className={styles.formSide}>
        <BrandLogo size={120} className={styles.logo} />
        <h1 className={styles.title}>Crie sua conta e encontre seu sabor.</h1>
        <RegisterForm />
      </section>
    </main>
  );
}