"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "@/components/Modal/Modal";
import { deleteProduct } from "@/lib/api/products";
import toast from "react-hot-toast";
import styles from "./DeleteProductModal.module.css";

type DeleteProductModalProps = {
  productId: string;
  productName: string;
  onClose: () => void;
};

export const DeleteProductModal = ({
  productId,
  productName,
  onClose,
}: DeleteProductModalProps) => {
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Product deleted successfully");
      onClose();
    },
    onError: (error) => {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product");
    },
  });

  const handleDelete = () => {
    deleteProductMutation.mutate();
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h2 className={styles.title}>Delete product</h2>
        <p className={styles.text}>
          Are you sure you want to delete{" "}
          <span className={styles.productName}>{productName}</span>? This action
          cannot be undone.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={handleDelete}
            disabled={deleteProductMutation.isPending}
          >
            {deleteProductMutation.isPending ? "Deleting..." : "Delete"}
          </button>

          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
            disabled={deleteProductMutation.isPending}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
