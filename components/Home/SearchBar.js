import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
    return (
        <div className=" mx-auto flex h-[50px] w-full max-w-[800px]  items-center rounded-full bg-white px-3 py-3 shadow-xl md:h-[70px] md:px-6 md:py-4">
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="mr-3 text-xl text-text md:mr-5 md:text-4xl"
            />
            <div className="mr-3 h-full w-[3px] bg-text-lightest md:mr-5"></div>
            <input
                type="text"
                className="h-full w-full border-none text-lg text-text outline-none placeholder:text-text-lightest md:text-xl "
                placeholder="ค้นหาในชลบุรี . . ."
            />
        </div>
    );
};

export default SearchBar;