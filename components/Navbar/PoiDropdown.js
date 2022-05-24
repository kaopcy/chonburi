import { faPoundSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { poiType } from "../../generalConfig";
const PoiDropdown = () => {
    return (
        <div className="invisible absolute top-full flex flex-col rounded-md  border bg-white py-2  opacity-0 shadow-md transition-opacity group-hover:visible group-hover:opacity-100">
            {poiType.map((poi) => (
                <div
                    key={poi.name}
                    className="flex h-10 w-48 cursor-pointer  items-center px-3 font-normal hover:bg-gray-50"
                >
                    <div
                        className="flex-cen mr-3 aspect-square w-6 shrink-0  rounded-md"
                        style={{ backgroundColor: poi.color }}
                    >
                        <FontAwesomeIcon
                            icon={poi.icon}
                            className="text-sm text-white"
                    />
                    </div>
                    <div className="text-base">{poi.name}</div>
                </div>
            ))}
        </div>
    );
};

export default PoiDropdown;
