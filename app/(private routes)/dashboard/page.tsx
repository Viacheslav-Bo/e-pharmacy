"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/lib/api/dashboard";
import { Statistics } from "@/components/Statistics/Statistics";
import { RecentCustomers } from "@/components/RecentCustomers/RecentCustomers";
import { IncomeExpenses } from "@/components/IncomeExpenses/IncomeExpenses";
import styles from "./page.module.css";

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  if (isError)
    return <p className={styles.error}>Не вдалось завантажити дашборд</p>;
  if (isLoading || !data) return <p>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      <Statistics {...data.stats} />
      <div className={styles.tables}>
        <RecentCustomers customers={data.recentCustomers} />
        <IncomeExpenses entries={data.transactions} />
      </div>
    </div>
  );
}
