import React from "react";
import { AuthorizedLayoutRoot } from "../AuthorizedLayoutRoot/AuthorizedLayoutRoot";
import { AuthorizedLayoutHeader } from "../AuthorizedLayoutHeader/AuthorizedLayoutHeader";
import { AuthorizedLayoutBody } from "../AuthorizedLayoutBody/AuthorizedLayoutBody";
import { Outlet } from "@remix-run/react";
import { AuthorizedLayoutFooter } from "../AuthorizedLayoutFooter/AuthorizedLayoutFooter";
import { Icon } from "~/components/Icon/Icon";
export const AuthorizedPageLayout: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const navigationItems = [
    {
      label: "Overview",
      href: "/overview",
    },
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "Categories",
      href: "/categories",
    },
    {
      label: "Super deals",
      href: "/super-deals",
    },
    {
      label: "Contacts",
      href: "/contacts",
    },
  ];
  return (
    <AuthorizedLayoutRoot>
      <AuthorizedLayoutHeader
        navigationItems={navigationItems}
      ></AuthorizedLayoutHeader>

      {/* TODO Implement 'Back' button */}

      {/* <button
        type="button"
        className="default-focus-ring mr-6 rounded disabled:cursor-not-allowed"
      >
        <div className="flex">
          <Icon.ArrowLeft className="h-6 w-6 text-gray-800" />
          <p>Back</p>
        </div>
      </button> */}
      <AuthorizedLayoutBody>{children}</AuthorizedLayoutBody>
      <AuthorizedLayoutFooter />
    </AuthorizedLayoutRoot>
  );
};
