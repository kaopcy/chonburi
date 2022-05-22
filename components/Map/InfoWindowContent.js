import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import { PortableText } from "@portabletext/react";
import gsap from "gsap";

import Image from "next/image";
import { urlFor } from "../../lib/sanity";

import { v4 as uuid } from "uuid";
import Moment from "react-moment";
import "moment/locale/th";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

import { getDistance } from "geolib";
import { getTypeProperties } from "../../utils/typeUtils";

const InfoWindowContent = ({ post, currentLocation }) => {
    console.log(post);
    const [index, setIndex] = useState(0);
    const container = useRef(null);
    const timeOut = useRef(null);

    useEffect(() => {
        const width = container.current.clientWidth;
        gsap.to(container.current, {
            left: `-${width * index}px`,
            ease: "expo.inOut",
            duration: 0.7,
        });
    }, [index]);

    useEffect(() => {
        const getRandomTime = () => {
            return Math.round(Math.random() * (5000 - 4000) + 4000);
        };
        timeOut.current = setTimeout(() => {
            setIndex((e) => (e + 1) % post.mainImage.length);
            // }, getRandomTime());
        }, 5000);

        return () => {
            clearTimeout(timeOut.current);
        };
    }, [index]);

    const distance = useMemo(() => {
        if (!currentLocation || !post.coords) return null;
        const temp = getDistance(currentLocation, post.coords);
        return temp > 1000
            ? `${(temp / 1000).toFixed(2)} กิโลเมตร`
            : `${temp} เมตร`;
    }, [currentLocation, post.coords]);

    return (
        <div className="relative  flex h-full w-[200px] shrink-0 flex-col justify-between bg-white ">
            <div className="flex flex-col">
                <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-md rounded-br-none">
                    <Type locationType={post.locationType} />

                    <div className="absolute inset-0 overflow-hidden  transition-transform duration-500 group-hover:scale-150">
                        <div className="absolute flex w-full  " ref={container}>
                            {post.mainImage.map((image) => (
                                <div
                                    key={image._key}
                                    className=" relative aspect-[16/10] w-full  shrink-0 overflow-hidden  shadow-md "
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
                        <div className="abs-center z-20 translate-y-full cursor-pointer  text-2xl text-white opacity-0 transition-all  duration-500 group-hover:-translate-y-1/2 group-hover:opacity-100">
                            เข้าชม
                        </div>
                    </Link>
                </div>
                {/* <Indicator index={index} postNum={post.mainImage.length} /> */}
                <div className="mt-1 flex w-full min-w-0 items-center justify-between">
                    <div className="ellipsis text-text-lighter">
                        {post.location}
                    </div>
                </div>
                <div className=" mt-1 flex items-center justify-between">
                    <h1 className="text-xl font-medium leading-6 text-text">
                        {post.title}
                    </h1>
                </div>
                <div className=" mt-1 flex items-center font-light text-text-lighter">
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className="mr-2 text-sm text-red-500"
                    />
                    ระยะห่าง {distance ? distance : "-- เมตร"}
                    {!distance && (
                        <div className="group relative">
                            <FontAwesomeIcon
                                icon={faQuestionCircle}
                                className="ml-4 text-sm text-text-lightest"
                            />
                            <div className="absolute bottom-full left-0 z-30 hidden w-[100px] overflow-hidden rounded-md border px-2 py-1 text-xs group-hover:flex">
                                <div className="absolute inset-0 bg-white "></div>
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
    console.log(locationType);
    const { color, icon, name } = getTypeProperties(locationType);
    return (
        <div
            className="absolute bottom-0 right-0 z-10 flex items-center space-x-1 whitespace-nowrap   rounded-l-full  bg-gray-200 px-[8px] py-[3px] text-xs text-text-dark"
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

export default InfoWindowContent;
