"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/lib/api/products";
import { NameFilter } from "@/components/NameFilter/NameFilter";
import { ProductsTable } from "@/components/ProductsTable/ProductsTable";
import { AddProductModal } from "@/components/Modal/AddProductModal/AddProductModal";

import styles from "./page.module.css";

export default function ProductsPage() {
  const [name, setName] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", name],
    queryFn: () => getProducts({ search: name || undefined }),
  });

  console.log("PAGE DATA:", data);

  if (isError) {
    return <p className={styles.error}>Не вдалось завантажити products</p>;
  }

  return (
    
      <div className={styles.wrapper}>
        <div className={styles.toolbar}>
          <NameFilter placeholder="Product Name" onFilter={setName} />

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
        : <ProductsTable products={data} />}

        {isAddModalOpen && (
          <AddProductModal onClose={() => setIsAddModalOpen(false)} />
        )}
      </div>
    
  );
}
