import React, { useRef, useEffect } from "react";
import Link from "next/dist/client/link";

import { faChevronRight, faMountain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useDraggable from "../../../composables/useDraggable";

// import components
import PointOfInterestCard from "./Card";
import Indicator from "./Indicator";

const PointOfInterestList = ({ pointOfInterests }) => {
    const { slider: sliderRef } = useDraggable();

    const cardArrRef = useRef([]);
    const indicatorRef = useRef(null);
    const containerRef = useRef(null);

    // for indicator listener
    useEffect(() => {
        const scrollEvnt = () => {
            const firstCard = cardArrRef.current[0];
            const slider = sliderRef.current;

            const cardLength = cardArrRef.current.length ;

            const cardWidth =
                parseFloat(getComputedStyle(firstCard).width.slice(0, -2)) +
                parseFloat(
                    getComputedStyle(firstCard).marginRight.slice(0, -2)
                );
            const sliderScrollL = slider.scrollLeft;
            const containerWidth = containerRef.current.clientWidth;

            const start = Math.min(
                cardLength,
                Math.floor(sliderScrollL / cardWidth)
            );
            const end = Math.min(
                cardLength,
                Math.ceil((sliderScrollL + containerWidth) / cardWidth)
            );
            indicatorRef.current.updateScroll(start, end);
        };
        scrollEvnt();
        sliderRef.current.addEventListener("scroll", scrollEvnt);
        return () => {
            if (sliderRef.current)
                sliderRef.current.removeEventListener("scroll", scrollEvnt);
        };
    }, []);

    return (
        <div className="mx-auto mt-10 flex w-full max-w-[1300px] flex-col items-start">
            <div className="mb-0 flex w-full items-center justify-between">
                <span className="flex items-center text-lg font-semibold text-text sm:text-2xl lg:text-3xl">
                    แหล่งท่องเที่ยว
                    <FontAwesomeIcon
                        icon={faMountain}
                        className="ml-3  text-text-lightest"
                    />
                </span>
                <Link href={"/travel"} passHref>
                    <a className="cursor-pointer text-sm text-primary underline sm:text-base">
                        ดูเพิ่มเติม...
                    </a>
                </Link>
            </div>

            <div ref={containerRef} className="relative mt-8 w-full  ">
                <div className="absolute bottom-[0px] left-0 z-10 h-3 w-full  bg-white "></div>
                <div
                    className="relative flex w-full overflow-x-auto pb-5"
                    ref={sliderRef}
                >
                    {pointOfInterests?.map((restaurant, i) => {
                        return (
                            <PointOfInterestCard
                                ref={(e) => (cardArrRef.current[i] = e)}
                                post={restaurant}
                                key={restaurant.placeID}
                            />
                        );
                    })}
                    <Link href={"/travel"} passHref>
                        <div className="flex-col-cen mx-4 h-14 w-14 shrink-0 cursor-pointer self-center rounded-full border-2 hover:shadow-md">
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className="text-xl text-text-lighter  "
                            />
                        </div>
                    </Link>
                </div>
            </div>
            <Indicator ref={indicatorRef} length={pointOfInterests.length} />
        </div>
    );
};

export default PointOfInterestList;
