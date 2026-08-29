"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/lib/api/auth";

const PUBLIC_PATHS = ["/login"];

export const useAuth = () => {
  const pathname = usePathname();
  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-info"],
    queryFn: getUserInfo,
    retry: false,
    enabled: !isPublicPath,
  });

  return {
    user: user ?? null,
    isLoading,
    isError,
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, isError } = useAuth();

  const isRedirecting = useRef(false);

  useEffect(() => {
    if (isLoading || isRedirecting.current) return;

    if (pathname !== "/login" && isError) {
      isRedirecting.current = true;
      router.replace("/login");
    }
  }, [isLoading, isError, pathname, router]);

  if (isLoading) return null;

  return <>{children}</>;
};
