import clsx from "clsx";
import type { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  label: string;
  variant: "primary" | "outline" | "destructive";
}

const Button = ({ label, variant, ...props }: ButtonProps) => (
  <button className={clsx("btn", `btn-${variant}`)} {...props}>
    {label}
  </button>
);

export default Button;
