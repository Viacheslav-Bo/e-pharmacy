"use client";

import { usePathname } from "next/navigation";
import { Logo } from "@/components/Header/Logo/Logo";
import { Title } from "@/components/Header/Title/Title";
import { SubTitle } from "@/components/Header/Sub-title/Sub-title";
import { LogoutBtn } from "@/components/Button/LogoutBtn/LogoutBtn";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import styles from "./Header.module.css";

const PAGE_LABELS: Record<string, string> = {
  "/dashboard": "Dasboard",
  "/orders": "All orders",
  "/products": "All products",
  "/suppliers": "All suppliers",
  "/customers": "Customers Data",
};

type HeaderProps = {
  onMenuOpen: () => void;
};

export const Header = ({ onMenuOpen }: HeaderProps) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const pageLabel = PAGE_LABELS[pathname];

  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.menuBtn}
        onClick={onMenuOpen}
        aria-label="Open menu"
      >
        <svg width="24" height="24">
          <use href="/sprite.svg#menu" />
        </svg>
      </button>

      <Logo iconOnly isAuthenticated={!!user} />

      <div className={styles.textBlock}>
        <Title>Medicine store</Title>
        <div className={styles.subRow}>
          <SubTitle>{pageLabel}</SubTitle>
          <span className={styles.divider}>|</span>
          <SubTitle>{user?.email}</SubTitle>
        </div>
      </div>

      <LogoutBtn className={styles.logout} />
    </header>
  );
};
