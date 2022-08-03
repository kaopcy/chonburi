const SvgFlag = (props) => (
    <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 356.5 358"
        style={{
            fill: "none",
            stroke: props.stroke || "#4d4d4d",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 10,
            strokeWidth: 31,
        }}
        {...props}
    >
        <path d="M15.5 15.5v327" />
        <path
            d="M98.5 134.5a210.956 210.956 0 0 1 80-28 208.762 208.762 0 0 1 55 0 112.585 112.585 0 0 1 17 2c14.864 2.91 23.544 7.754 32 11 9.173 3.522 22.901 7.012 42 6a285.637 285.637 0 0 0 35-4 286.948 286.948 0 0 0 61-18v219a186.4 186.4 0 0 1-135 7 234.258 234.258 0 0 0-89-13 247.792 247.792 0 0 0-46.14 6.349A214.147 214.147 0 0 0 96.5 344.5"
            transform="translate(-79.5 -84.5)"
        />
    </svg>
);

export default SvgFlag;
