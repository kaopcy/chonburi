import React from "react";

const GlobeIcon = ({ color }) => {
    return (
        <svg
            version="1.1"
            id="Layer_2"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            stroke={color}
            viewBox="0 0 20 20"
        >
            <circle className="st0" cx="10.0771275" cy="10" r="9" />
            <ellipse className="st0" cx="10.0771275" cy="10" rx="4.5" ry="9" />
            <line
                className="st0"
                x1="1.9228723"
                y1="7.1170211"
                x2="18.2313824"
                y2="7.0531917"
            />
            <line
                className="st0"
                x1="1.9228723"
                y1="12.2340422"
                x2="18.2313824"
                y2="12.1702127"
            />
        </svg>
    );
};

export default GlobeIcon;
