import {
    faMountain,
    faUtensils,
    faHouseChimney,
} from "@fortawesome/free-solid-svg-icons";

import { poiType } from "./poiType";
import { restaurantType } from "./restaurantType";

export const navItems = [
    {
        name: "หน้าแรก",
        to: "/",
        icon: faHouseChimney,
    },
    {
        name: "แหล่งท่องเที่ยว",
        to: "/travel",
        icon: faMountain,
        children: poiType,
    },
    {
        name: "ร้านอาหาร & คาเฟ่",
        to: "/restaurant",
        icon: faUtensils,
        children: restaurantType,
    },
];
