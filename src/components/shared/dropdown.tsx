import type { ReactNode } from "react";
import Button from "../ui/button";

interface DropdownProps {
  icon?: ReactNode | string;
  label: string;
  children: ReactNode;
}

const Dropdown = ({ children, label, icon }: DropdownProps) => (
  <div className="popover flex items-center">
    <Button icon={icon} label={label} variant="outline" className="nav-item" />
    <div className="popover-menu invisible origin-top-left -translate-y-2 scale-100 transform opacity-0 transition">
      <div
        className="bg-background absolute -left-18 mt-6 w-72 origin-top-left rounded-lg border border-black/15 p-4 shadow-md outline-none sm:w-98 dark:border-white/15"
        tabIndex={-1}
        role="menu"
      >
        {children}
      </div>
    </div>
  </div>
);

export default Dropdown;
