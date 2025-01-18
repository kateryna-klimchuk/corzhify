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
    <div className="p-1 px-2 flex gap-2 justify-start items-center rounded">
      <nav>
        <ul className="flex gap-3 px-2 py-1">
          {items.map((item) => {
            return (
              <>
                {item.isActive ? (
                  <NavLink
                    className="bg-orange-200 px-2 border rounded cursor-pointer"
                    to={item.href}
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <NavLink
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
    </div>
  );
};
