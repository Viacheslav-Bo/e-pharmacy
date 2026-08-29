"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/Button/Button";
import { login } from "@/lib/api/auth";
import type { LoginPayload } from "@/types/auth";
import { loginSchema } from "./LoginForm.schema";
import styles from "./LoginForm.module.css";

export const LoginForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (payload: LoginPayload): Promise<void> => {
    setServerError(null);
    try {
      await login(payload);
      router.push("/dashboard");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Помилка входу");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email address"
          className={`${styles.input} ${
            errors.email ? styles.inputError
            : touchedFields.email ? styles.inputSuccess
            : ""
          }`}
          {...register("email")}
        />

        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`${styles.input} ${styles.passwordInput} ${
              errors.password ? styles.inputError
              : touchedFields.password ? styles.inputSuccess
              : ""
            }`}
            {...register("password")}
          />

          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <svg width="20" height="20">
              <use href={`/sprite.svg#${showPassword ? "hide" : "show"}`} />
            </svg>
          </button>
        </div>

        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </div>

      {serverError && <span className={styles.error}>{serverError}</span>}

      <Button className={styles.loginBtn} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Log In"}
      </Button>
    </form>
  );
};
