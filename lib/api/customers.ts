import { api } from "../axios";
import type { CustomersResponse } from "@/types/customer";

type GetCustomersParams = {
  name?: string;
  page?: number;
  limit?: number;
};

export const getCustomers = async (
  params: GetCustomersParams,
): Promise<CustomersResponse> => {
  const { data } = await api.get<CustomersResponse>("/customers", { params });
  return data;
};
