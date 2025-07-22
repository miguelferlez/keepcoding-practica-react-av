import type { ReactNode } from "react";

interface DropdownProps {
  icon?: ReactNode | string;
  children: ReactNode;
}

const Dropdown = ({ children, icon }: DropdownProps) => (
  <div className="dropdown flex items-center">
    <button
      className="text-primary flex items-center p-1 transition-opacity hover:opacity-75"
      type="button"
    >
      <span className="material-symbols-outlined">{icon}</span>
    </button>
    <div className="dropdown-menu invisible origin-top -translate-y-2 scale-95 transform opacity-0 transition">
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

export default Dropdown;
