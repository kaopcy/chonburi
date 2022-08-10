import React, { useMemo, useRef, forwardRef, useState } from "react";
import Image from "next/image";
import { OverlayView } from "@react-google-maps/api";
import gsap from "gsap/dist/gsap";

// import contexts
import { usePostContext } from "../../../context/Travel/PostContext";
import { useMapContext } from "../../../context/MapContext";
import { useSelectorContext } from "../../../context/Travel/SelectorContext";

// import constants
import { TRAVEL_MODE } from "../../../config/selectorConstant";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faStar,
    faStarHalfStroke,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { useEffect } from "react";

const DestinationMarker = () => {
    const { post } = usePostContext();
    const { selectedMode } = useSelectorContext();
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
        if (selectedMode !== TRAVEL_MODE) setIsOpen(false);
        else setIsOpen(true);
    }, [selectedMode]);

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
        <><OverlayView
        position={post.coords}
        mapPaneName={OverlayView.FLOAT_PANE}
    >
        <div
            className="relative transition-transform hover:scale-110 "
            onClick={() => setIsOpen(true)}
        >
            <div className="flex-cen absolute left-[-12px] top-[-8px] h-5   w-6  shrink-0 animate-gps-pulse-3-blue cursor-pointer rounded-[50%] border-[3px] border-white bg-blue-400  shadow-[0_0_0_0_rgba(0,154,255,1)]">
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
            {isOpen && (
                
                <OverlayView
                    onLoad={onLoad}
                    position={post.coords}
                    mapPaneName={OverlayView.FLOAT_PANE}
                >
                    <div
                        ref={containerRef}
                        className={` relative  w-[180px] -translate-x-1/2 translate-y-2 sm:w-[230px]`}
                    >
                        <div
                            onClick={() => setIsOpen(false)}
                            className="flex-cen absolute -top-0 -right-2 z-10 h-7 w-7 cursor-pointer rounded-full border bg-white shadow-lg hover:shadow-blue"
                        >
                            <FontAwesomeIcon
                                className="  text-red-500 text-sm"
                                icon={faXmark}
                            />
                        </div>
                        <div className="new-triangle relative bottom-full left-1/2 h-3 w-3 -translate-x-1/2 "></div>
                        <div
                            className={`relative w-full    font-sarabun text-base shadow-lg`}
                        >
                            {isOpen && (
                                <div className="relative flex w-full flex-col overflow-hidden rounded-lg">
                                    <div className="absolute inset-0 z-[-1] bg-black opacity-80"></div>
                                    <LinkToGoogleMap/>
                                    <div className="relative  h-[100px]  w-full ">
                                        <Image
                                            layout="fill"
                                            objectFit="cover"
                                            alt={post.title}
                                            quality="low"
                                            blurDataURL="URL"
                                            placeholder="blur"
                                            src={post.imageURL[0].url}
                                        />
                                    </div>
                                    <div className="flex w-full flex-col p-2">
                                        <div className="mb-2 flex w-full justify-between">
                                            <Star
                                                star={post.star}
                                                ref={starRef}
                                            />
                                            <Distance ref={distanceRef} />
                                        </div>
                                        <div
                                            ref={titleRef}
                                            className="break-words text-sm font-light text-white  sm:text-base"
                                        >
                                            {post.title}
                                        </div>
                                        <div
                                            ref={locationRef}
                                            className="text-xxs font-extralight text-text-lightest sm:text-xs"
                                        >
                                            <span className="mr-4">
                                                อ.{post.amphoe.name} 
                                            </span>
                                            ต.{post.tambon.name}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </OverlayView>
            )}
            
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
            className="flex items-center justify-end self-start overflow-hidden rounded-[3px] bg-white  px-2  py-0 text-xxs sm:text-xs"
        >
            <div className="mr-2  font-extralight text-text">{star}</div>
            <FontAwesomeIcon
                className="mr-[2px]  text-[#FFD43B]"
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
        // <div
        //     ref={ref}
        //     className="flex items-center self-start overflow-hidden whitespace-nowrap rounded-[3px] bg-red-500 px-2 py-0 text-xxs sm:text-xs"
        // >
        //     <div className="mr-2  font-extralight text-white">ห่าง 80 กม.</div>
        //     <FontAwesomeIcon className=" text-white" icon={faLocationDot} />
        // </div>
        <div
            ref={ref}
            className="flex items-center self-start overflow-hidden whitespace-nowrap rounded-[3px] bg-white px-2 py-0 text-xxs sm:text-xs"
        >
            <div className="mr-2  font-light text-text">ห่าง 80 กม.</div>
            <FontAwesomeIcon className=" text-red-500" icon={faLocationDot} />
        </div>
    );
});

const LinkToGoogleMap = ()=>{
    return (
        <div className="absolute z-20 w-5 h-5 bg-white rounded-full flex-cen top-2 left-2 cursor-pointer">
            <FontAwesomeIcon className="text-xs" icon={faMap} />
        </div>
    )

}

export default DestinationMarker;
