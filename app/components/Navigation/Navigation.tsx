// import { Link } from "@remix-run/react";
import { NavLink } from "@remix-run/react";
import React from "react";
export interface NavigationItemInterface {
  label: string;
  href: string;
}
export interface NavigationInterface {
  items: NavigationItemInterface[];
  activePage: string;
  LinkComponent?: React.ElementType<{
    to: string;
    className?: string;
    children: React.ReactNode;
  }>;
}
export const Navigation: React.FunctionComponent<NavigationInterface> = ({
  items,
  activePage,
}) => {
  return (
    <nav className="p-1 flex flex-col gap-2 sm:flex-row sm:items-center rounded">
      <ul className="flex flex-col gap-2 sm:flex-row sm:gap-3">
        {items.map((item, index) => {
          const isActive = activePage.startsWith(item.href);
          return (
            <>
              {isActive ? (
                <NavLink
                  key={index}
                  className="bg-orange-200 rounded px-3 cursor-pointer py-1"
                  to={item.href}
                >
                  {item.label}
                </NavLink>
              ) : (
                <NavLink
                  key={index}
                  className="px-3 hover:rounded hover:bg-orange-200 cursor-pointer transition-all py-1"
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
