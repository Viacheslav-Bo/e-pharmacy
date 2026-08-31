import { api } from "../axios";
import type { OrdersResponse } from "@/types/order";

type GetOrdersParams = {
  search?: string;
  page?: number;
};

export const getOrders = async (
  params: GetOrdersParams,
): Promise<OrdersResponse> => {
  const { data } = await api.get<OrdersResponse>("/orders", { params });
  return data;
};
