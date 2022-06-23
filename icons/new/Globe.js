import * as React from "react";

const SvgGlobe = (props) => (
  <svg
    id="globe_svg__Layer_2"
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
        ".globe_svg__st0{fill:none;stroke:#000;stroke-width:1.5;stroke-miterlimit:10}"
      }
    </style>
    <circle className="globe_svg__st0" cx={10.077} cy={10} r={9} />
    <ellipse className="globe_svg__st0" cx={10.077} cy={10} rx={4.5} ry={9} />
    <path
      className="globe_svg__st0"
      d="m1.923 7.117 16.308-.064M1.923 12.234l16.308-.064"
    />
  </svg>
);

export default SvgGlobe;
