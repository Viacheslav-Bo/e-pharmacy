import styles from "./StatusBadge.module.css";

const STATUS_CLASS: Record<string, string> = {
  Completed: styles.completed,
  Confirmed: styles.confirmed,
  Pending: styles.pending,
  Cancelled: styles.cancelled,
  Processing: styles.processing,
  Income: styles.completed,
  Expense: styles.cancelled,
  Error: styles.error,
  Shipped: styles.shipped,
  Delivered: styles.delivered,
};

export const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span className={`${styles.badge} ${STATUS_CLASS[status] ?? ""}`}>
      {status}
    </span>
  );
};
