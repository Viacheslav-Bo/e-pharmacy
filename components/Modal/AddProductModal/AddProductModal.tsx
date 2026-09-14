// components/Modal/AddProductModal/AddProductModal.tsx
"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { Modal } from "@/components/Modal/Modal";
import { api } from "@/lib/axios";
import {
  addProductSchema,
  type AddProductFormValues,
} from "./AddProductModal.schema";

import styles from "./AddProductModal.module.css";

type AddProductModalProps = {
  onClose: () => void;
};

export const AddProductModal = ({ onClose }: AddProductModalProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddProductFormValues>({
    resolver: yupResolver(addProductSchema),
    mode: "onTouched",
  });

  const addProductMutation = useMutation({
    mutationFn: async (payload: AddProductFormValues) => {
      const { data } = await api.post("/products", payload);
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added successfully");
      onClose();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log("STATUS:", error.response?.status);
        console.log("RESPONSE:", error.response?.data);
      }
      toast.error("Failed to add product");
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

  const onSubmit = (values: AddProductFormValues) => {
    addProductMutation.mutate(values);
  };

  return (
    <Modal onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
      >
        <h2 className={styles.title}>Add a new product</h2>

        <div className={styles.fields}>
          <div className={styles.field}>
            <input
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              type="text"
              placeholder="Product info"
              {...register("name")}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  value={
                    field.value ?
                      { value: field.value, label: field.value }
                    : null
                  }
                  onChange={(option) => field.onChange(option?.value ?? "")}
                  options={categories.map((category) => ({
                    value: category,
                    label: category,
                  }))}
                  className={styles.select}
                  classNamePrefix="select"
                  isSearchable={false}
                  placeholder="Category"
                />
              )}
            />
            {errors.category && (
              <span className={styles.errorText}>
                {errors.category.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <input
              className={`${styles.input} ${errors.suppliers ? styles.inputError : ""}`}
              type="text"
              placeholder="Suppliers"
              {...register("suppliers")}
            />
            {errors.suppliers && (
              <span className={styles.errorText}>
                {errors.suppliers.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <input
              className={`${styles.input} ${errors.stock ? styles.inputError : ""}`}
              type="text"
              placeholder="Stock"
              {...register("stock")}
            />
            {errors.stock && (
              <span className={styles.errorText}>{errors.stock.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <input
              className={`${styles.input} ${errors.price ? styles.inputError : ""}`}
              type="text"
              placeholder="Price"
              {...register("price")}
            />
            {errors.price && (
              <span className={styles.errorText}>{errors.price.message}</span>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.saveButton}
            disabled={addProductMutation.isPending}
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
