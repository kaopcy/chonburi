import { faPoundSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { restaurantType } from "../../generalConfig";
const RestaurantType = () => {
    return (
        <div className="invisible absolute  top-full flex flex-col whitespace-nowrap rounded-md  border bg-white  py-4  opacity-0 shadow-md transition-opacity group-hover:visible group-hover:opacity-100">
            {restaurantType.map((poi) => (
                <div className="flex h-10 w-full items-center px-6 font-normal hover:bg-gray-50 cursor-pointer">
                    <div className="flex w-10 justify-start">
                        <FontAwesomeIcon icon={poi.icon} className="" />
                    </div>
                    <div className="">{poi.name}</div>
                </div>
            ))}
        </div>
    );
};

export default RestaurantType;
