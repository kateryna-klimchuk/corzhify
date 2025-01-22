import React from "react";
import { IconType } from "../IconType";

export const CartIcon: React.FunctionComponent<IconType> = ({
  strokeWidth = 1.6,
  ...props
}) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="9"
      cy="21"
      r="1"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    <circle
      cx="20"
      cy="21"
      r="1"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    <path
      d="M1 1H4L6.68 14.39C6.82 15.25 7.52 16 8.39 16H18.11C18.98 16 19.68 15.25 19.82 14.39L23 6H6"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
