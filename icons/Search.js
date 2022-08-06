import * as React from "react";

const SvgComponent = (props) => (
    <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 364.34167 362.5"
        style={{
            fill: "none",
            stroke: props.stroke || "#4d4d4d",
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth:   31,
        }}
    >
        <title>{"search"}</title>
        <circle cx={147.17917} cy={147.17917} r={131.67917} />
        <line x1={348.84167} y1={347} x2={241.57555} y2={239.73388} />
    </svg>
);

export default SvgComponent;
