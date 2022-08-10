import React from "react";

// import contexts
import { useMapContext } from "../../context/MainTravel/MapContext";
import { usePostsContext } from "../../context/MainTravel/PostContext";

// import icons
import { faExpand, faMaximize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SvgMaximize from "../../icons/Maximize";

const textObject = {
    south: 12.74355965840848,
    west: 100.73926851835076,
    north: 13.575307903035513,
    east: 101.89969942655388,
};

const MapControl = () => {
    const { map } = useMapContext();
    const { postByActiveAmphoe } = usePostsContext();

    const fitToBound = () => {
        if (!map) return;
        if (!postByActiveAmphoe || postByActiveAmphoe === undefined) return;
        const newBounds = new google.maps.LatLngBounds();
        postByActiveAmphoe.forEach((place) => {
            newBounds.extend({
                lat: parseFloat(place.coords.lat),
                lng: parseFloat(place.coords.lng),
            });
        });
        map.fitBounds(newBounds);
    };

    const fitToMap = () => {
        if (!map) return;
        map.fitBounds(textObject);
    };

    return (
        <div className="absolute bottom-4 right-4 flex   w-8 flex-col items-center space-y-3 sm:w-9">
            <div
                onClick={fitToMap}
                className="flex-cen group relative aspect-square w-full   cursor-pointer rounded-full  border-blue-500 bg-white text-text shadow-lg hover:shadow-blue  "
            >
                <div className="w-[14px]">
                    <SvgMaximize strokeWidth={40} />
                </div>
                <HoverOverlay text="ฟิตจังหวัดชลบุรี" />
            </div>
            <div
                onClick={fitToBound}
                className="flex-cen group relative aspect-square w-full   cursor-pointer rounded-full   border-blue-500 bg-white text-text shadow-lg hover:shadow-blue "
            >
                <FontAwesomeIcon icon={faExpand} />
                <HoverOverlay text="ฟิตสถานที่" />
            </div>
        </div>
    );
};

const HoverOverlay = ({ text }) => {
    return (
        <div className=" absolute top-1/2 right-[140%] hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-white px-3 py-1 text-xs opacity-70 shadow-lg group-hover:flex">
            <div className="absolute  top-1/2 right-0 h-2 w-2 -translate-y-1/2 translate-x-1/2  rotate-45 bg-white"></div>
            {text}
        </div>
    );
};

export default MapControl;
