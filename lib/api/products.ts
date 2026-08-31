import { api } from "../axios";
import type { ProductsResponse } from "@/types/product";

type GetProductsParams = {
  search?: string;
  page?: number;
};

export const getProducts = async (
  params: GetProductsParams,
): Promise<ProductsResponse> => {
  const { data } = await api.get<ProductsResponse>("/products", { params });
  return data;
};
