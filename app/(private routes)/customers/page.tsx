"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getCustomers } from "@/lib/api/customers";
import { NameFilter } from "@/components/NameFilter/NameFilter";
import { CustomersTable } from "@/components/CustomersTable/CustomersTable";

import styles from "./page.module.css";

export default function CustomersPage() {
  const [name, setName] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["customers", name],
    queryFn: () => getCustomers({ name: name || undefined }),
  });

  if (isError) {
    return <p className={styles.error}>Не вдалось завантажити Customers</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <NameFilter
          placeholder="Users Name"
          onFilter={setName}
          noPaddingRight={false}
        />
      </div>

      {isLoading || !data ?
        <p>Loading...</p>
      : <CustomersTable customers={data.data} />}
    </div>
  );
}
