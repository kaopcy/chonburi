import React from "react";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPoundSign } from "@fortawesome/free-solid-svg-icons";
import GlobeIcon from "../../icons/GlobeIcon";
import MuseumIcon from "../../icons/MuseumIcon";
import LeafIcon from "../../icons/LeafIcon";

// import constants
import { poiType } from "../../config/poiType";

const PoiDropdown = () => {
    return (
        <div className="invisible absolute top-full flex flex-col rounded-md  border bg-white   px-4 py-3 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100">
            {poiType.map((poi, index) => (
                <div key={poi.name + index} >
                    <div className="flex  w-64   cursor-pointer items-center py-2 font-normal hover:bg-gray-50">
                        <div className="flex-cen relative mr-3 aspect-square w-10  shrink-0 overflow-hidden rounded-md py-2">
                            <div className="absolute inset-0 z-0 bg-[#FAFAFA]"></div>
                            <FontAwesomeIcon
                                icon={poi.icon}
                                className="z-10 text-base"
                                color={poi.color}
                            />
                        </div>
                        <div className="flex w-full flex-col  items-start  leading-4 ">
                            <div className="text-base font-medium  ">
                                {poi.name}
                            </div>
                            <div className="ellipsis my-0  w-44 py-0 text-xs text-text-dark">
                                {poi.description}
                            </div>
                        </div>
                    </div>
                    {index < poiType.length - 1 && (
                        <div className="my-2 h-[1px] w-full  bg-slate-100"></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PoiDropdown;
