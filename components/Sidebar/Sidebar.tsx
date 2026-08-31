"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutBtn } from "@/components/Button/LogoutBtn/LogoutBtn";
import styles from "./Sidebar.module.css";

const MENU_ITEMS = [
  { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/orders", icon: "orders", label: "Orders" },
  { href: "/products", icon: "products", label: "Products" },
  { href: "/customers", icon: "customers", label: "Customers" },
  { href: "/suppliers", icon: "suppliers", label: "Suppliers" },
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg width="32" height="32">
            <use
              href="/sprite.svg#close"
            />
          </svg>
        </button>

        <nav className={styles.nav}>
          <ul className={styles.list}>
            {MENU_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.link} ${isActive ? styles.active : ""}`}
                    onClick={onClose}
                    aria-label={item.label}
                  >
                    <svg width="16" height="16">
                      <use href={`/sprite.svg#${item.icon}`} />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <LogoutBtn className={styles.logout} />
      </aside>
    </>
  );
};
