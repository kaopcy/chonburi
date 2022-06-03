import React, { useState } from "react";
import { useRouter } from "next/router";
// import components
import RouteDisplay from "./RouteDisplay";
import DetailDisplay from "./DetailDisplay";
import Selector from "./Selector";

// import hooks
import { useDirectionContext } from "../../../context/DirectionContext";
import { usePost } from "../../../context/PostContext";

import { useSelect } from "../../../context/SelectContext";
// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const InfoPanel = ({
    isDisplayRoute,
    setIsDisplayRoute,
    userLocationError,
}) => {
    const router = useRouter();
    const { post } = usePost();
    const { direction, setDirection } = useDirectionContext();

    const { select } = useSelect();

    return (
        <div
            className={`fixed bottom-0 right-0 h-[calc(100vh-250px)] w-full font-light text-text shadow-lg transition-transform duration-300 sm:absolute  sm:h-[calc(100vh-120px)] sm:max-w-[600px] sm:w-1/2   sm:duration-500 ${
                isDisplayRoute
                    ? " translate-y-0 sm:translate-x-0 "
                    : " translate-y-full sm:translate-y-0 sm:translate-x-full "
            }`}
        >
            <div className="flex h-full w-full shrink-0 flex-col overflow-hidden bg-white">
                <div className="flex w-full items-center justify-end px-4">
                    {/* <div className=" ellipsis  whitespace-nowrap text-2xl  text-text font-bold">
                        {router.query.slug}
                    </div> */}
                    <Selector />
                </div>
                <div
                    className={`flex h-full w-full   sm:transition-transform sm:duration-700  ${
                        select === "เส้นทาง" && "!-translate-x-full "
                    }    ${select === "สถานที่อื่นๆ" && "-translate-x-[200%] "}
                    `}
                >
                    {direction && <DetailDisplay />}

                    {direction && (
                        <RouteDisplay
                            userLocationError={userLocationError}
                            routes={direction?.routes[0].legs[0]}
                            endPoint={router.query.slug}
                        />
                    )}

                    {direction && <DetailDisplay />}
                </div>

                {/* hide n show button */}
                <div
                    className="flex-col-cen absolute bottom-full left-0  h-12 w-full rounded-t-3xl  border  bg-white   sm:left-0 sm:top-1/2 sm:hidden"
                    onClick={() => setIsDisplayRoute((e) => !e)}
                >
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`rotate-180 text-text-lightest transition-transform duration-700  ${
                            isDisplayRoute && "rotate-0"
                        }`}
                    />
                </div>

                {/* hide n show button */}
                <div
                    className="flex-col-cen absolute  top-1/2 right-full hidden h-10 w-10 rounded-l-xl border bg-white sm:flex"
                    onClick={() => setIsDisplayRoute((e) => !e)}
                >
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className={`rotate-180 text-text transition-transform duration-700  ${
                            isDisplayRoute && "rotate-0"
                        }`}
                    />
                </div>
            </div>
        </div>
    );
};

export default InfoPanel;
