import React from "react";

// import contexts
import { useMapContext } from "../../context/MainTravel/MapContext";

// import hooks
import useIsTouchDevice from "../../composables/useIsTouchDevice";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons";

const OpenButton = () => {
    const { isOpen, setIsOpen } = useMapContext();
    const isTouch = useIsTouchDevice();
    return (
        <div
            className={`absolute top-[80%] right-0 z-50 flex -translate-y-1/2 scale-75 cursor-pointer flex-col items-center transition-transform duration-1000  ease-in-out sm:top-1/2 md:scale-100 ${
                isOpen ? "translate-x-[120%]" : "-translate-x-[50%]"
            }`}
            onClick={() => setIsOpen((e) => !e)}
        >
            <div className="flex-cen absolute top-0 right-0 h-[15px] w-[15px] rounded-full bg-red-500 text-[9px] text-white">
                5
            </div>
            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-text bg-white text-text transition-colors hover:bg-text hover:text-white">
                <FontAwesomeIcon
                    className="text-lg"
                    icon={isOpen ? faXmark : faMap}
                />
                <div className="">แผนที่</div>
            </div>
            <div className="mt-1 h-[6px]  w-[6px] rounded-full border-2 border-text-lighterr"></div>
            <div className="mt-1 h-[6px]  w-[6px] rounded-full border-2 border-text-lighterr"></div>
            <div className="mt-1 h-[6px]  w-[6px] rounded-full border-2 border-text-lighterr"></div>
        </div>
    );
};

export default OpenButton;
