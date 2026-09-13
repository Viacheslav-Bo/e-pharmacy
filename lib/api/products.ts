import { api } from "../axios";
import type { ProductsResponse } from "@/types/product";
import { Product } from "@/types/product";

type GetProductsParams = {
  search?: string;
  page?: number;
  limit?: number;
};

export const getProducts = async (
  params: GetProductsParams,
): Promise<ProductsResponse> => {
  const { data } = await api.get<ProductsResponse>("/products", { params });
  return data;
};

export const updateProduct = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<Product>;
}): Promise<Product> => {
  const { data: responseData } = await api.patch<Product>(
    `/products/${id}`,
    data,
  );
  return responseData;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};
