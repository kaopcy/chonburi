import React, { useMemo, useRef, forwardRef, useState } from "react";
import Image from "next/image";
import { OverlayView } from "@react-google-maps/api";
import gsap from "gsap/dist/gsap";

// import contexts
import { usePostContext } from "../../../context/Travel/PostContext";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faStar,
    faStarHalfStroke,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const DestinationOverlay = () => {
    const { post } = usePostContext();

    const titleRef = useRef();
    const starRef = useRef();
    const locationRef = useRef();
    const distanceRef = useRef();
    const containerRef = useRef();

    const [isOpen, setIsOpen] = useState(true);

    const isStart = useRef(false);
    useEffect(() => {
        if (!isStart.current) return;
        if (isOpen) onLoad();
    }, [isOpen]);

    const onLoad = () => {
        isStart.current = true;
        gsap.timeline()
            .from(titleRef.current, {
                yPercent: -100,
                ease: "elastic.out(2,1)",
                duration: 1,
            })
            .from(titleRef.current, { opacity: 0 }, "<")
            .from(
                starRef.current,
                {
                    width: 0,
                    ease: "elastic.out(1.4,1)",
                    duration: 1.45,
                },
                "<"
            )

            .from(
                locationRef.current,
                {
                    yPercent: -100,
                    ease: "elastic.out(2,1)",
                    duration: 1,
                },
                "<0.1"
            )
            .from(
                distanceRef.current,
                {
                    width: 0,
                    ease: "elastic.out(1.4,1)",
                    paddingLeft: 0,
                    paddingRight: 0,
                    duration: 1.45,
                },
                "<0.1"
            );
    };

    return (
        <OverlayView
            onLoad={onLoad}
            position={post.coords}
            mapPaneName={OverlayView.FLOAT_PANE}
        >
            <div
                ref={containerRef}
                className={` relative  -translate-x-1/2 translate-y-2 ${
                    isOpen && "w-[280px]"
                }`}
            >
                <div className="new-triangle relative bottom-full left-1/2 h-3 w-3 -translate-x-1/2"></div>
                <div
                    className={`relative w-full rounded-xl bg-[#ffffff77]  font-sarabun text-base shadow-lg ${
                        isOpen ? "p-2" : "p-1"
                    }`}
                >
                    <div
                        className={`flex w-full flex-col  rounded-xl bg-white ${
                            isOpen ? "p-3" : "px-2 py-1 border-2 border-primary "
                        }`}
                    >
                        <div
                            onClick={() => setIsOpen(true)}
                            className={` self-center text-text ${
                                isOpen && "mb-3"
                            }`}
                        >
                            จุดหมาย
                        </div>
                        {isOpen && (
                            <>
                                <FontAwesomeIcon
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-6 right-6 text-red-500"
                                    icon={faXmark}
                                />
                                <div className="relative mb-3 aspect-[13/9] w-full overflow-hidden rounded-xl">
                                    <Image
                                        layout="fill"
                                        objectFit="cover"
                                        alt={post.title}
                                        quality="low"
                                        blurDataURL="URL"
                                        placeholder="blur"
                                        src={post.imageURL[0].url}
                                        className=""
                                    />
                                </div>
                                <div className="mb-2 flex w-full justify-between">
                                    <Star star={post.star} ref={starRef} />
                                    <Distance ref={distanceRef} />
                                </div>
                                <div
                                    ref={titleRef}
                                    className="break-words text-base font-bold text-text"
                                >
                                    {post.title}
                                </div>
                                <div
                                    ref={locationRef}
                                    className="text-xs text-text-lighterr"
                                >
                                    อ.{post.amphoe.name} ต.{post.tambon.name}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </OverlayView>
    );
};

const Star = forwardRef(({ star }, ref) => {
    const fullStar = useMemo(() => Math.floor(star));
    const isHalf = useMemo(
        () => ((star - Math.floor(star)) * 10).toFixed() > 4
    );

    return (
        <div
            ref={ref}
            className="flex items-center justify-end self-start overflow-hidden rounded-md  bg-[#F5F9FF] px-2 py-0"
        >
            <div className="mr-2 text-xs font-light text-text">{star}</div>
            {[...Array(fullStar)].map((_, index) => (
                <FontAwesomeIcon
                    className="mr-[2px] text-xs text-primary"
                    icon={faStar}
                    key={index + "-star"}
                />
            ))}
            {isHalf && (
                <FontAwesomeIcon
                    className="mr-[2px] text-xs text-primary"
                    icon={faStarHalfStroke}
                />
            )}
        </div>
    );
});

const Distance = forwardRef((_, ref) => {
    return (
        <div
            ref={ref}
            className="flex items-center self-start overflow-hidden whitespace-nowrap rounded-md bg-[#FFF5F5] px-2 py-0"
        >
            <div className="mr-2 text-xs font-light text-text">ห่าง 80 กม.</div>
            <FontAwesomeIcon
                className="text-xs text-red-500"
                icon={faLocationDot}
            />
        </div>
    );
});

export default DestinationOverlay;
