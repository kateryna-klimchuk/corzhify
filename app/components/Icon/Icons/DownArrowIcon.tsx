import React from "react";
import { IconType } from "../IconType";

export const DownArrowIcon: React.FunctionComponent<IconType> = (props) => (
  <svg
    {...props}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.46834 6.19498C4.72856 5.93291 5.15219 5.93216 5.41334 6.19331L7.29289 8.07286C7.68342 8.46339 8.31658 8.46339 8.70711 8.07286L10.5867 6.19331C10.8478 5.93216 11.2714 5.93291 11.5317 6.19498C11.7906 6.45574 11.7898 6.8768 11.53 7.13664L8.70711 9.95953C8.31658 10.3501 7.68342 10.3501 7.29289 9.95953L4.47 7.13664C4.21016 6.8768 4.20942 6.45574 4.46834 6.19498Z"
      fill="currentColor"
    />
  </svg>
);
