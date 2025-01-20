import React from "react";
import { AuthorizedLayoutRoot } from "../AuthorizedLayoutRoot/AuthorizedLayoutRoot";
import { AuthorizedLayoutHeader } from "../AuthorizedLayoutHeader/AuthorizedLayoutHeader";
import { AuthorizedLayoutBody } from "../AuthorizedLayoutBody/AuthorizedLayoutBody";
import { AuthorizedLayoutFooter } from "../AuthorizedLayoutFooter/AuthorizedLayoutFooter";

interface AuthorizedPageLayoutInterface {
  children: React.ReactNode;
  activePage: string;
}
export const AuthorizedPageLayout: React.FunctionComponent<
  AuthorizedPageLayoutInterface
> = ({ children, activePage }) => {
  const navigationItems = [
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
        activePage={activePage}
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
