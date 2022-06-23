import React, { useRef, useEffect } from "react";

// import configs
import { urlFor } from "../../lib/sanity";
import {
    TRAVEL_MODE,
    DIRECTION_MODE,
    OTHERPLACE_MODE,
} from "../../config/selectorConstant";

// import icons
import { faMountainCity, faRoute } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import contexts
import { useSelectorContext } from "../../context/Travel/SelectorContext";

const Selector = ({ setIsOpen, isOpen }) => {
    const containerRef = useRef(null);
    return (
        <div
            className={`relative flex  justify-center rounded-none bg-white  pt-3 pb-1 transition-all container-type-size md:w-full  md:justify-end ${
                !isOpen && "w-[300px] self-center !rounded-full shadow-big"
            }`}
            ref={containerRef}
        >
            <Icon
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                icon={faNewspaper}
                text={TRAVEL_MODE}
            />
            <Icon
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                icon={faMountainCity}
                text={OTHERPLACE_MODE}
            />
            <Icon
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                icon={faRoute}
                text={DIRECTION_MODE}
            />
            <Highlighter isOpen={isOpen} containerRef={containerRef} />
        </div>
    );
};

const Highlighter = ({ containerRef, isOpen }) => {
    const { selectedMode } = useSelectorContext();
    const elRef = useRef(null);
    useEffect(() => {
        const calPost = () => {
            if (!elRef.current || !containerRef.current) return;

            const modeRef = document.getElementById(selectedMode);
            const { clientWidth: modeWidth, offsetLeft: modeOffset } = modeRef;
            elRef.current.style.width = `${modeWidth}px`;
            elRef.current.style.left = `${modeOffset}px`;
        };
        calPost();
        window.addEventListener("resize", calPost);

        return () => {
            window.removeEventListener("resize", calPost);
        };
    }, [selectedMode]);
    return !isOpen ? null : (
        <div
            ref={elRef}
            className="absolute bottom-0 mt-3 h-[2px] translate-y-full bg-primary  transition-all md:h-[3px]"
        >
            <div className="gradient-blue absolute bottom-0 h-[10px] w-full"></div>
        </div>
    );
};

const Icon = ({ icon, text, isOpen, setIsOpen }) => {
    const { setSelectedMode, selectedMode } = useSelectorContext();
    return (
        <div
            id={text}
            className={`relative  mx-3 flex  cursor-pointer  flex-col items-center px-3 text-text-lightest cq-w-4:bg-blue-500 md:mx-0 md:ml-10 ${
                selectedMode === text && "!text-primary "
            }`}
            onClick={() => {
                if (selectedMode === text) setIsOpen(true);
                setSelectedMode(text);
            }}
        >
            <FontAwesomeIcon
                icon={icon}
                className={`mb-1 text-xl md:text-4xl ${
                    !isOpen && "mb-0 text-2xl"
                }`}
            />
            <div
                className={`whitespace-nowrap text-sm md:!text-base  ${
                    !isOpen && "!text-xxs font-semibold"
                }`}
            >
                {text}
            </div>
            {/* {selectedMode === text && (
                <div className="absolute bottom-0 mt-3 h-[3px] w-full translate-y-full  bg-text"></div>
            )} */}
        </div>
    );
};

export default Selector;
