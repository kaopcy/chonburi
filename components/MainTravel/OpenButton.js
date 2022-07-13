import React, { useEffect } from "react";
import gsap from "gsap/dist/gsap";

// import contexts
import { useMapContext } from "../../context/MainTravel/MapContext";
import { usePostsContext } from "../../context/MainTravel/PostContext";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { useRef } from "react";

const OpenButton = () => {
    const { isOpen, setIsOpen } = useMapContext();
    const { activeAmphoe, postByActiveAmphoe } = usePostsContext();

    const redIconRef = useRef(null);
    const buttonRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        gsap.timeline()
            .fromTo(
                redIconRef.current,
                {
                    scale: 1,
                },
                {
                    overwrite: true,
                    duration: 1,
                    scale: 2,
                    ease: "elastic.out",
                }
            )
            .fromTo(
                redIconRef.current,
                {
                    scale: 2,
                },
                {
                    overwrite: true,
                    duration: 1,
                    scale: 1,
                    ease: "elastic.out",
                }
            );
        gsap.timeline()
            .fromTo(
                buttonRef.current,
                {
                    scale: 1,
                },
                {
                    overwrite: true,
                    duration: 1,
                    scale: 1.2,
                    ease: "elastic.out",
                }
            )
            .fromTo(
                buttonRef.current,
                {
                    scale: 1.2,
                },
                {
                    overwrite: true,
                    duration: 1,
                    scale: 1,
                    ease: "elastic.out",
                }
            );
        gsap.timeline()
            .fromTo(
                textRef.current,
                {
                    yPercent: 0,
                },
                {
                    overwrite: true,
                    duration: 1,
                    yPercent: -130,
                    ease: "elastic.out",
                }
            )
            .fromTo(
                textRef.current,
                {
                    yPercent: -130,
                },
                {
                    delay: 0.4,
                    duration: 1,
                    yPercent: 0,
                    ease: "power1.inOut",
                }
            )
            .fromTo(
                textRef.current,
                {
                    opacity: 1,
                },
                {
                    duration: 0.4,
                    opacity: 0,
                    ease: "linear",
                },
                "<"
            );
    }, [activeAmphoe]);

    return (
        <div
            className={`absolute top-[80%]  right-0 z-50 flex -translate-y-1/2 scale-75 cursor-pointer flex-col items-center transition-transform duration-1000  ease-in-out sm:top-1/2 md:scale-100 ${
                isOpen ? "translate-x-[120%]" : "-translate-x-[50%]"
            }`}
            onClick={() => setIsOpen((e) => !e)}
        >
            <div
                ref={buttonRef}
                className="flex h-16 w-16 flex-col shadow-big items-center justify-center rounded-full border-2 border-text bg-white text-text transition-colors hover:bg-text hover:text-white"
            >
                <FontAwesomeIcon
                    className="text-lg"
                    icon={isOpen ? faXmark : faMap}
                />
                <div className="">แผนที่</div>
            </div>
            <div
                ref={redIconRef}
                className="flex-cen absolute top-0 right-0 h-[15px] w-[15px] rounded-full bg-red-500 text-[9px] text-white"
            >
                {postByActiveAmphoe?.length}
            </div>
            <div ref={textRef} className="absolute bg-white px-2 border-2 py-1 rounded-lg text-xs  shadow-blue">
                {activeAmphoe}
            </div>
        </div>
    );
};

export default OpenButton;
