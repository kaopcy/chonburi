import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import gsap from "gsap";

import Image from "next/image";
import { urlFor } from "../../../lib/sanity";

import { v4 as uuid } from "uuid";
import "moment/locale/th";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

import { getDistance } from "geolib";
import { getRestaurantTypeProperties } from "../../../utils/typeUtils";
import useIsTouchDevice from "../../../composables/useIsTouchDevice";

const RestaurantCard = ({ post, currentLocation }) => {
    const [index, setIndex] = useState(0);
    const container = useRef(null);
    const timeOut = useRef(null);
    const isTouch = useIsTouchDevice();

    useEffect(() => {
        const width = container.current.clientWidth;
        gsap.to(container.current, {
            left: `-${width * index}px`,
            ease: "expo.inOut",
            duration: 1,
        });
    }, [index]);

    // useEffect(() => {
    //     if (isTouch || isTouch === null) return;
    //     timeOut.current = setTimeout(() => {
    //         setIndex((e) => (e + 1) % post.mainImage.length);
    //     }, 5000);

    //     return () => {
    //         clearTimeout(timeOut.current);
    //     };
    // }, [index]);

    const distance = useMemo(() => {
        if (!currentLocation || !post.coords) return null;
        const temp = getDistance(currentLocation, post.coords);
        return temp > 1000
            ? `${(temp / 1000).toFixed(2)} กิโลเมตร`
            : `${temp} เมตร`;
    }, [currentLocation, post.coords]);

    return (
        <div className="relative mr-5 mb-4  flex h-full w-[300px] shrink-0 flex-col justify-between bg-white py-8">
            <div className="flex flex-col">
                <div className="group relative aspect-[16/12] w-full overflow-hidden rounded-xl">
                    <div className="absolute inset-0 overflow-hidden rounded-xl transition-transform duration-500 group-hover:scale-125">
                        <div className="absolute flex w-full  " ref={container}>
                            {post.mainImage.map((image) => (
                                <div
                                    key={image._key}
                                    className=" relative  aspect-[16/12] w-full  shrink-0 overflow-hidden  shadow-md "
                                >
                                    <Image
                                        priority='low'
                                        layout="fill"
                                        objectFit="cover"
                                        src={urlFor(image).url()}
                                        className=""
                                    />
                                    {/* <div className="inner-shadow absolute top-0 left-0 z-10 h-full w-full"></div> */}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-40"></div>
                    <Link href={`/travel/${post.slug.current}`}>
                        <div className="abs-center pointer-events-none z-20 flex translate-y-full  items-center text-2xl text-white opacity-0  transition-all duration-500 group-hover:pointer-events-auto group-hover:-translate-y-1/2 group-hover:opacity-100">
                            <div className="relative">
                                เข้าชม
                                <div className="absolute bottom-0 h-[2px] w-full origin-left scale-x-0 bg-white delay-200 duration-700 ease-out group-hover:scale-x-100"></div>
                            </div>
                            <svg
                                className="ml-2   w-5 -translate-x-[200%] opacity-0 duration-700 group-hover:translate-x-0 group-hover:opacity-100"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 20L20 12L12 4"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="square"
                                    strokeLinejoin="round"
                                ></path>
                                <line
                                    x1="1"
                                    y1="-1"
                                    x2="17"
                                    y2="-1"
                                    transform="matrix(-1 0 0 1 20 13)"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="square"
                                    strokeLinejoin="round"
                                ></line>
                            </svg>
                        </div>
                    </Link>
                </div>
                {/* <Indicator index={index} postNum={post.mainImage.length} /> */}
                <div className="mt-5 flex w-full min-w-0 items-center text-sm justify-between">
                    <div className="ellipsis text-text-lighter">
                        {post.location}
                    </div>
                    <Type locationType={post.locationType} />
                </div>
                <div className=" mt-1 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-text ">
                        {post.title}
                    </h1>
                </div>
                <div className=" flex items-center font-light text-text-lighter">
                    {post.tag &&
                        post.tag.map((tag) => <Tag tag={tag} key={tag._id} />)}
                </div>
                <div className=" flex items-center font-light text-text-lighter text-sm mt-1">
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className="mr-2 text-xs text-red-500"
                    />
                    ระยะห่าง {distance ? distance : "-- เมตร"}
                    {!distance && (
                        <div className="group relative">
                            <FontAwesomeIcon
                                icon={faQuestionCircle}
                                className="ml-4 text-sm text-text-lightest"
                            />
                            <div className="absolute bottom-full left-0 hidden w-[100px] overflow-hidden rounded-md border px-2 py-1 text-xs group-hover:flex">
                                <div className="absolute inset-0 bg-white opacity-40"></div>
                                <div className="z-10">
                                    คุณไม่ได้เปิดใช้งานตำแหน่ง
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Type = ({ locationType }) => {
    const { color, icon, name } = getRestaurantTypeProperties(locationType);
    return (
        <div className="e flex items-center space-x-1 whitespace-nowrap rounded-l-full px-[8px] py-[3px] text-sm text-text-dark">
            <FontAwesomeIcon
                icon={icon}
                className="aspect-square rounded-full p-[5px] text-white"
                style={{ color: "white", backgroundColor: color }}
            />
            <div className=" text-text-lighter">{name}</div>
        </div>
    );
};

const Tag = ({ tag }) => {
    return (
        <div className="my-2 mr-2 flex cursor-pointer items-center rounded-full border px-3 py-[2px] text-xs text-text-lighter hover:bg-gray-100">
            <FontAwesomeIcon icon={faCheck} className="mr-1 text-green-500" />
            <div className="">{tag.name}</div>
        </div>
    );
};

const Indicator = ({ postNum, index }) => {
    const isActive = useCallback(
        (i) => {
            return i === index;
        },
        [index]
    );
    return (
        <div className="my-3 flex items-center space-x-2 self-center">
            {[...Array(postNum)].map((_, i) => (
                <div
                    key={uuid()}
                    className={`h-3 w-3 rounded-full border-2 bg-white ${
                        isActive(i) && "bg-primary-light"
                    }`}
                ></div>
            ))}
        </div>
    );
};

export default RestaurantCard;
