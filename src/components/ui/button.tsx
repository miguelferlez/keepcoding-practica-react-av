import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  icon?: ReactNode | string;
  label?: string;
  variant: "primary" | "outline" | "destructive";
}

const Button = ({ label, variant, icon, ...props }: ButtonProps) => (
  <button className={clsx("btn", `btn-${variant}`)} {...props}>
    {icon &&
      (typeof icon === "string" ? (
        <span className="material-symbols-outlined">{icon}</span>
      ) : (
        <>{icon}</>
      ))}
    <span className="-mb-0.75">{label}</span>
  </button>
);

export default Button;
