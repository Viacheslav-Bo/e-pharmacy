"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getCustomers } from "@/lib/api/customers";
import { NameFilter } from "@/components/NameFilter/NameFilter";
import { CustomersTable } from "@/components/CustomersTable/CustomersTable";
import { Pagination } from "@/components/Pagination/Pagination";

import styles from "./page.module.css";

export default function CustomersPage() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["customers", name, page],
    queryFn: () => getCustomers({ name: name || undefined, page, limit }),
  });

  const handleFilterChange = (newName: string) => {
    setName(newName);
    setPage(1);
  };

  if (isError) {
    return <p className={styles.error}>Не вдалось завантажити Customers</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <NameFilter placeholder="Users Name" onFilter={handleFilterChange} />
      </div>

      {isLoading || !data ?
        <p>Loading...</p>
      : <>
          <CustomersTable customers={data.customers} />

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
