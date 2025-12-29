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
    <nav className="w-1/2 pb-2 sm:p-1 flex flex-col sm:gap-2 sm:flex-row sm:items-center rounded" aria-label="Main navigation">
      <ul className="flex flex-col sm:flex-row gap-1 sm:gap-3">
        {items.map((item, index) => {
          const isActive = activePage.startsWith(item.href);
          return (
            <li key={index}>
              <NavLink
                className={`block px-3 sm:py-1 rounded-lg cursor-pointer transition-all duration-200 font-medium text-slate-700 dark:text-gray-100 ${
                  isActive
                    ? "bg-orange-200 dark:bg-gray-700 shadow-sm"
                    : "hover:bg-orange-200/70 dark:hover:bg-gray-700"
                }`}
                to={item.href}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
