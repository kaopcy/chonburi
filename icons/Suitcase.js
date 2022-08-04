const SvgSuitcase = (props) => (
    <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 347 324.5"
        style={{
            fill: "none",
            stroke: props.stroke || "#8B8B8B",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 31,
        }}
    >
        <path
            d="M126 162h267a30.135 30.135 0 0 1 18.5 10.5A29.705 29.705 0 0 1 418 189v178a24.59 24.59 0 0 1-18 23H128a31.155 31.155 0 0 1-26-22V187a27.975 27.975 0 0 1 24-25Z"
            transform="translate(-86.5 -81)"
        />
        <path d="M80 85.5v220M266 86.5v219" />
        <path
            d="M189.5 159.5v-41a20.555 20.555 0 0 1 19-22h100a22.376 22.376 0 0 1 22 20v37"
            transform="translate(-86.5 -81)"
        />
    </svg>
);

export default SvgSuitcase;
