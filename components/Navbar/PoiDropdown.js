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
                <>
                    <div
                        key={poi.name}
                        className="flex  w-64   cursor-pointer items-center py-2 font-normal hover:bg-gray-50"
                    >
                        <div className="flex-cen mr-3 aspect-square w-10 shrink-0  rounded-md py-2 relative overflow-hidden">

                            <div className="absolute inset-0 bg-[#FAFAFA] z-0">

                            </div>
                            <FontAwesomeIcon
                                icon={poi.icon}
                                className="text-base z-10"
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
                    {index < poiType.length - 1 &&
                        <div className="h-[1px] w-full my-2  bg-slate-100"></div>

                    }
                </>
            ))}
        </div>
    );
};

export default PoiDropdown;
