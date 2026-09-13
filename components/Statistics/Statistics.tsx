import type { DashboardStatistics } from "@/types/dashboard";
import styles from "./Statistics.module.css";

export const Statistics = ({
  products,
  suppliers,
  customers,
}: DashboardStatistics) => {
  const items = [
    { label: "All products", value: products, iconId: "coins" },
    { label: "All suppliers", value: suppliers, iconId: "coins" },
    { label: "All Customers", value: customers, iconId: "users" },
  ];

  return (
    <div className={styles.wrapper}>
      {items.map((item) => (
        <div key={item.label} className={styles.card}>
          <div className={styles.header}>
            <svg className={styles.icon} width="20" height="20">
              <use href={`/sprite.svg#${item.iconId}`} />
            </svg>
            <span className={styles.label}>{item.label}</span>
          </div>
          <span className={styles.value}>{item.value}</span>
        </div>
      ))}
    </div>
  );
};
