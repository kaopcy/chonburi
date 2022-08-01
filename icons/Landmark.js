import * as React from "react";

const SvgLandmark = (props) => (
  <svg
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 348 348.5"
    {...props}
  >
    <path
      style={{
        fill: "#fff",
        stroke: "#000",
        strokeLinecap: "round",
        strokeMiterlimit: 10,
        strokeWidth: 31,
      }}
      d="M15.5 333h317M36.5 278.152h272"
    />
    <path
      style={{
        fill: "#fff",
        stroke: "#000",
        strokeMiterlimit: 10,
        strokeWidth: 31,
      }}
      d="M58 152.5v124M136 153v124M210 153v124M288 153v124"
    />
    <path
      d="m248.5 83.5-147 81c-7.69 4.417-10.116 11.54-8 15 1.876 3.067 7.174 3.018 8 3h294c1.404.179 7.192.799 9-2 1.987-3.076-1.008-10.012-9-16Z"
      transform="translate(-74.5 -68)"
      style={{
        fill: "#fff",
        stroke: "#000",
        strokeLinejoin: "round",
        strokeWidth: 31,
      }}
    />
  </svg>
);

export default SvgLandmark;
