import { api } from "../axios";
import type { DashboardResponse } from "@/types/dashboard";

export const getDashboard = async (): Promise<DashboardResponse> => {
  const { data } = await api.get<DashboardResponse>("/dashboard");
  return data;
};
