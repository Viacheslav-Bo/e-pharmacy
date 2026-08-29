import Image from "next/image";
import Link from "next/link";

import styles from "./Logo.module.css";

type LogoProps = {
  iconOnly?: boolean;
  isAuthenticated?: boolean;
};

export const Logo = ({
  iconOnly = false,
  isAuthenticated = false,
}: LogoProps) => {
  const href = isAuthenticated ? "/dashboard" : "/login";

  return (
    <Link href={href} className={styles.logo} aria-label="E-Pharmacy">
      <Image src="/logo.png" alt="" width={44} height={44} />

      {!iconOnly && <span className={styles.text}>E-Pharmacy</span>}
    </Link>
  );
};
