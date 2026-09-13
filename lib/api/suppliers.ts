import { api } from "../axios";
import type { SuppliersResponse } from "@/types/supplier";

type GetSuppliersParams = {
  name?: string;
  page?: number;
  limit?: number;
};

export const getSuppliers = async (
  params: GetSuppliersParams,
): Promise<SuppliersResponse> => {
  const { data } = await api.get<SuppliersResponse>("/suppliers", { params });
  return data;
};
