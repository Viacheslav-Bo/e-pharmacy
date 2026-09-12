"use client";

import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Modal } from "@/components/Modal/Modal";
import Select from "react-select";

import { api } from "@/lib/axios";
import axios from "axios";

import styles from "./AddSupplierModal.module.css";

type AddSupplierModalProps = {
  onClose: () => void;
};

export const AddSupplierModal = ({ onClose }: AddSupplierModalProps) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [suppliers, setSuppliers] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const queryClient = useQueryClient();

  const addSupplierMutation = useMutation({
    mutationFn: async () => {
      const newSupplier = {
        name,
        address,
        date,
        amount,
        suppliers,
        status,
      };

      const { data } = await api.post("/suppliers", newSupplier);

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

    addSupplierMutation.mutate();
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Add a new suppliers</h2>

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
            type="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Address"
          />

          <input
            className={styles.input}
            type="text"
            value={suppliers}
            onChange={(event) => setSuppliers(event.target.value)}
            placeholder="Company"
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
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Ammount"
          />

          <Select
            value={status ? { value: status, label: status } : null}
            onChange={(option) => setStatus(option?.value ?? "")}
            options={[
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "Inactive" },
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
