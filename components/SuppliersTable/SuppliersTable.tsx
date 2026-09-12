"use client";
import { useState } from "react";
import type { Supplier } from "@/types/supplier";
import { EditSupplierModal } from "@/components/Modal/EditSupplierModal/EditSupplierModal";
import styles from "./SuppliersTable.module.css";
import { parseAmount } from "@/lib/parseAmount";

type SuppliersTableProps = {
  suppliers: Supplier[];
};

export const SuppliersTable = ({ suppliers }: SuppliersTableProps) => {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );

  const handleEdit = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>All suppliers</h3>

      <div className={styles.scrollArea}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Suppliers Info</th>
              <th>Address</th>
              <th>Company</th>
              <th>Delivery date</th>
              <th>Ammount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {(suppliers ?? []).map((supplier) => {
              return (
                <tr key={supplier._id}>
                  <td>
                    <div className={styles.nameCell}>
                      <span>{supplier.name}</span>
                    </div>
                  </td>
                  <td>{supplier.address}</td>
                  <td>{supplier.suppliers}</td>
                  <td>{supplier.date || "—"}</td>
                  <td>{parseAmount(supplier.amount)}</td>
                  <td>
                    <span
                      className={`${styles.badge} ${supplier.status === "Active" ? styles.active : styles.deactive}`}
                    >
                      {supplier.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.editButton}
                        onClick={() => handleEdit(supplier)}
                        aria-label="Edit product"
                      >
                        <svg width="16" height="16">
                          <use href={"/sprite.svg#edit"} />
                        </svg>
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {selectedSupplier && (
          <EditSupplierModal
            supplier={selectedSupplier}
            onClose={() => setSelectedSupplier(null)}
          />
        )}
      </div>
    </div>
  );
};
