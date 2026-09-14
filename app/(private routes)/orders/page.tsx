"use client";

import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getOrders } from "@/lib/api/orders";
import { NameFilter } from "@/components/NameFilter/NameFilter";
import { OrdersTable } from "@/components/OrdersTable/OrdersTable";
import { Pagination } from "@/components/Pagination/Pagination";
import GlobalLoader from "@/components/Loaders/GlobalLoader/GlobalLoader";
import toast from "react-hot-toast";
import styles from "./page.module.css";

export default function OrdersPage() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isFetching, isPlaceholderData, isError } = useQuery({
    queryKey: ["orders", name, page],
    queryFn: () => getOrders({ search: name || undefined, page, limit }),
    placeholderData: keepPreviousData,
  });

  const showOverlay = isFetching && isPlaceholderData;

  useEffect(() => {
    if (isError) toast.error("Failed to load orders");
  }, [isError]);

  const handleFilterChange = (newName: string) => {
    setName(newName);
    setPage(1);
  };

  if (isError) return <p className={styles.error}>Failed to load orders</p>;

  return (
    <div className={styles.wrapper}>
      <NameFilter placeholder="User Name" onFilter={handleFilterChange} />
      {isLoading ?
        <GlobalLoader fullScreen={false} />
      : data && (
          <div className={styles.tableWrapper}>
            {showOverlay && (
              <div className={styles.tableOverlay}>
                <GlobalLoader fullScreen={false} />
              </div>
            )}
            <OrdersTable orders={data.orders} />
            {data.totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={data.totalPages}
                onPageChange={setPage}
                disabled={showOverlay}
              />
            )}
            <div className={styles.scrollHint} aria-hidden="true" />
          </div>
        )
      }
    </div>
  );
}
