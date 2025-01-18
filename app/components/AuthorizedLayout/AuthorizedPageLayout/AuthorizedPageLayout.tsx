import React from "react";
import { AuthorizedLayoutRoot } from "../AuthorizedLayoutRoot/AuthorizedLayoutRoot";
import { AuthorizedLayoutHeader } from "../AuthorizedLayoutHeader/AuthorizedLayoutHeader";
import { AuthorizedLayoutBody } from "../AuthorizedLayoutBody/AuthorizedLayoutBody";
import { Outlet } from "@remix-run/react";
import { AuthorizedLayoutFooter } from "../AuthorizedLayoutFooter/AuthorizedLayoutFooter";
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
      <AuthorizedLayoutBody>{children}</AuthorizedLayoutBody>
      <AuthorizedLayoutFooter />
    </AuthorizedLayoutRoot>
  );
};
