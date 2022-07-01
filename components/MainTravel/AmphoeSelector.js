import React, { useState, useRef } from "react";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";

// import contexts
import { usePostsContext } from "../../context/MainTravel/PostContext";
import { useEffect } from "react";

const AmphoeSelector = () => {
    const { activeAmphoe } = usePostsContext();
    const [isOpen, setIsOpen] = useState(false);

    const inputRef = useRef(null);
    useEffect(() => {
        const evnt = (e) => {
            if (!inputRef.current.contains(e.target)) {
                setIsOpen(false);
                // alert('f')
            }
        };
        document.addEventListener("click", evnt);
        return () => {
            document.removeEventListener("click", evnt);
        };
    }, []);

    return (
        <div
            ref={inputRef}
            className={` relative flex   w-full max-w-[250px] items-center rounded-lg md:rounded-xl border-2 border-text-lighterr bg-white px-4 py-2 h-[47px] ${
                isOpen && "border-primary  shadow-blue"
            }`}
        >
            <div
                onClick={() => setIsOpen(true)}
                className={`w-full cursor-pointer bg-transparent font-semibold caret-transparent !outline-none transition-font-size ${
                    isOpen && "translate-y-1/3 text-[16px]"
                }`}
            >
                {activeAmphoe}
            </div>
            <div
                className={`absolute top-1 left-4  text-[10px] text-text-lighterr  ${
                    isOpen ? "inline" : "hidden"
                }`}
            >
                เลือกอำเภอ
            </div>
            <ChevronUpDown isOpen={isOpen} />
            {isOpen && <Dropdown setIsOpen={setIsOpen} />}
        </div>
    );
};

const ChevronUpDown = ({ isOpen }) => (
    <div className="flex-col-cen flex text-xs">
        <FontAwesomeIcon
            icon={faChevronDown}
            className={` -mb-1 rotate-180 text-text  ${isOpen && "hidden"}`}
        />
        <FontAwesomeIcon icon={faChevronDown} className=" text-text " />
    </div>
);

const Dropdown = ({ setIsOpen }) => {
    const { amphoeArr, posts, setActiveAmphoe, activeAmphoe, isScrollTo } =
        usePostsContext();
    return (
        <div className=" absolute top-[120%] left-0 z-50 flex max-h-[200px] w-full flex-col overflow-y-scroll rounded-xl bg-white px-2  py-2 shadow-lg">
            {amphoeArr.map((e, index) => (
                <div
                    onClick={() => {
                        setActiveAmphoe(e);
                        isScrollTo.current = true;
                        setIsOpen(false);
                        document
                            .getElementById(amphoeArr[index])
                            .scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                    }}
                    className={`flex w-full  min-w-0 cursor-pointer items-center justify-between rounded-lg py-2 px-2 text-sm font-light hover:bg-[#5ABDFF22] ${
                        activeAmphoe === e && "!cursor-default !bg-[#5ABDFF55]"
                    }`}
                >
                    <div className=" flex items-center text-text">
                        <span className="ellipsis mr-3">{e}</span>
                        {activeAmphoe === e && (
                            <FontAwesomeIcon
                                className="mt-[2px] text-[10px] text-primary"
                                icon={faCheck}
                            />
                        )}
                    </div>
                    <div className="text-[11px] text-text-lighterr">
                        {posts[e].length} สถานที่
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AmphoeSelector;
