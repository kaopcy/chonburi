import * as React from "react";

const Book = (props) => (
    <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 347.33471 397.00205"
        style={{
            fill: "none",
            stroke: props.stroke || "#4d4d4d",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 31,
        }}
    >
        <title>{"book"}</title>
        <path
            d="M86.5,395.5c.19686-3.3396,1.50349-19.61856,15-31a42.00973,42.00973,0,0,1,19-9h280v-246a27.99244,27.99244,0,0,0-23-31h-249a43.39945,43.39945,0,0,0-28,10c-13.091,11.02762-14.735,26.02676-15,29v266c-.50526,4.77771-2.30883,26.73245,13,45a57.27951,57.27951,0,0,0,22,16h281"
            transform="translate(-69.66529 -62.99795)"
        />
        <line x1={305.83471} y1={293.50205} x2={305.83471} y2={379.50205} />
        <line x1={116.83471} y1={103.50205} x2={257.83471} y2={103.50205} />
        <line x1={116.83471} y1={167.50205} x2={257.83471} y2={167.50205} />
    </svg>
);

export default Book;
