"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/lib/api/auth";
import toast from "react-hot-toast";
import styles from "./LogoutBtn.module.css";

export const LogoutBtn = ({ className }: { className?: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      queryClient.clear();
      toast.success("Logged out successfully");
      router.replace("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <button
      type="button"
      className={`${styles.logoutBtn} ${className ?? ""}`}
      onClick={handleLogout}
    >
      <svg width="16" height="16">
        <use href="/sprite.svg#logout" />
      </svg>
    </button>
  );
};
