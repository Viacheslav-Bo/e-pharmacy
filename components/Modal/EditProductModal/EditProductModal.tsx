"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
import toast from "react-hot-toast";

import type { Product } from "@/types/product";
import { Modal } from "@/components/Modal/Modal";
import { api } from "@/lib/axios";
import {
  addProductSchema,
  type AddProductFormValues,
} from "@/components/Modal/AddProductModal/AddProductModal.schema";

import styles from "./EditProductModal.module.css";

type EditProductModalProps = {
  product: Product;
  onClose: () => void;
};

export const EditProductModal = ({
  product,
  onClose,
}: EditProductModalProps) => {
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
    defaultValues: {
      name: product.name,
      category: product.category,
      stock: String(product.stock),
      suppliers: product.suppliers,
      price: String(product.price),
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async (payload: AddProductFormValues) => {
      const { data } = await api.put(`/products/${product._id}`, payload);
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully");
      onClose();
    },
    onError: (error) => {
      toast.error("Failed to update product");
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

  const onSubmit = (values: AddProductFormValues) => {
    updateProductMutation.mutate(values);
  };

  return (
    <Modal onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
      >
        <h2 className={styles.title}>Edit product</h2>

        <div className={styles.fields}>
          <div className={styles.field}>
            <input
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              type="text"
              placeholder="Product name"
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
            disabled={updateProductMutation.isPending}
          >
            {updateProductMutation.isPending ? "Saving..." : "Save"}
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
