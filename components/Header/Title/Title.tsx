import styles from "./Title.module.css";

export const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 className={styles.title}>{children}</h1>
);
