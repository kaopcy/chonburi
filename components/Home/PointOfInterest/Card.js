import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import { PortableText } from "@portabletext/react";
import gsap from "gsap";

import Image from "next/image";
import { urlFor } from "../../../lib/sanity";

import { v4 as uuid } from "uuid";
import Moment from "react-moment";
import "moment/locale/th";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

import { getDistance } from "geolib";
import { getTypeProperties } from "../../../utils/typeUtils";

import useIsTouchDevice from "../../../composables/useIsTouchDevice";
import { useUserLocation } from "../../../context/UserLocationContext";

const Card = ({ post }) => {
    const { userLocation } = useUserLocation();
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
    //     const getRandomTime = () => {
    //         return Math.round(Math.random() * (5000 - 4000) + 4000);
    //     };
    //     timeOut.current = setTimeout(() => {
    //         setIndex((e) => (e + 1) % post.mainImage.length);
    //         // }, getRandomTime());
    //     }, 5000);

    //     return () => {
    //         clearTimeout(timeOut.current);
    //     };
    // }, [index, isTouch]);

    const distance = useMemo(() => {
        if (!userLocation || !post.coords) return null;
        const temp = getDistance(userLocation, post.coords);
        return temp > 1000
            ? `${(temp / 1000).toFixed(2)} กิโลเมตร`
            : `${temp} เมตร`;
    }, [userLocation, post.coords]);

    return (
        <div className="relative mr-5 mb-4  flex h-full w-[230px] shrink-0   flex-col justify-between bg-white py-8 md:w-[300px]">
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
                                        priority="low"
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
                <div className="mt-5 flex w-full min-w-0 items-center justify-between">
                    <div className="ellipsis text-xs text-text-lighter md:text-sm">
                        {post.location}
                    </div>
                    <Type locationType={post.locationType} />
                </div>
                <div className=" mt-1 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-text md:text-2xl ">
                        {post.title}
                    </h1>
                </div>
                <div className=" mt-1 flex items-center text-xs font-light text-text-lighterr md:text-sm">
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
    const { color, icon, name } = getTypeProperties(locationType);
    return (
        <div
            className="flex items-center space-x-1 whitespace-nowrap rounded-l-full border bg-gray-200 px-[8px] py-[3px]  text-xxs text-text-dark md:text-xs"
            style={{
                backgroundColor: color,
            }}
        >
            <FontAwesomeIcon
                icon={icon}
                className="text-white"
                style={{ color: "white" }}
            />
            <div className=" text-white">{name}</div>
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

export default Card;
