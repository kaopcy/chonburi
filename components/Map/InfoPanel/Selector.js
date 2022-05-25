import React from "react";

// import icons
import { faRoute } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Selector = ({ setSelect, select }) => {
    return (
        <div className="flex items-center justify-center  space-x-6 font-normal text-text ">
            <div
                onClick={() => setSelect("เส้นทาง")}
                className={`relative flex cursor-pointer flex-col items-center px-1 py-3 text-zinc-400
                ${select === "เส้นทาง" && "!text-text"}
                `}
            >
                <FontAwesomeIcon className="text-lg " icon={faRoute} />
                <div className="text-sm whitespace-nowrap font-light">เส้นทาง</div>
                <div
                    className={`duration-700 absolute bottom-0 left-0 h-[2px] w-full origin-right scale-x-0 bg-text transition-transform ${
                        select === "เส้นทาง" && "scale-x-100"
                    }`}
                ></div>
            </div>
            <div
                onClick={() => setSelect("รายละเอียด")}
                className={`relative flex cursor-pointer flex-col items-center px-1 py-3 text-zinc-400
                ${select === "รายละเอียด" && "!text-text"}
                `}
            >
                <FontAwesomeIcon className="text-lg " icon={faNewspaper} />
                <div className="text-sm whitespace-nowrap font-light">รายละเอียด</div>
                <div
                    className={`duration-700 absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-text transition-transform ${
                        select === "รายละเอียด" && "scale-x-100"
                    }`}
                ></div>
            </div>
        </div>
    );
};

export default Selector;
