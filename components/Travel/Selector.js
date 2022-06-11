
import React , {  useRef , useEffect } from "react";

// import configs
import { urlFor } from '../../lib/sanity'

// import icons
import { faMountainCity, faNewspaper, faRoute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import contexts 
import { useSelectorContext } from "../../context/Travel/SelectorContext";

const Selector = ({ setIsOpen }) => {
    const containerRef = useRef(null);
    return (
        <div className="relative flex w-full justify-end" ref={containerRef} onClick={()=> setIsOpen(true)}>
            <Icon icon={faNewspaper} text="รายละเอียด" />
            <Icon icon={faMountainCity} text="สถานที่อื่นๆ" />
            <Icon icon={faRoute} text="เส้นทาง" />
            <Highlighter containerRef={containerRef} />
        </div>
    );
};

const Highlighter = ({ containerRef }) => {
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
    return (
        <div
            ref={elRef}
            className="absolute bottom-0 mt-3 h-[3px] translate-y-full  bg-text transition-all"
        ></div>
    );
};

const Icon = ({ icon, text }) => {
    const { setSelectedMode } = useSelectorContext();
    return (
        <div
            id={text}
            className="cursorpointer relative  ml-10 mb-1 flex flex-col items-center px-3 text-text"
            onClick={() => setSelectedMode(text)}
        >
            <FontAwesomeIcon icon={icon} className="mb-1 text-4xl" />
            <div className="whitespace-nowrap">{text}</div>
            {/* {selectedMode === text && (
                <div className="absolute bottom-0 mt-3 h-[3px] w-full translate-y-full  bg-text"></div>
            )} */}
        </div>
    );
};

export default Selector;
