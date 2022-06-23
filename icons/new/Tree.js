import * as React from "react";

const SvgTree = (props) => (
  <svg
    id="tree_svg__Layer_2"
    xmlns="http://www.w3.org/2000/svg"
    x={0}
    y={0}
    viewBox="0 0 20 20"
    style={{
      enableBackground: "new 0 0 20 20",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <style>
      {
        ".tree_svg__st0{fill:none;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-miterlimit:10}"
      }
    </style>
    <path
      className="tree_svg__st0"
      d="M10.016 1.056 3.891 7.181a.057.057 0 0 0 .04.098h3.142c.05 0 .076.06.04.097l-4.36 4.36a.057.057 0 0 0 .04.097h3.141c.05 0 .076.061.04.097l-4.93 4.93a.057.057 0 0 0 .041.097h17.943c.05 0 .076-.062.04-.097l-4.93-4.93a.057.057 0 0 1 .041-.097h3.141c.05 0 .076-.061.04-.097L13 7.376a.057.057 0 0 1 .04-.097h3.142c.05 0 .076-.062.04-.098l-6.125-6.125a.057.057 0 0 0-.08 0zM10.057 7.848v11.386M7.779 10.125l2.278 2.277M10.057 14.68l2.022-1.975"
    />
  </svg>
);

export default SvgTree;
