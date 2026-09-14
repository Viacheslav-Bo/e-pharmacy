"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import GlobalLoader from "@/components/Loaders/GlobalLoader/GlobalLoader";

export default function Home() {
  const { user, isLoading, isError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (user) {
      router.replace("/dashboard");
    } else if (isError) {
      router.replace("/login");
    }
  }, [user, isLoading, isError, router]);

  return <GlobalLoader />;
}
