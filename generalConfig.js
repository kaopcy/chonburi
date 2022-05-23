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
        icon: faMuseum,
    },
    {
        name: "ธรรมชาติ",
        icon: faTree,
    },
    {
        name: "วัฒนธรรม",
        icon: faVihara,
    },
    {
        name: "เชิงนิเวศ",
        icon: faLeaf,
    },
];

export const restaurantType = [
    { name: "ร้านอาหาร", icon: faUtensils },
    { name: "คาเฟ่", icon: faCake },
    { name: "บาร์", icon: faBeerMugEmpty },
    { name: "ร้านกาแฟ", icon: faMugHot },
];
