import * as React from "react";

const SvgMuseum = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    style={{
      enableBackground: "new 0 0 20 20",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path
      style={{
        fill: "none",
        stroke: "#000",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 10,
      }}
      d="m9.904 1.33-8 5h16zM7.904 8.33v4.947M11.277 8.33v4.947M1.904 18.33h16l-2-3h-12zM4.484 8.362v4.947M15.101 8.394v4.946"
    />
  </svg>
);

export default SvgMuseum;
