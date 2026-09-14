import GlobalLoader from "@/components/Loaders/GlobalLoader/GlobalLoader";
import styles from "./OverlayLoader.module.css";

type OverlayLoaderProps = {
  show: boolean;
  children: React.ReactNode;
};

export default function OverlayLoader({ show, children }: OverlayLoaderProps) {
  return (
    <div className={styles.wrapper}>
      {show && (
        <div className={styles.overlay}>
          <GlobalLoader fullScreen={false} />
        </div>
      )}
      {children}
    </div>
  );
}
