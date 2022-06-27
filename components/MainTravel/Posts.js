import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { v4 as uuid } from "uuid";

// import contexts
import { usePostsContext } from '../../context/MainTravel/PostContext';
import { useMapContext } from '../../context/MainTravel/MapContext';

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faMagnifyingGlass,
    faStar,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faMountain } from "@fortawesome/free-solid-svg-icons";

// import components
import OpenButton from "./OpenButton";

const Posts = () => {
    const { amphoeArr, postsArr } = usePostsContext();

    const { isOpen } = useMapContext();
    useEffect(() => {
        console.log(postsArr);
    }, [postsArr]);

    return (
        <div
            className={`relative h-full w-full  ${
                isOpen ? "" : "shrink-0 md:shrink"
            }`}
        >
            <OpenButton />
            <div
                className={` h-full w-full flex-wrap justify-center overflow-y-scroll bg-white px-4  ${
                    isOpen ? "hidden md:flex" : "flex "
                }`}
            >
                <div className="w-full sm:w-auto flex flex-col ">
                    <div className="group sticky top-0  z-10 mt-4 flex items-center justify-between py-4 ">
                        <div className="absolute inset-0 bg-white opacity-80"></div>
                        <div className="z-10 text-text whitespace-nowrap">
                            <span
                                className={`mr-2 text-[27px] font-semibold ${
                                    isOpen
                                        ? "text-[20px] xl:text-[27px]"
                                        : "text-[18px] sm:text-[22px] lg:text-[27px] "
                                }`}
                            >
                                แหล่งท่องเที่ยว<span className="group-focus-within:hidden inline">ในชลบุรี</span>
                            </span>
                            <FontAwesomeIcon
                                icon={faMountain}
                                className="text-2xl text-primary-lighter"
                            />
                        </div>
                        <div
                            className={`z-10 flex w-60 items-center rounded-lg border-2 border-text-lighterr py-1 px-2   
                        ${
                            isOpen
                                ? "w-40 text-sm  xl:w-44 xl:text-base"
                                : "w-24 sm:w-40 text-xs md:w-60 md:text-base group-focus-within:w-40"
                        }`}
                        >
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className="mr-2 text-text-lightest "
                            />
                            <input
                                type="text"
                                className="w-full bg-transparent placeholder:text-text-lighterr focus:outline-none"
                                placeholder="ค้นหา..."
                            />
                        </div>
                    </div>
                    {postsArr.map((post, index) => (
                        <div className="mt-6 mb-10 flex flex-col" key={uuid()}>
                            <div className=" flex items-center text-xl font-medium text-text">
                                <span className="">
                                    อำเภอ{amphoeArr[index]}
                                </span>
                                <div className="mx-3 h-[4px] w-[4px] rounded-full bg-primary"></div>
                                <span className="text-primary-lighter">
                                    {postsArr[index].length} สถานที่
                                </span>
                            </div>
                            <div className="mb-6 h-[1.5px] w-full bg-[#EFEFEF]"></div>
                            <div
                                className={`w-full grid grid-cols-1 gap-x-10 gap-y-10  ${
                                    isOpen
                                        ? "grid-cols-1 lg:grid-cols-2"
                                        : "sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4"
                                } ${
                                    isOpen
                                        ? "gap-x-4 2xl:gap-x-10"
                                        : "sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4"
                                }`}
                            >
                                {post.map((e) => (
                                    <div
                                        className={`flex flex-col overflow-hidden    text-text ${
                                            isOpen
                                                ? "w-[200px] lg:w-[220px] xl:w-[260px] 2xl:w-[290px]"
                                                : "w-full  2xl:w-[290px]"
                                        }`}
                                        key={e.placeID}
                                    >
                                        <div
                                            className="relative mb-2 aspect-[13/9] w-full shrink-0 overflow-hidden rounded-xl"
                                            key={e.imageURL[0]._key}
                                        >
                                            <Image
                                                priority="low"
                                                layout="fill"
                                                objectFit="cover"
                                                src={e.imageURL[0].url}
                                                className=""
                                            />
                                            <div className=""></div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="font-medium">
                                                {e.title}
                                            </div>
                                            <div className="flex items-center">
                                                <span className="mr-1 text-sm">
                                                    4.6
                                                </span>
                                                <FontAwesomeIcon
                                                    className="text-xs text-yellow-200"
                                                    icon={faStar}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-text-lighter">
                                            <span className="text-xs ">
                                                <FontAwesomeIcon
                                                    icon={faLocationDot}
                                                    className="mr-[6px] text-red-400"
                                                />
                                                <span className="">
                                                    ระยะห่าง 90 กิโลเมคร
                                                </span>
                                            </span>

                                            <span className="text-xs ">
                                                <span className=" mr-1">
                                                    อ. {e.amphoe.name}
                                                </span>
                                                <span className="">
                                                    ต. {e.tambon.name}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Posts