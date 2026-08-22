import * as yup from "yup";
import type { LoginPayload } from "@/types/auth";

export const loginSchema: yup.ObjectSchema<LoginPayload> = yup.object({
  email: yup
    .string()
    .trim()
    .email("Введіть коректний email")
    .required("Email обов'язковий"),
  password: yup
    .string()
    .min(8, "Пароль має містити щонайменше 8 символів")
    .required("Пароль обов'язковий"),
});
