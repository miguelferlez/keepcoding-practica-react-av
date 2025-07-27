import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

interface ToasterProps extends ComponentProps<"div"> {
  icon?: ReactNode | string;
  text: string | undefined;
  variant: "error" | "success" | "warning" | "info";
}

const Alert = ({ icon, text, variant, ...props }: ToasterProps) => {
  return (
    <div role="alert" className={clsx("alert", `alert-${variant}`)} {...props}>
      <div className="flex items-center gap-1">
        <div className="flex items-center justify-center">
          {icon &&
            (typeof icon === "string" ? (
              <span className="material-symbols-outlined">{icon}</span>
            ) : (
              <>{icon}</>
            ))}
        </div>
        <span className="-mb-1">{text}</span>
      </div>
      <button
        type="button"
        className="ms-auto inline-flex cursor-pointer items-center justify-center rounded-lg"
        data-dismiss-target="dismiss-alert"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
};

export default Alert;
