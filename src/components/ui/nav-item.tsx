import type { ReactNode } from "react";
import { NavLink, type NavLinkProps } from "react-router";

interface NavItemProps extends NavLinkProps {
  icon?: ReactNode | string;
  label: string;
}

const NavItem = ({ label, icon, ...props }: NavItemProps) => (
  <NavLink {...props} className="nav-item">
    {icon &&
      (typeof icon === "string" ? (
        <span className="material-symbols-outlined">{icon}</span>
      ) : (
        <>{icon}</>
      ))}
    <span className="-mb-0.75">{label}</span>
  </NavLink>
);

export default NavItem;
