// import { Link } from "@remix-run/react";
import { NavLink } from "@remix-run/react";
import React from "react";
export interface NavigationItemInterface {
  label: string;
  href: string;
  isActive?: boolean;
}
export interface NavigationInterface {
  items: NavigationItemInterface[];
  LinkComponent?: React.ElementType<{
    to: string;
    className?: string;
    children: React.ReactNode;
  }>;
}
export const Navigation: React.FunctionComponent<NavigationInterface> = ({
  items,
}) => {
  return (
    <nav className="p-1 flex flex-col gap-2 sm:flex-row sm:items-center rounded">
      <ul className="flex flex-col gap-2 sm:flex-row sm:gap-3">
        {items.map((item, index) => {
          return (
            <>
              {item.isActive ? (
                <NavLink
                  key={index}
                  className="bg-orange-200 px-2 border rounded cursor-pointer"
                  to={item.href}
                >
                  {item.label}
                </NavLink>
              ) : (
                <NavLink
                  key={index}
                  className="px-2 rounded border hover:bg-orange-200 cursor-pointer transition-all"
                  to={item.href}
                >
                  {item.label}
                </NavLink>
              )}
            </>
          );
        })}
      </ul>
    </nav>
  );
};
