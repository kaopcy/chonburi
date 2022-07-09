import React, { useRef, useEffect } from "react";
import Link from "next/dist/client/link";

import { faChevronRight, faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useDraggable from "../../../composables/useDraggable";

// import components
import RestaurantCard from "./Card";
import Indicator  from "./Indicator";

const RestaurantList = ({ restaurants }) => {
    const { slider } = useDraggable();

    const cardArrRef = useRef([]);
    const containerRef = useRef(null);
    const observer = useRef();

    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                console.log(entries.filter(e=> e.isIntersecting).map(e=> e.target));
            },
            { root: containerRef.current , rootMargin: "0px -40px 0px -40px" }
        );
        cardArrRef.current.map((e) => {
            observer.current.observe(e);
        });

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, []);

    return (
        <div className="mx-auto mt-10 flex w-full max-w-[1300px] flex-col items-start">
            <div className="mb-0 flex w-full items-center justify-between">
                <span className="flex items-center text-lg font-semibold text-text sm:text-2xl lg:text-3xl">
                    ร้านอาหาร
                    <FontAwesomeIcon
                        icon={faMugHot}
                        className="ml-3 mb-1  text-text-lightest"
                    />
                </span>
                <Link href={"/travel"} passHref>
                    <a className="cursor-pointer text-sm text-primary underline sm:text-base">
                        ดูเพิ่มเติม...
                    </a>
                </Link>
            </div>

            <div
                ref={containerRef}
                className="relative mt-8 w-full overflow-hidden "
            >
                <div className="absolute top-full left-0 z-10 h-2 w-full -translate-y-full bg-white "></div>
                <div
                    className="relative flex w-full overflow-x-auto pb-5"
                    ref={slider}
                >
                    {restaurants.map((restaurant, i) => {
                        return (
                            <RestaurantCard
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
        </div>
    );
};

export default RestaurantList;
