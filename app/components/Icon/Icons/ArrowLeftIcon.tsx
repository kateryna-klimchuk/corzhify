import React from "react";
import { IconType } from "../IconType";

export const ArrowLeftIcon: React.FunctionComponent<IconType> = ({
  strokeWidth = 1.6,
  ...props
}) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
