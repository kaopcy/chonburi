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
            className={`relative flex  justify-center rounded-none  pb-2 pt-3 transition-all container-type-size  md:w-full md:justify-end md:pr-4  ${
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
            >
                <div className="absolute -top-2 right-0 h-3 w-3 rounded-full bg-red-400"></div>
            </Icon>
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

const Icon = ({ icon, text, isOpen, setIsOpen, children }) => {
    const { setSelectedMode, selectedMode } = useSelectorContext();
    return (
        <div
            id={text}
            className={`relative  mx-3 flex  cursor-pointer  flex-col items-center px-1  text-text-lightest  md:mx-2 ${
                selectedMode === text && "!text-primary "
            }`}
            onClick={() => {
                if (selectedMode === text) setIsOpen(true);
                setSelectedMode(text);
            }}
        >
            {children}
            <FontAwesomeIcon
                icon={icon}
                className={`mb-1 text-xl md:text-3xl ${
                    !isOpen && "mb-0 text-2xl"
                }`}
            />
            <div
                className={`whitespace-nowrap text-xs   ${
                    !isOpen && "!text-xxs font-semibold"
                }`}
            >
                {text}
            </div>
        </div>
    );
};

export default Selector;
