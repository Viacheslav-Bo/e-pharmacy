"use client";

import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { getSuppliers } from "@/lib/api/suppliers";
import { NameFilter } from "@/components/NameFilter/NameFilter";
import { SuppliersTable } from "@/components/SuppliersTable/SuppliersTable";
import { AddSupplierModal } from "@/components/Modal/AddSupplierModal/AddSupplierModal";
import { Pagination } from "@/components/Pagination/Pagination";
import GlobalLoader from "@/components/Loaders/GlobalLoader/GlobalLoader";
import toast from "react-hot-toast";

import styles from "./page.module.css";

export default function SuppliersPage() {
  const [name, setName] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isFetching, isPlaceholderData, isError } = useQuery({
    queryKey: ["suppliers", name, page],
    queryFn: () => getSuppliers({ name: name || undefined, page, limit }),
    placeholderData: keepPreviousData,
  });

  const showOverlay = isFetching && isPlaceholderData;

  useEffect(() => {
    if (isError) toast.error("Failed to load suppliers");
  }, [isError]);

  const handleFilterChange = (newName: string) => {
    setName(newName);
    setPage(1);
  };

  if (isError) {
    return <p className={styles.error}>Failed to load suppliers</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <NameFilter placeholder="Users Name" onFilter={handleFilterChange} />

        <button
          type="button"
          className={styles.addButton}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add a new suppliers
        </button>
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
            <SuppliersTable suppliers={data.suppliers} />

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

      {isAddModalOpen && (
        <AddSupplierModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
}
