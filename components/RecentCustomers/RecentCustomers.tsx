import Image from "next/image";
import type { RecentCustomer } from "@/types/dashboard";
import styles from "./RecentCustomers.module.css";
import { parseAmount } from "@/lib/parseAmount";

export const RecentCustomers = ({
  customers,
}: {
  customers: RecentCustomer[];
}) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Recent Customers</h3>
      <div className={styles.scrollArea}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Spent</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => {
              const avatarSrc = customer.image || customer.photo;
              return (
                <tr key={customer._id}>
                  <td>
                    <div className={styles.nameCell}>
                      {avatarSrc ?
                        <Image
                          src={avatarSrc}
                          alt={customer.name}
                          width={32}
                          height={32}
                          className={styles.avatar}
                        />
                      : <div className={styles.avatarPlaceholder}>
                          {customer.name.charAt(0)}
                        </div>
                      }
                      <span>{customer.name}</span>
                    </div>
                  </td>
                  <td>{customer.email}</td>
                  <td>{parseAmount(customer.spent).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
