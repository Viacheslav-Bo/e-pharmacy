import Link from "next/link";
import styles from "./Sub-title.module.css";

type SubTitleProps = {
  children: React.ReactNode;
  href?: string;
};

export const SubTitle = ({ children, href }: SubTitleProps) =>
  href ?
    <Link href={href} className={styles.subtitle}>
      {children}
    </Link>
  : <span className={styles.subtitle}>{children}</span>;
