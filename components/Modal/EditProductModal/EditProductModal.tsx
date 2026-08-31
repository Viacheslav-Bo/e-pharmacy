"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { Modal } from "@/components/Modal/Modal";
import { api } from "@/lib/axios";
import Select from "react-select";
import styles from "./EditProductModal.module.css";

import { useMutation, useQueryClient } from "@tanstack/react-query";

type EditProductModalProps = {
  product: Product;
  onClose: () => void;
};

export const EditProductModal = ({
  product,
  onClose,
}: EditProductModalProps) => {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [stock, setStock] = useState(String(product.stock));
  const [suppliers, setSuppliers] = useState(product.suppliers);
  const [price, setPrice] = useState(String(product.price));
  const [categories, setCategories] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const updateProductMutation = useMutation({
    mutationFn: async () => {
      const updatedProduct = {
        name,
        category,
        stock,
        suppliers,
        price,
      };

      const { data } = await api.put(
        `/products/${product._id}`,
        updatedProduct,
      );

      return data;
    },

    onSuccess: async () => {
      console.log("UPDATE SUCCESS");

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      console.log("INVALIDATION DONE");

      onClose();
    },

    onError: (error) => {
      console.error("Failed to update product:", error);
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get<string[]>("/products/categories");

        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateProductMutation.mutate();
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Edit product</h2>
        <div className={styles.fields}>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Product name"
          />

          <Select
            value={category ? { value: category, label: category } : null}
            onChange={(option) => setCategory(option?.value ?? "")}
            options={categories.map((category) => ({
              value: category,
              label: category,
            }))}
            className={styles.select}
            classNamePrefix="select"
            isSearchable={false}
            placeholder="Category"
          />

          <input
            className={styles.input}
            type="text"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            placeholder="Stock"
          />

          <input
            className={styles.input}
            type="text"
            value={suppliers}
            onChange={(event) => setSuppliers(event.target.value)}
            placeholder="Suppliers"
          />

          <input
            className={styles.input}
            type="text"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Price"
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
