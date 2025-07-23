import type { ReactNode } from "react";

interface PopoverProps {
  icon?: ReactNode | string;
  children: ReactNode;
}

const Popover = ({ children, icon }: PopoverProps) => (
  <div className="popover flex items-center">
    <button
      className="text-primary flex items-center p-1 transition-opacity hover:opacity-75"
      type="button"
    >
      {icon &&
        (typeof icon === "string" ? (
          <span className="material-symbols-outlined">{icon}</span>
        ) : (
          <>{icon}</>
        ))}
    </button>
    <div className="popover-menu invisible origin-top -translate-y-2 scale-95 transform opacity-0 transition">
      <div
        className="absolute -right-2 mt-4 w-12 origin-top rounded-lg border border-black/15 bg-white p-2 shadow-md outline-none"
        role="menu"
      >
        <ul className="flex flex-col justify-center gap-1 text-2xl">
          {children}
        </ul>
      </div>
    </div>
  </div>
);

export default Popover;
