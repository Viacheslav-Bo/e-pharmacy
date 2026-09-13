"use client";
// import { useState } from "react";
import type { Customer } from "@/types/customer";
import styles from "./CustomersTable.module.css";
import Image from "next/image";

type CustomersTableProps = {
  customers: Customer[];
};

export const CustomersTable = ({ customers }: CustomersTableProps) => {
  //   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
  //     null,
  //   );

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Customers Data</h3>

      <div className={styles.scrollArea}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User Info</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Register date</th>
            </tr>
          </thead>

          <tbody>
            {(customers ?? []).map((customer) => {
              return (
                <tr key={customer._id}>
                  <td>
                    <div className={styles.nameCell}>
                      <Image
                        src={
                          customer.image ||
                          customer.photo ||
                          "/user-default.png"
                        }
                        alt={customer.name}
                        width={24}
                        height={24}
                        className={styles.avatar}
                      />
                      <span>{customer.name}</span>
                    </div>
                  </td>
                  <td>{customer.email}</td>
                  <td>{customer.address?.split(",").slice(0, 2).join(",")}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.register_date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
