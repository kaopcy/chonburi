import { useMemo, useEffect, useRef } from "react";
import { OverlayView } from "@react-google-maps/api";

// import icons
import SvgPlay from "../../icons/Play";
import SvgFlag from "../../icons/Flag";

import SvgCar from "../../icons/Car";
import SvgUtensil from "../../icons/Utensil";

const TripMarker = ({ isActive, setActiveNum, coords, link, _key }) => {
    const [_, type, name] = link?.split("/");
    const isTravel = useMemo(() => type === "travel", [type]);
    console.log(isTravel);
    const markerRef = useRef();

    const onLoad = () => {
        const markerH = markerRef.current.clientHeight;
        markerRef.current.style.top = `-${markerH}px`;
    };

    return (
        <OverlayView
            onLoad={onLoad}
            position={coords}
            mapPaneName={
                isActive ? OverlayView.FLOAT_PANE : OverlayView.MARKER_LAYER
            }
        >
            <div
                onClick={() => setActiveNum(_key)}
                ref={markerRef}
                className="relative -left-1/2 -top-10 origin-center transition-transform hover:scale-110"
            >
                <div
                    className={`flex-cen relative max-w-[150px] shrink-0 overflow-hidden  rounded-full bg-black px-1 py-1 pr-2  ${
                        isActive ? "opacity-100" : "opacity-80"
                    }`}
                >
                    {isTravel ? (
                        <div
                            className={`mr-2 aspect-square w-6 shrink-0 rounded-full p-1 pt-[5px]  ${
                                isActive ? "bg-green-500" : "bg-red-500"
                            }`}
                        >
                            <SvgCar stroke="#fff" />
                        </div>
                    ) : (
                        <div
                            className={`mr-2 aspect-square w-6 shrink-0 rounded-full p-[6px]  ${
                                isActive ? "bg-green-500" : "bg-red-500"
                            }`}
                        >
                            <SvgUtensil stroke="#fff" />
                        </div>
                    )}
                    <div className="ellipsis font-extralight text-white">
                        {name}
                    </div>
                </div>
                <div className="new-triangle-sm relative left-1/2  -translate-x-1/2 rotate-180"></div>
                <div className="relative z-[-1] left-1/2 h-2 w-3 border-2 bg-white -translate-x-1/2 rounded-[50%]  "></div>
            </div>
        </OverlayView>
    );
};

export default TripMarker;
