import React, { useMemo, useRef, useEffect } from "react";
// import dependencies
import { InfoWindow, OverlayView } from "@react-google-maps/api";
import gsap from "gsap/dist/gsap";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import hooks
import {
    useActiveDirection,
    useDirectionContext,
} from "../../../context/DirectionContext";
import { useSelectorContext } from "../../../context/Travel/SelectorContext";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const DirectionRouteMarker = () => {
    const isLoad = useRef(false);
    const { activeDirectionCoord, activeDirectionNumber } =
        useActiveDirection();
    const { shapedRoutes } = useDirectionContext();

    const route = useMemo(
        () => (shapedRoutes ? shapedRoutes[activeDirectionNumber] : null),
        [shapedRoutes, activeDirectionNumber]
    );

    useEffect(() => {
        if (!isLoad.current) return;
        gsap.set("#overlay-ref", {
            left: -(document.getElementById("overlay-ref").clientWidth / 2),
        });
    }, [activeDirectionNumber]);

    return (
        <>
            <OverlayView
                onLoad={() => {
                    isLoad.current = true;
                    gsap.set("#overlay-ref", {
                        left: -(
                            document.getElementById("overlay-ref").clientWidth /
                            2
                        ),
                    });
                }}
                position={activeDirectionCoord}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
                <div
                    id="overlay-ref"
                    className="overlay-ref absolute bottom-3 font-sarabun  shadow-lg"
                >
                    <div className="relative  z-10  flex w-[250px] flex-col rounded-2xl   bg-white px-3 py-2 text-sm  text-text opacity-100 ">
                        <div className="relative z-10  flex w-full   rounded-full  p-[7px] text-sm font-light text-text sm:text-base">
                            <div className="relative mr-3  flex self-start ">
                                <FontAwesomeIcon
                                    icon={route?.icon}
                                    className={` aspect-square shrink-0 rounded-full bg-green-500 p-2 text-white`}
                                />
                            </div>

                            <div className="flex w-full flex-wrap font-semibold text-gray-800">
                                {route?.text.replace("&nbsp;", "")}
                            </div>
                        </div>
                        <div className={` relative  w-[90%] self-end  `}>
                            - ระยะทาง: {route.distance}
                            {route.extra && (
                                <div className="">
                                    - {route.extra.replace("&nbsp;", "")}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="absolute top-full left-1/2 h-4 w-3 -translate-y-1/2 -translate-x-1/2  rotate-45 border bg-white"></div>
                </div>
            </OverlayView>
            <OverlayView
                position={activeDirectionCoord}
                mapPaneName={OverlayView.MARKER_LAYER}
            >
                <div className="radial-circle flex-cen absolute top-1/2 left-1/2 h-[40px] w-[40px] -translate-x-1/2 -translate-y-1/2 rounded-full">
                    <div className="h-[10px] w-[10px] rounded-full border-2 border-white bg-blue-600 "></div>
                </div>
            </OverlayView>
        </>
    );
};

export default DirectionRouteMarker;
