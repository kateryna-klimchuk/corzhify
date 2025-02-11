import React from "react";
import { AuthorizedLayoutRoot } from "../AuthorizedLayoutRoot/AuthorizedLayoutRoot";
import { AuthorizedLayoutHeader } from "../AuthorizedLayoutHeader/AuthorizedLayoutHeader";
import { AuthorizedLayoutBody } from "../AuthorizedLayoutBody/AuthorizedLayoutBody";
import { AuthorizedLayoutFooter } from "../AuthorizedLayoutFooter/AuthorizedLayoutFooter";
import { Icon } from "~/components/Icon/Icon";

interface AuthorizedPageLayoutInterface {
  children: React.ReactNode;
  activePage: string;
  backButton?: { onClick: () => void };
  subTitle?: string;
  cartAmount?: number;
}
export const AuthorizedPageLayout: React.FunctionComponent<
  AuthorizedPageLayoutInterface
> = ({ children, activePage, backButton, subTitle, cartAmount }) => {
  const navigationItems = [
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "Categories",
      href: "/categories",
    },

    // TODO: Add more tabs

    // {
    //   label: "Super deals",
    //   href: "/super-deals",
    // },
    // {
    //   label: "Contacts",
    //   href: "/contacts",
    // },
  ];
  return (
    <AuthorizedLayoutRoot>
      <AuthorizedLayoutHeader
        navigationItems={navigationItems}
        activePage={activePage}
        cartAmount={cartAmount}
      ></AuthorizedLayoutHeader>
      {backButton && (
        <div className="border-b pt-[84px] py-2 px-4 flex gap-4 items-center">
          <button
            type="button"
            className="default-focus-ring rounded disabled:cursor-not-allowed flex border rounder pl-2 py-1 pr-3 hover:bg-white transition-all"
            onClick={backButton.onClick}
          >
            <Icon.ArrowLeft className="h-6 w-6 text-gray-800" />
            <p>Back</p>
          </button>
          {subTitle && <p>{subTitle}</p>}
        </div>
      )}
      <AuthorizedLayoutBody>{children}</AuthorizedLayoutBody>
      <AuthorizedLayoutFooter />
    </AuthorizedLayoutRoot>
  );
};
