import styles from "./InfoSection.module.css";

type InfoSectionProps = {
  backgroundImage: string;
  sloganText: string;
};

export default function InfoSection({
  backgroundImage,
  sloganText,
}: InfoSectionProps) {
  const bgStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.45)), url(${backgroundImage})`,
  };

  return (
    <aside className={styles.info} style={bgStyle}>
      <p className={styles.slogan}>{sloganText}</p>
    </aside>
  );
}