import { StatusBadge } from "@/components/StatusBadge/StatusBadge";
import type { IncomeExpenseEntry } from "@/types/dashboard";
import styles from "./IncomeExpenses.module.css";
import { parseAmount } from "@/lib/parseAmount";

const isSameDay = (a: Date, b: Date): boolean =>
  a.toDateString() === b.toDateString();

const groupByDay = (
  entries: IncomeExpenseEntry[],
): [string, IncomeExpenseEntry[]][] => {
  const today = new Date();
  const groups = new Map<string, IncomeExpenseEntry[]>();

  for (const entry of entries) {
    const date = entry.createdAt ? new Date(entry.createdAt) : new Date();

    const label =
      isSameDay(date, today) ? "Today" : (
        date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      );

    if (!groups.has(label)) groups.set(label, []);
    groups.get(label)!.push(entry);
  }

  return Array.from(groups.entries());
};

export const IncomeExpenses = ({
  entries,
}: {
  entries: IncomeExpenseEntry[];
}) => {
  const groups = groupByDay(entries);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Income/Expenses</h3>
      {groups.map(([label, dayEntries]) => (
        <div key={label} className={styles.group}>
          <span className={styles.dateLabel}>{label}</span>
          {dayEntries.map((entry) => (
            <div key={entry._id} className={styles.row}>
              <StatusBadge status={entry.type} />
              <span className={styles.name}>{entry.name}</span>
              <span
                className={`${styles.amount} ${
                  entry.type === "Income" ? styles.positive
                  : entry.type === "Expense" ? styles.negative
                  : styles.errored
                }`}
              >
                {entry.type === "Expense" ? "-" : "+"}
                {Math.abs(parseAmount(entry.amount)).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
