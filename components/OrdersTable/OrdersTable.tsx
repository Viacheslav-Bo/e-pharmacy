"use client";

import Image from "next/image";
import { StatusBadge } from "@/components/StatusBadge/StatusBadge";
import { parseAmount } from "@/lib/parseAmount";
import type { Order } from "@/types/order";

import styles from "./OrdersTable.module.css";

type OrdersTableProps = {
  orders: Order[];
};

export const OrdersTable = ({ orders }: OrdersTableProps) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>All orders</h3>

      <div className={styles.scrollArea}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User Info</th>
              <th>Address</th>
              <th>Products</th>
              <th>Order date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {(orders ?? []).map((order) => {
              const imageSrc = "/user-defoult.png";

              return (
                <tr key={order._id}>
                  <td className={styles.tableTd}>
                    <div className={styles.nameCell}>
                      <Image
                        src={imageSrc}
                        alt={order.name}
                        width={24}
                        height={24}
                        className={styles.avatar}
                      />
                      <span>{order.name}</span>
                    </div>
                  </td>

                  <td>{order.address.split(",")[0]}</td>
                  <td>{order.products}</td>
                  <td>{order.order_date}</td>
                  <td>{parseAmount(order.price).toFixed(2)}</td>

                  <td>
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
