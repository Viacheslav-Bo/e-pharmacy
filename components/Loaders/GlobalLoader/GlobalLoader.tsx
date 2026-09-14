import Image from "next/image";
import styles from "./GlobalLoader.module.css";

interface GlobalLoaderProps {
  fullScreen?: boolean;
}

export default function GlobalLoader({ fullScreen = true }: GlobalLoaderProps) {
  return (
    <div className={fullScreen ? styles.overlay : styles.inline}>
      <div className={styles.spinnerWrapper}>
        <Image
          src="/logo.png"
          alt="Loading..."
          width={64}
          height={64}
          className={styles.logo}
          priority
        />
      </div>
    </div>
  );
}
