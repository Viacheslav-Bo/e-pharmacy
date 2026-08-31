"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/api/orders";
import { NameFilter } from "@/components/NameFilter/NameFilter";
import { OrdersTable } from "@/components/OrdersTable/OrdersTable";
import styles from "./page.module.css";

export default function OrdersPage() {
  const [name, setName] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders", name],
    queryFn: () => getOrders({ search: name || undefined }),
  });

  if (isError)
    return <p className={styles.error}>Не вдалось завантажити замовлення</p>;

  return (
    <div className={styles.wrapper}>
      <NameFilter placeholder="User Name" onFilter={setName} />
      {isLoading || !data ?
        <p>Loading...</p>
      : <OrdersTable orders={data} />}
    </div>
  );
}
