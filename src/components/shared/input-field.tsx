import type { ComponentProps, ReactNode } from "react";

interface InputFieldProps extends ComponentProps<"input"> {
  icon?: ReactNode;
  label: string;
  help?: string;
}

const InputField = ({ icon, label, help, ...props }: InputFieldProps) => {
  return (
    <div className="mb-4 w-full max-w-sm min-w-[200px]">
      <div className="relative">
        <input
          {...props}
          placeholder={label}
          className="peer ease text-primary focus:border-primary w-full rounded-md border border-neutral-500/15 bg-transparent px-4 py-3 transition placeholder:text-transparent focus:shadow-sm focus:outline-none"
          autoComplete="off"
        />
        <label
          htmlFor={props.id}
          className="peer-focus:text-primary bg-background pointer-events-none absolute top-3.5 left-2.5 origin-left transform cursor-text px-1 text-neutral-500/30 transition-all peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-2.5 peer-not-placeholder-shown:scale-90 peer-focus:-top-1.5 peer-focus:left-2.5 peer-focus:scale-90 peer-focus:text-xs"
        >
          {props.required ? <>{label} *</> : <>{label}</>}
        </label>
      </div>
      {help && (
        <p className="mt-2 text-xs" aria-hidden="true" id={`${props.id}-help`}>
          {help}
        </p>
      )}
    </div>
  );
};

export default InputField;
