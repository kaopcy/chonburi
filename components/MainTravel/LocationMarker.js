import { forwardRef, useRef } from "react";

import { OverlayView } from "@react-google-maps/api";
import Image from "next/image";
import { useRouter } from "next/router";

// import icons

const TripMarker = forwardRef(({ position, onClick, post }, ref) => {
    const markerRef = useRef();
    const router = useRouter();

    const onLoad = () => {
        const markerH = markerRef.current?.clientHeight;
        markerRef.current.style.top = `-${markerH}px`;
        console.log(markerH);
    };

    // const onMarkerClick = () => {
    //     router.push(`${router.pathname}/${post.slug.current}`);
    // };

    return (
        <OverlayView position={position} mapPaneName={OverlayView.FLOAT_PANE}>
            <button
                type="button"
                onLoad={onLoad}
                onClick={() => onClick(post.slug.current)}
                ref={markerRef}
                className="relative -left-1/2 -top-10 origin-center transition-transform hover:scale-110"
            >
                <div className="flex-cen relative z-10 max-w-[150px] shrink-0 overflow-hidden  rounded-full bg-black px-1 py-1 pr-2  opacity-80 ">
                    {/* {isTravel ? (
                        <div
                            className={`mr-2 aspect-square w-6 shrink-0 rounded-full bg-red-500 p-1  pt-[5px] `}
                        >
                            <SvgCar stroke="#fff" />
                        </div>
                    ) : ( */}
                    <div className="relative mr-2 aspect-square w-6 shrink-0 overflow-hidden rounded-full  bg-red-500 p-[6px]">
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
                <div className="relative left-1/2 z-[-1] -mt-1 h-2 w-3 -translate-x-1/2 rounded-[50%] border-2 bg-red-400  "></div>
            </button>
        </OverlayView>
    );
});

export default TripMarker;
