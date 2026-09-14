import GlobalLoader from "@/components/Loaders/GlobalLoader/GlobalLoader";
import styles from "./Overlay.module.css";

type OverlayProps = {
  show: boolean;
  children: React.ReactNode;
};

export default function Overlay({ show, children }: OverlayProps) {
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
