"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/lib/api/products";
import { NameFilter } from "@/components/NameFilter/NameFilter";
import { ProductsTable } from "@/components/ProductsTable/ProductsTable";
import { AddProductModal } from "@/components/Modal/AddProductModal/AddProductModal";
import { Pagination } from "@/components/Pagination/Pagination";

import styles from "./page.module.css";

export default function ProductsPage() {
  const [name, setName] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", name, page],
    queryFn: () => getProducts({ search: name || undefined, page, limit }),
  });

  const handleFilterChange = (newName: string) => {
    setName(newName);
    setPage(1);
  };

  if (isError) {
    return <p className={styles.error}>Не вдалось завантажити products</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <NameFilter
          placeholder="Product Name"
          onFilter={handleFilterChange}
          showFilterButton={true}
        />

        <button
          type="button"
          className={styles.addButton}
          onClick={() => setIsAddModalOpen(true)}
        >
          <span className={styles.addIcon}>
            <svg width="16" height="16">
              <use href="/sprite.svg#add" />
            </svg>
          </span>

          <span className={styles.addText}>Add a new product</span>
        </button>
      </div>

      {isLoading || !data ?
        <p>Loading...</p>
      : <>
          <ProductsTable products={data.products} />
          {data.totalPages > 1 && (
            <>
              <Pagination
                currentPage={page}
                totalPages={data.totalPages}
                onPageChange={setPage}
              />
            </>
          )}
          <div className={styles.scrollHint} aria-hidden="true" />
        </>
      }

      {isAddModalOpen && (
        <AddProductModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
}
