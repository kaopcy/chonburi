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

export const getTypeProperties = (locationType) => {
    const [name, color] = locationType.split("#");

    const icon = {
        ประวัติศาสตร์: faMuseum,
        ธรรมชาติ: faTree,
        วัฒนธรรม: faVihara,
        เชิงนิเวศ: faLeaf,
    };

    return {
        icon: icon[name],
        name,
        color: `#${color}`,
    };
};

export const getRestaurantTypeProperties = (locationType) => {
    const [name, color] = locationType.split("#");

    const icon = {
        ร้านอาหาร: faUtensils,
        คาเฟ่: faCake,
        บาร์: faBeerMugEmpty,
        ร้านกาแฟ: faMugHot,
        ประวัติศาสตร์: faMuseum,
        ธรรมชาติ: faTree,
        วัฒนธรรม: faVihara,
        เชิงนิเวศ: faLeaf,
    };

    return {
        icon: icon[name],
        name,
        color: `#${color}`,
    };
};
