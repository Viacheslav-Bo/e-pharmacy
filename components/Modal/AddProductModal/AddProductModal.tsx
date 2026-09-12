"use client";

import { useEffect, useState } from "react";

import Select from "react-select";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Modal } from "@/components/Modal/Modal";

import { api } from "@/lib/axios";
import axios from "axios";

import styles from "./AddProductModal.module.css";

type AddProductModalProps = {
  onClose: () => void;
};

export const AddProductModal = ({ onClose }: AddProductModalProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [suppliers, setSuppliers] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const isFormValid =
    name.trim() !== "" &&
    category.trim() !== "" &&
    stock.trim() !== "" &&
    suppliers.trim() !== "" &&
    price.trim() !== "";

  const addProductMutation = useMutation({
    mutationFn: async () => {
      const newProduct = {
        name,
        category,
        stock,
        suppliers,
        price,
      };

      const { data } = await api.post("/products", newProduct);

      return data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      onClose();
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log("STATUS:", error.response?.status);
        console.log("RESPONSE:", error.response?.data);
      }
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
    if (!isFormValid) return;

    addProductMutation.mutate();
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Add a new product</h2>

        <div className={styles.fields}>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Product info"
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
            value={suppliers}
            onChange={(event) => setSuppliers(event.target.value)}
            placeholder="Suppliers"
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
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Price"
          />
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.saveButton}
            disabled={!isFormValid || addProductMutation.isPending}
          >
            {addProductMutation.isPending ? "Adding..." : "Add"}
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
