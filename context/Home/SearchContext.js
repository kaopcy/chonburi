import { useMemo, createContext, useContext, useState } from "react";

const initSearchValue = {
    travels: [],
    restaurants: [],
    filteredTravels: [],
    filteredRestaurants: [],
    searchValue: "",
    setSearchValue: () => {},
};

const SearchContext = createContext(initSearchValue);

export const SearchProvider = ({ children, initTravels, initRestaurants }) => {
    const [searchValue, setSearchValue] = useState("");
    const [travels] = useState(initTravels);
    const [restaurants] = useState(initRestaurants);

    const filteredTravels = useMemo(
        () =>
            travels
                ? travels.filter((e) => e.title.includes(searchValue))
                : null,
        [travels, searchValue]
    );
    const filteredRestaurants = useMemo(
        () =>
            restaurants
                ? restaurants.filter((e) => e.title.includes(searchValue))
                : null,
        [restaurants, searchValue]
    );

    return (
        <SearchContext.Provider
            value={{
                filteredRestaurants,
                filteredTravels,
                restaurants,
                searchValue,
                setSearchValue,
                travels,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => useContext(SearchContext);
