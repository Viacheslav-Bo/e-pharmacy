"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/lib/api/dashboard";
import { Statistics } from "@/components/Statistics/Statistics";
import { RecentCustomers } from "@/components/RecentCustomers/RecentCustomers";
import { IncomeExpenses } from "@/components/IncomeExpenses/IncomeExpenses";
import GlobalLoader from "@/components/Loaders/GlobalLoader/GlobalLoader";
import toast from "react-hot-toast";
import styles from "./page.module.css";

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  useEffect(() => {
    if (isError) toast.error("Failed to load dashboard");
  }, [isError]);

  if (isError) return <p className={styles.error}>Failed to load dashboard</p>;
  if (isLoading || !data) return <GlobalLoader />;

  return (
    <div className={styles.wrapper}>
      <Statistics {...data.stats} />
      <div className={styles.tables}>
        <RecentCustomers customers={data.recentCustomers} />
        <div className={styles.scrollHint} aria-hidden="true" />

        <IncomeExpenses entries={data.transactions} />
      </div>
    </div>
  );
}
