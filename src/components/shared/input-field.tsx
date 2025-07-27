import type { ComponentProps, ReactNode } from "react";

interface InputFieldProps extends ComponentProps<"input"> {
  icon?: ReactNode;
  label: string;
}

const InputFIeld = ({ icon, label, ...props }: InputFieldProps) => {
  return (
    <div className="mb-4 w-full max-w-sm min-w-[200px]">
      <div className="relative">
        <input
          {...props}
          placeholder=""
          className="peer ease text-primary focus:border-primary w-full rounded-md border border-neutral-500/15 bg-transparent px-3 py-2 text-sm transition placeholder:text-transparent focus:shadow-sm focus:outline-none"
        />
        <label
          htmlFor={props.id}
          className="peer-focus:text-primary absolute top-2.5 left-2.5 origin-left transform cursor-text bg-white px-1 text-sm text-neutral-500/30 transition-all peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:left-2.5 peer-not-placeholder-shown:scale-90 peer-focus:-top-2 peer-focus:left-2.5 peer-focus:scale-90 peer-focus:text-xs"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default InputFIeld;
