"use client";

import { useState } from "react";
import { Header } from "@/components/Header/Header";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import styles from "./layout.module.css";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Header onMenuOpen={() => setIsMobileMenuOpen(true)} />
     
      <div className={styles.body}>
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}