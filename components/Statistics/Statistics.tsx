import type { DashboardStatistics } from "@/types/dashboard";
import styles from "./Statistics.module.css";

export const Statistics = ({
  products,
  suppliers,
  customers,
}: DashboardStatistics) => {
  const items = [
    { label: "All products", value: products },
    { label: "All suppliers", value: suppliers },
    { label: "All Customers", value: customers },
  ];

  return (
    <div className={styles.wrapper}>
      {items.map((item) => (
        <div key={item.label} className={styles.card}>
          <span className={styles.value}>{item.value}</span>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};
