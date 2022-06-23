import React, { useEffect, useRef } from "react";
import Link from "next/dist/client/link";

import { faChevronRight, faMountain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PointOfInterestCard from "./Card";
import useGeolocation from "../../../composables/useGeolocation";
import useDraggable from "../../../composables/useDraggable";

const LocationList = ({ posts }) => {
    const { currentLocation, error } = useGeolocation();
    const { slider } = useDraggable();

    return (
        <div className="mx-auto mt-10 flex w-full max-w-[1300px] flex-col items-start sm:mt-20">
            <div className="mb-0 flex w-full items-center justify-between">
                <span className="flex items-center text-lg font-semibold text-text sm:text-2xl lg:text-3xl">
                    แหล่งท่องเที่ยวแนะนำ
                    <FontAwesomeIcon
                        icon={faMountain}
                        className="ml-3  text-text-lightest"
                    />
                </span>
                <Link href={"/travel"} passHref>
                    <span className="cursor-pointer text-sm text-primary underline sm:text-base ">
                        ดูเพิ่มเติม...
                    </span>
                </Link>
            </div>
            <div className="relative w-full overflow-hidden">
                <div className="gradient-white absolute top-0 right-0 z-10 h-full w-10"></div>
                <div className="absolute top-[97%] left-0 z-10 h-5 w-full bg-white "></div>
                <div
                    className="relative flex w-full overflow-x-auto "
                    ref={slider}
                >
                    {posts.map((post) => {
                        return (
                            <PointOfInterestCard
                                post={post}
                                key={post?._id}
                                currentLocation={currentLocation}
                                isUserLocation={error && true}
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

export default LocationList;
