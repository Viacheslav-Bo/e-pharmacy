"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getSuppliers } from "@/lib/api/suppliers";
import { NameFilter } from "@/components/NameFilter/NameFilter";
import { SuppliersTable } from "@/components/SuppliersTable/SuppliersTable";
import { AddSupplierModal } from "@/components/Modal/AddSupplierModal/AddSupplierModal";
import { Pagination } from "@/components/Pagination/Pagination";

import styles from "./page.module.css";

export default function SuppliersPage() {
  const [name, setName] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["suppliers", name, page],
    queryFn: () => getSuppliers({ name: name || undefined, page, limit }),
    placeholderData: (previousData) => previousData,
  });

  const handleFilterChange = (newName: string) => {
    setName(newName);
    setPage(1);
  };

  if (isError) {
    return <p className={styles.error}>Не вдалось завантажити suppliers</p>;
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

      {isLoading || !data ?
        <p>Loading...</p>
      : <>
          <SuppliersTable suppliers={data.suppliers} />

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

      {isAddModalOpen && (
        <AddSupplierModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
}
