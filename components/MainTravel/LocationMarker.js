import { useMemo, useEffect, useRef, forwardRef } from "react";

import Image from "next/image";
import { OverlayView } from "@react-google-maps/api";

// import icons
import SvgPlay from "../../icons/Play";
import SvgFlag from "../../icons/Flag";

import SvgCar from "../../icons/Car";
import SvgUtensil from "../../icons/Utensil";

const TripMarker = forwardRef(({ position, onClick, post }, ref) => {
    const markerRef = useRef();

    const onLoad = () => {
        const markerH = markerRef.current.clientHeight;
        markerRef.current.style.top = `-${markerH}px`;
    };

    return (
        <OverlayView
            onLoad={onLoad}
            position={position}
            mapPaneName={OverlayView.FLOAT_PANE}
        >
            <div
                onClick={() => onClick(post.slug.current)}
                ref={markerRef}
                className="relative -left-1/2 -top-10 origin-center transition-transform hover:scale-110"
            >
                <div
                    className={`flex-cen z-10 relative max-w-[150px] shrink-0 overflow-hidden  rounded-full bg-black px-1 py-1 pr-2  opacity-80 `}
                >
                    {/* {isTravel ? (
                        <div
                            className={`mr-2 aspect-square w-6 shrink-0 rounded-full bg-red-500 p-1  pt-[5px] `}
                        >
                            <SvgCar stroke="#fff" />
                        </div>
                    ) : ( */}
                    <div
                        className={`relative mr-2 aspect-square w-6 shrink-0 overflow-hidden rounded-full  bg-red-500 p-[6px]`}
                    >
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
                    {/* )} */}
                    <div className="ellipsis font-extralight text-white">
                        {post.title}
                    </div>
                </div>
                <div className="new-triangle-sm relative left-1/2  -translate-x-1/2 rotate-180"></div>
                <div className="relative -mt-1 left-1/2 z-[-1] h-2 w-3 -translate-x-1/2 rounded-[50%] border-2 bg-red-400  "></div>
            </div>
        </OverlayView>
    );
});

export default TripMarker;
