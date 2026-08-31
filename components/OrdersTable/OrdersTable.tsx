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
              const showImage = Boolean(order.photo);

              return (
                <tr key={order._id}>
                  <td>
                    <div className={styles.nameCell}>
                      {showImage ?
                        <Image
                          src={order.photo!}
                          alt={order.name}
                          width={32}
                          height={32}
                          className={styles.avatar}
                        />
                      : <div className={styles.avatarPlaceholder}>
                          {order.name.charAt(0).toUpperCase()}
                        </div>
                      }

                      <span>{order.name}</span>
                    </div>
                  </td>

                  <td>{order.address}</td>
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
