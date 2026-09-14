"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { getCustomers } from "@/lib/api/customers";
import { NameFilter } from "@/components/NameFilter/NameFilter";
import { CustomersTable } from "@/components/CustomersTable/CustomersTable";
import { Pagination } from "@/components/Pagination/Pagination";
import GlobalLoader from "@/components/Loaders/GlobalLoader/GlobalLoader";
import toast from "react-hot-toast";
import { useEffect } from "react";

import styles from "./page.module.css";

export default function CustomersPage() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isFetching, isPlaceholderData, isError } = useQuery({
    queryKey: ["customers", name, page],
    queryFn: () => getCustomers({ name: name || undefined, page, limit }),
    placeholderData: keepPreviousData,
  });

  const showOverlay = isFetching && isPlaceholderData;

  useEffect(() => {
    if (isError) toast.error("Failed to load customers");
  }, [isError]);

  const handleFilterChange = (newName: string) => {
    setName(newName);
    setPage(1);
  };

  if (isError) {
    return <p className={styles.error}>Failed to load customers</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <NameFilter placeholder="Users Name" onFilter={handleFilterChange} />
      </div>

      {isLoading ?
        <GlobalLoader fullScreen={false} />
      : data && (
          <div className={styles.tableWrapper}>
            {showOverlay && (
              <div className={styles.tableOverlay}>
                <GlobalLoader fullScreen={false} />
              </div>
            )}
            <CustomersTable customers={data.customers} />

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
