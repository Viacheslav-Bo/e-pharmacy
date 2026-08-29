"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/lib/api/auth";
import styles from "./LogoutBtn.module.css";

export const LogoutBtn = ({ className }: { className?: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async (): Promise<void> => {
    await logout();
    queryClient.clear();
    router.replace("/login");
  };

  return (
    <button
      type="button"
      className={`${styles.logoutBtn} ${className ?? ""}`}
      onClick={handleLogout}
    >
      <svg width="20" height="20">
        <use href="/sprite.svg#logout" />
      </svg>
    </button>
  );
};
