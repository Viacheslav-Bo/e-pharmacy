"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "@/components/Modal/Modal";
import { api } from "@/lib/axios";
import axios from "axios";
import type { Supplier } from "@/types/supplier";
import { formatDateForInput, formatDateForBackend } from "@/lib/api/formatDate";
import Select from "react-select";

import styles from "./EditSupplierModal.module.css";

type EditSupplierModalProps = {
  supplier: Supplier;
  onClose: () => void;
};

export const EditSupplierModal = ({
  supplier,
  onClose,
}: EditSupplierModalProps) => {
  const [name, setName] = useState(supplier.name);
  const [address, setAddress] = useState(supplier.address);
  const [date, setDate] = useState(formatDateForInput(supplier.date));
  const [suppliersField, setSuppliersField] = useState(
    supplier.suppliers || "",
  );
  const [ammount, setAmmount] = useState(String(supplier.amount ?? ""));
  const [status, setStatus] = useState(supplier.status);

  const queryClient = useQueryClient();

  const updateSupplierMutation = useMutation({
    mutationFn: async () => {
      const updatedSupplier = {
        name,
        address,
        date: formatDateForBackend(date),
        suppliers: suppliersField,
        amount: ammount,
        status,
      };

      const { data } = await api.put(
        `/suppliers/${supplier._id}`,
        updatedSupplier,
      );

      return data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["suppliers"],
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateSupplierMutation.mutate();
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Edit supplier</h2>

        <div className={styles.fields}>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Supplier info"
          />

          <input
            className={styles.input}
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Address"
          />

          <input
            className={styles.input}
            type="text"
            value={suppliersField}
            onChange={(event) => setSuppliersField(event.target.value)}
            placeholder="Suppliers"
          />

          <input
            className={styles.input}
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            placeholder="Delivery date"
          />

          <input
            className={styles.input}
            type="text"
            value={ammount}
            onChange={(event) => setAmmount(event.target.value)}
            placeholder="Amount"
          />

          <Select
            value={status ? { value: status, label: status } : null}
            onChange={(option) => setStatus(option?.value ?? "")}
            options={[
              { value: "Active", label: "Active" },
              { value: "Deactive", label: "Deactive" },
            ]}
            className={styles.select}
            classNamePrefix="select"
            isSearchable={false}
            placeholder="Status"
          />
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
