import type { ComponentProps } from "react";
import CheckIcon from "../icons/check-icon";

interface CheckboxFieldProps extends ComponentProps<"input"> {
  label: string;
}

const CheckboxField = ({ label, ...props }: CheckboxFieldProps) => {
  return (
    <div className="mb-4 flex items-center">
      <div className="peer relative flex cursor-pointer items-center">
        <input
          {...props}
          type="checkbox"
          className="peer checked:border-primary checked:bg-primary h-5 w-5 cursor-pointer appearance-none rounded border border-neutral-500/15 transition-all checked:shadow-sm"
        />
        <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
          <CheckIcon />
        </span>
      </div>
      <label
        htmlFor={props.id}
        className="peer-has-checked:text-primary -mb-1 ml-2 cursor-pointer text-sm text-neutral-500/30 transition-colors select-none"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
