import { api } from "../axios";
import type { LoginPayload, LoginResponse, UserInfo } from "@/types/auth";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/user/login", payload);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/user/logout");
};

export const getUserInfo = async (): Promise<UserInfo> => {
  const { data } = await api.get<UserInfo>("/user/user-info");
  return data;
};
