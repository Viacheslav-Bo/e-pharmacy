import styles from "./Button.module.css";

type ButtonProps = {
  variant?: "primary" | "outline";
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  variant = "primary",
  disabled,
  className,
  ...rest
}: ButtonProps) => {
  const variantClass = variant === "primary" ? styles.primary : styles.outline;
  return (
    <button
      className={`${styles.button} ${variantClass} ${className ?? ""}`}
      disabled={disabled}
      {...rest}
    />
  );
};
