export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserInfo {
  name: string;
  email: string;
}

export interface LoginResponse {
  message: string;
  user: UserInfo & { role: "admin" | "user" };
}

export interface UserInfoResponse {
  status: number;
  message: string;
  data: UserInfo;
}
