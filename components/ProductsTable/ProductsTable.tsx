"use client";
import { useState } from "react";
import { parseAmount } from "@/lib/parseAmount";
import type { Product } from "@/types/product";
import { EditProductModal } from "@/components/Modal/EditProductModal/EditProductModal";
import styles from "./ProductsTable.module.css";

type ProductsTableProps = {
  products: Product[];
};

export const ProductsTable = ({ products }: ProductsTableProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleDelete = (id: string) => {
    if (confirm("Видалити товар?")) {
      console.log("Delete:", id);
      // тут виклик delete mutation
    }
  };

  console.log("TABLE PRODUCTS:", products);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>All products</h3>

      <div className={styles.scrollArea}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product Info</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Suppliers</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {(products ?? []).map((product) => {
              return (
                <tr key={product._id}>
                  <td>
                    <div className={styles.nameCell}>
                      <span>{product.name}</span>
                    </div>
                  </td>

                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>{product.suppliers}</td>
                  <td>{parseAmount(product.price).toFixed(2)}</td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.editButton}
                        onClick={() => handleEdit(product)}
                        aria-label="Edit product"
                      >
                        <svg width="16" height="16">
                          <use href={"/sprite.svg#edit"} />
                        </svg>
                      </button>

                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => handleDelete(product._id)}
                        aria-label="Delete product"
                      >
                        <svg width="16" height="16">
                          <use href={"/sprite.svg#trash"} />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {selectedProduct && (
          <EditProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </div>
  );
};
