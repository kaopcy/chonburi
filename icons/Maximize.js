const SvgMaximize = (props) => (
    <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 353.5 353.5"
        style={{
            fill: "none",
            stroke: props.stroke || "#4d4d4d",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: props.strokeWidth || 31,
        }}
    >
        <path d="M15.5 132.5v-117h115M338 133V16H223M15.5 221v117h115M338 220.5v117H223M20 19l314 316M333.5 18.5l-314 316" />
    </svg>
);

export default SvgMaximize;
