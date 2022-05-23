import { faPoundSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { poiType } from "../../generalConfig";
const PoiDropdown = () => {
    return (
        <div className="invisible absolute top-full flex flex-col rounded-md  border bg-white py-4  opacity-0 shadow-md transition-opacity group-hover:visible group-hover:opacity-100">
            {poiType.map((poi) => (
                <div className="flex h-10 cursor-pointer items-center  px-6 font-normal hover:bg-gray-50">
                    <div className="flex w-10 justify-start">
                        <FontAwesomeIcon icon={poi.icon} className="" />
                    </div>
                    <div className="">{poi.name}</div>
                </div>
            ))}
        </div>
    );
};

export default PoiDropdown;
