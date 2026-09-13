import styles from "./Pagination.module.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const start = Math.max(0, Math.min(currentPage - 3, totalPages - 5));
  const visiblePages = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, i) => start + i + 1,
  );

  return (
    <div className={styles.wrapper}>
      {visiblePages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`${styles.dot} ${page === currentPage ? styles.active : ""}`}
          aria-label={`Page ${page}`}
        />
      ))}
    </div>
  );
};
