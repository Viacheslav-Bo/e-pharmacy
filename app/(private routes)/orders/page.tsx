"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/api/orders";
import { NameFilter } from "@/components/NameFilter/NameFilter";
import { OrdersTable } from "@/components/OrdersTable/OrdersTable";
import { Pagination } from "@/components/Pagination/Pagination";

import styles from "./page.module.css";

export default function OrdersPage() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders", name, page],
    queryFn: () => getOrders({ search: name || undefined, page, limit }),
  });

  const handleFilterChange = (newName: string) => {
    setName(newName);
    setPage(1);
  };

  if (isError)
    return <p className={styles.error}>Не вдалось завантажити замовлення</p>;

  return (
    <div className={styles.wrapper}>
      <NameFilter placeholder="User Name" onFilter={handleFilterChange} />
      {isLoading || !data ?
        <p>Loading...</p>
      : <>
          <OrdersTable orders={data.orders} />
          {data.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          )}
          <div className={styles.scrollHint} aria-hidden="true" />
        </>
      }
    </div>
  );
}
