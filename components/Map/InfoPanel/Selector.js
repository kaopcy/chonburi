import React from "react";

// import hooks
import { useSelect } from "../../../context/SelectContext";

// import icons
import { faRoute, faMountainCity } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Selector = () => {
    const { select, setSelect } = useSelect();
    return (
        <div className="relative flex items-center justify-center space-x-6 font-normal text-text lg:space-x-10 ">
            <div
                onClick={() => setSelect("รายละเอียด")}
                className={`relative z-10 flex cursor-pointer flex-col items-center px-1 py-3 text-zinc-400
                ${select === "รายละเอียด" && "!text-[#1a73e8]"}
                `}
            >
                <FontAwesomeIcon
                    className="text-lg  lg:mb-1 lg:text-2xl "
                    icon={faNewspaper}
                />
                <div className="whitespace-nowrap text-sm font-light  lg:text-base ">
                    รายละเอียด
                </div>
                <div
                    className={`absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-[#1a73e8] transition-transform duration-700 ${
                        select === "รายละเอียด" && "scale-x-100"
                    }`}
                ></div>
            </div>
            <div
                onClick={() => setSelect("เส้นทาง")}
                className={`relative z-10 flex cursor-pointer flex-col items-center px-1 py-3 text-zinc-400
                ${select === "เส้นทาง" && "!text-[#1a73e8]"}
                `}
            >
                <FontAwesomeIcon
                    className="text-lg  lg:mb-1 lg:text-2xl"
                    icon={faRoute}
                />
                <div className="whitespace-nowrap text-sm font-light  lg:text-base ">
                    เส้นทาง
                </div>
                <div
                    className={`absolute bottom-0 left-0 h-[3px] w-full origin-right scale-x-0 bg-[#1a73e8] transition-transform duration-700 ${
                        select === "เส้นทาง" && "scale-x-100"
                    }`}
                ></div>
            </div>
            <div
                onClick={() => setSelect("สถานที่อื่นๆ")}
                className={`relative z-10 flex cursor-pointer flex-col items-center px-1 py-3 text-zinc-400
                ${select === "สถานที่อื่นๆ" && "!text-[#1a73e8]"}
                `}
            >
                <FontAwesomeIcon
                    className="text-lg  lg:mb-1 lg:text-2xl"
                    icon={faMountainCity}
                />
                <div className="whitespace-nowrap text-sm font-light  lg:text-base ">
                    สถานที่อื่นๆ
                </div>
                <div
                    className={`absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-[#1a73e8] transition-transform duration-700 ${
                        select === "สถานที่อื่นๆ" && "scale-x-100"
                    }`}
                ></div>
            </div>
            <div
                className={`absolute bottom-0 left-0 z-0 h-[3px] w-full origin-left  bg-zinc-100 transition-transform duration-700`}
            ></div>
        </div>
    );
};

export default Selector;
