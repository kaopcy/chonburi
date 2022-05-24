import React from "react";

// import icons
import { faPoundSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import constants
import { restaurantType } from "../../config/restaurantType";

const RestaurantType = () => {
    return (
        <div className="invisible absolute  top-full flex flex-col whitespace-nowrap rounded-md  border bg-white  py-3  opacity-0 shadow-md transition-opacity group-hover:visible group-hover:opacity-100">
            {restaurantType.map((restaurant) => (
                <div
                    key={restaurant.name}
                    className="flex h-10 w-48 cursor-pointer  items-center px-3 font-normal hover:bg-gray-50"
                >
                    <div
                        className="flex-cen mr-3 aspect-square w-6 shrink-0  rounded-md"
                        style={{ backgroundColor: restaurant.color }}
                    >
                        <FontAwesomeIcon
                            icon={restaurant.icon}
                            className="text-sm text-white"
                        />
                    </div>
                    <div className="text-base">{restaurant.name}</div>
                </div>
            ))}
        </div>
    );
};

export default RestaurantType;
