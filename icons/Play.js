const SvgPlay = (props) => (
    <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 370 370"
        style={{
            fill: "none",
            stroke: props.stroke || "#4d4d4d",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 10,
            strokeWidth: 31,
        }}
    >
        <circle cx={185} cy={185} r={169.5} />
        <path
            style={{ fill: props.stroke || "#4d4d4d" }}
            d="M205.5 187.5v129l106-65Z"
            transform="translate(-61 -67)"
        />
    </svg>
);

export default SvgPlay;
