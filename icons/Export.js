const SvgExport = (props) => (
    <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 352.972 354.536"
        style={{
            fill: "none",
            stroke: props.stroke || "#4d4d4d",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: props.strokeWidth || 31,
        }}
    >
        <path
            d="M212 105h-92a23.903 23.903 0 0 0-24 23v248a26.762 26.762 0 0 0 8.5 17.5A26.285 26.285 0 0 0 119 400h245a29.467 29.467 0 0 0 19.5-7.5A28.94 28.94 0 0 0 392 378v-94"
            transform="translate(-80.5 -60.964)"
        />
        <path d="m146 208.536 184.5-184.5" />
        <path
            d="M417.5 192.5v-94a18.543 18.543 0 0 0-3-15c-5.803-7.722-15.402-7.052-16-7h-98"
            transform="translate(-80.5 -60.964)"
        />
    </svg>
);

export default SvgExport;
