"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getSuppliers } from "@/lib/api/suppliers";
import { NameFilter } from "@/components/NameFilter/NameFilter";
import { SuppliersTable } from "@/components/SuppliersTable/SuppliersTable";
import { AddSupplierModal } from "@/components/Modal/AddSupplierModal/AddSupplierModal";

import styles from "./page.module.css";

export default function SuppliersPage() {
  const [name, setName] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["suppliers", name],
    queryFn: () => getSuppliers({ name: name || undefined }),
  });

  console.log("PAGE DATA:", data);

  if (isError) {
    return <p className={styles.error}>Не вдалось завантажити suppliers</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <NameFilter placeholder="Users Name" onFilter={setName} />

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
      : <SuppliersTable suppliers={data} />}

      {isAddModalOpen && (
        <AddSupplierModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
}
