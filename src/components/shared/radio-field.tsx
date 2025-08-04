import type { ComponentProps } from "react";
import CheckIcon from "../icons/check-icon";

interface RadioFieldProps extends ComponentProps<"input"> {
  label: string;
}

const RadioField = ({ label, ...props }: RadioFieldProps) => {
  return (
    <div className="has-checked:border-primary has-checked:bg-primary mb-4 flex items-center rounded-full border border-neutral-500/15 bg-white p-2 transition has-checked:shadow-sm">
      <div className="peer relative flex cursor-pointer items-center">
        <input
          {...props}
          type="radio"
          name={props.name}
          className="peer checked:border-primary checked:bg-primary h-5 w-5 cursor-pointer appearance-none rounded-full border border-neutral-500/15 transition-all"
          id={`${props.name}-${props.id}`}
        />
        <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
          <CheckIcon />
        </span>
      </div>
      <label
        htmlFor={`${props.name}-${props.id}`}
        className="-mb-1 ml-2 cursor-pointer pe-2 text-sm text-neutral-500/30 transition-colors select-none peer-has-checked:text-white"
      >
        {label}
      </label>
    </div>
  );
};

export default RadioField;
