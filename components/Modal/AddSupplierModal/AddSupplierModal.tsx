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
import {
  addSupplierSchema,
  type AddSupplierFormValues,
} from "./AddSupplierModal.schema";

import styles from "./AddSupplierModal.module.css";

type AddSupplierModalProps = {
  onClose: () => void;
};

export const AddSupplierModal = ({ onClose }: AddSupplierModalProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddSupplierFormValues>({
    resolver: yupResolver(addSupplierSchema),
    mode: "onTouched",
  });

  const addSupplierMutation = useMutation({
    mutationFn: async (payload: AddSupplierFormValues) => {
      const { data } = await api.post("/suppliers", payload);
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success("Supplier added successfully");
      onClose();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log("STATUS:", error.response?.status);
        console.log("RESPONSE:", error.response?.data);
      }
      toast.error("Failed to add supplier");
    },
  });

  const onSubmit = (values: AddSupplierFormValues) => {
    addSupplierMutation.mutate(values);
  };

  return (
    <Modal onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
      >
        <h2 className={styles.title}>Add a new suppliers</h2>

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
              placeholder="Company"
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
              placeholder="Ammount"
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
            disabled={addSupplierMutation.isPending}
          >
            {addSupplierMutation.isPending ? "Adding..." : "Add"}
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
