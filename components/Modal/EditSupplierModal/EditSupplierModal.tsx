"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
import axios from "axios";
import toast from "react-hot-toast";
import { FormDatePicker } from "@/components/FormDatePicker/FormDatePicker";

import { Modal } from "@/components/Modal/Modal";
import { api } from "@/lib/axios";
import type { Supplier } from "@/types/supplier";
import { formatDateForInput, formatDateForBackend } from "@/lib/api/formatDate";
import {
  addSupplierSchema,
  type AddSupplierFormValues,
} from "@/components/Modal/AddSupplierModal/AddSupplierModal.schema";

import styles from "./EditSupplierModal.module.css";

type EditSupplierModalProps = {
  supplier: Supplier;
  onClose: () => void;
};

export const EditSupplierModal = ({
  supplier,
  onClose,
}: EditSupplierModalProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddSupplierFormValues>({
    resolver: yupResolver(addSupplierSchema),
    mode: "onTouched",
    defaultValues: {
      name: supplier.name,
      address: supplier.address,
      suppliers: supplier.suppliers || "",
      date: formatDateForInput(supplier.date),
      amount: String(supplier.amount ?? ""),
      status: supplier.status,
    },
  });

  const updateSupplierMutation = useMutation({
    mutationFn: async (values: AddSupplierFormValues) => {
      const updatedSupplier = {
        ...values,
        date: formatDateForBackend(values.date),
      };

      const { data } = await api.put(
        `/suppliers/${supplier._id}`,
        updatedSupplier,
      );
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success("Supplier updated successfully");
      onClose();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log("STATUS:", error.response?.status);
        console.log("RESPONSE:", error.response?.data);
      }
      toast.error("Failed to update supplier");
    },
  });

  const onSubmit = (values: AddSupplierFormValues) => {
    updateSupplierMutation.mutate(values);
  };

  return (
    <Modal onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
      >
        <h2 className={styles.title}>Edit supplier</h2>

        <div className={styles.fields}>
          <div className={styles.field}>
            <input
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              type="text"
              placeholder="Supplier info"
              {...register("name")}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <input
              className={`${styles.input} ${errors.address ? styles.inputError : ""}`}
              type="text"
              placeholder="Address"
              {...register("address")}
            />
            {errors.address && (
              <span className={styles.errorText}>{errors.address.message}</span>
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
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <FormDatePicker
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.date}
                />
              )}
            />
            {errors.date && (
              <span className={styles.errorText}>{errors.date.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <input
              className={`${styles.input} ${errors.amount ? styles.inputError : ""}`}
              type="text"
              placeholder="Amount"
              {...register("amount")}
            />
            {errors.amount && (
              <span className={styles.errorText}>{errors.amount.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  value={
                    field.value ?
                      { value: field.value, label: field.value }
                    : null
                  }
                  onChange={(option) => field.onChange(option?.value ?? "")}
                  options={[
                    { value: "Active", label: "Active" },
                    { value: "Deactive", label: "Deactive" },
                  ]}
                  className={styles.select}
                  classNamePrefix="select"
                  isSearchable={false}
                  placeholder="Status"
                />
              )}
            />
            {errors.status && (
              <span className={styles.errorText}>{errors.status.message}</span>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.saveButton}
            disabled={updateSupplierMutation.isPending}
          >
            {updateSupplierMutation.isPending ? "Saving..." : "Save"}
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
