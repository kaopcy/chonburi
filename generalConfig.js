import {
    faMuseum,
    faTree,
    faVihara,
    faLeaf,
    faUtensils,
    faBeerMugEmpty,
    faMugHot,
    faCake,
} from "@fortawesome/free-solid-svg-icons";

export const poiType = [
    {
        name: "ประวัติศาสตร์",
        color: "#FF85B3",
        icon: faMuseum,
    },
    {
        name: "ธรรมชาติ",
        color: "#6BCB77",
        icon: faTree,
    },
    {
        name: "วัฒนธรรม",
        color: "#FFD93D",
        icon: faVihara,
    },
    {
        name: "เชิงนิเวศ",
        color: "#4D96FF",
        icon: faLeaf,
    },
];

export const restaurantType = [
    { name: "ร้านอาหาร", color: "#293D7D", icon: faUtensils },
    { name: "คาเฟ่", color: "#FF4848", icon: faCake },
    { name: "บาร์", color: "#006317", icon: faBeerMugEmpty },
    { name: "ร้านกาแฟ", color: "#9D5C0D", icon: faMugHot },
];
