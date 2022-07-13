import React, { useMemo, useRef, forwardRef, useState } from "react";
import Image from "next/image";
import { OverlayView } from "@react-google-maps/api";
import gsap from "gsap/dist/gsap";

// import contexts
import { usePostContext } from "../../../context/Travel/PostContext";
import { useMapContext } from "../../../context/MapContext";

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
    const { map } = useMapContext();

    const titleRef = useRef();
    const starRef = useRef();
    const locationRef = useRef();
    const distanceRef = useRef();
    const containerRef = useRef();

    const [isOpen, setIsOpen] = useState(true);

    const isStart = useRef(false);

    const [isHideDetail, setIsHideDetail] = useState(false);

    useEffect(() => {
        if (!isStart.current) return;
        console.log(titleRef.current);
        console.log(starRef.current);
        console.log(locationRef.current);
        console.log(distanceRef.current);
        // if (isOpen) onLoad();
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

    useEffect(() => {
        if (!map) return;
        const listener = map.addListener("zoom_changed", () => {
            if (map.getZoom() < 10) {
                setIsHideDetail(true);
            } else {
                setIsHideDetail(false);
            }
        });
        return () => {
            google.maps.event.removeListener(listener);
        };
    }, [map]);

    return (
        <>
            {isOpen && (
                <OverlayView
                    onLoad={onLoad}
                    position={post.coords}
                    mapPaneName={OverlayView.FLOAT_PANE}
                >
                    <div
                        ref={containerRef}
                        className={` relative  -translate-x-1/2 translate-y-2 ${
                            isOpen && "w-[230px]"
                        }`}
                    >
                        <div className="new-triangle relative bottom-full left-1/2 h-3 w-3 -translate-x-1/2"></div>
                        <div
                            className={`relative w-full rounded-lg bg-[#ffffff77]  font-sarabun text-base shadow-lg ${
                                isOpen ? "p-[6px]" : "p-1"
                            }`}
                        >
                            <div
                                className={`relative flex w-full flex-col  rounded-lg bg-white ${
                                    isOpen
                                        ? "p-[6px]"
                                        : "border-2 border-primary px-2 py-1 "
                                }`}
                            >
                                {isOpen && (
                                    <>
                                        <div
                                            onClick={() => setIsOpen(false)}
                                            className="flex-cen absolute -top-2 -right-2 z-10 h-7 w-7 cursor-pointer rounded-full border bg-white shadow-lg hover:shadow-blue"
                                        >
                                            <FontAwesomeIcon
                                                className="  text-red-500 "
                                                icon={faXmark}
                                            />
                                        </div>
                                        <div className="relative mb-3 aspect-[13/7]  w-full overflow-hidden">
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
                                            <Star
                                                star={post.star}
                                                ref={starRef}
                                            />
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
                                            อ.{post.amphoe.name} ต.
                                            {post.tambon.name}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </OverlayView>
            )}
            <OverlayView
                position={post.coords}
                mapPaneName={OverlayView.FLOAT_PANE}
            >
                <div
                    className="relative transition-transform hover:scale-110 "
                    onClick={() => setIsOpen(true)}
                >
                    <div className="flex-cen absolute right-[-8px] top-[-8px]   h-5  w-6 shrink-0 animate-gps-pulse-3-blue rounded-[50%] border-[3px] border-white bg-blue-400  shadow-[0_0_0_0_rgba(0,154,255,1)]">
                        <div className="h-[5px] w-[7px]  rounded-[50%] bg-white"></div>
                        <div className="absolute bottom-1/2 h-[40px] w-[4px] rounded-full bg-text"></div>
                        <div className="flex-col-cen absolute -top-20 h-16 w-16 rounded-[50%] border-2 border-white bg-white shadow-lg">
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                className="text-base text-red-500"
                            />
                            <div className="mt-1 font-sarabun text-xs font-light text-text">
                                จุดหมาย
                            </div>
                        </div>
                    </div>
                </div>
            </OverlayView>
        </>
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
            <FontAwesomeIcon
                className="mr-[2px] text-xs text-yellow-300"
                icon={faStar}
            />
            {/* {[...Array(fullStar)].map((_, index) => (
                <FontAwesomeIcon
                    className="mr-[2px] text-xs text-yellow-300"
                    icon={faStar}
                    key={index + "-star"}
                />
            ))}
            {isHalf && (
                <FontAwesomeIcon
                    className="mr-[2px] text-xs text-yellow-300"
                    icon={faStarHalfStroke}
                />
            )} */}
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
