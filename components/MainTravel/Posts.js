import React, { useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";

// import contexts
import { usePostsContext } from "../../context/MainTravel/PostContext";
import { useMapContext } from "../../context/MainTravel/MapContext";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faMountain } from "@fortawesome/free-solid-svg-icons";

// import components
import OpenButton from "./OpenButton";
import PostCard from "./PostCard";

const Posts = () => {
    const { amphoeArr, postsArr } = usePostsContext();

    const { isOpen } = useMapContext();
    useEffect(() => {
        console.log(postsArr);
    }, [postsArr]);

    const eachAmphoreRef = useRef([]);
    const rootRef = useRef(null);
    const testRef = useRef(null);
    // useEffect(() => {
    //     setTimeout(() => {
    //         const observer = new IntersectionObserver(
    //             (entries) => {
    //                 console.log("entries:", entries);
    //             },
    //             { root: rootRef.current, rootMargin: "0px", threshold: 0 }
    //         );
    //         eachAmphoreRef.current.forEach((amphoe) => {
    //             observer.observe(amphoe);
    //         });
    //     }, 1000);
    //     // observer.observe(testRef.current);
    //     return () => {
    //         observer.disconnect();
    //     };
    // }, []);

    return (
        <div
            className={`relative h-full w-full  ${
                isOpen ? "" : "shrink-0 md:shrink"
            }`}
        >
            <OpenButton />
            <div
                ref={rootRef}
                className={` h-full w-full flex-wrap justify-center overflow-x-hidden overflow-y-scroll bg-white px-6  ${
                    isOpen ? "hidden md:flex" : "flex "
                }`}
            >
                <div className="flex w-full flex-col sm:w-auto ">
                    <div className="group sticky top-0  z-10 mt-4 flex items-center justify-between py-4 ">
                        <div className="absolute inset-0 bg-white opacity-80"></div>
                        <div className="z-10 whitespace-nowrap text-text">
                            <span
                                className={`mr-2 text-[27px] font-semibold ${
                                    isOpen
                                        ? "text-[20px] xl:text-[27px]"
                                        : "text-[18px] sm:text-[22px] lg:text-[27px] "
                                }`}
                            >
                                แหล่งท่องเที่ยว
                                <span
                                    className="inline group-focus-within:hidden"
                                    ref={testRef}
                                >
                                    ในชลบุรี
                                </span>
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
                                : "w-24 text-xs group-focus-within:w-40 sm:w-40 sm:group-focus-within:w-24 md:w-60 md:text-base"
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
                        <div
                            ref={(e) => (eachAmphoreRef.current[index] = e)}
                            className="mt-6 mb-10 flex flex-col"
                            key={uuid()}
                        >
                            <div className=" flex items-center text-xl font-medium text-text">
                                <span className="">
                                    อำเภอ{amphoeArr[index]}
                                </span>
                                <div className="mx-3 h-[4px] w-[4px] rounded-full bg-primary"></div>
                                <span className="text-lg font-light text-text-lighterr">
                                    {postsArr[index].length} สถานที่
                                </span>
                            </div>
                            <div className="mb-6 h-[1.5px] w-full bg-[#EFEFEF]"></div>
                            <div
                                className={`grid w-full grid-cols-1 gap-x-10 gap-y-10  ${
                                    isOpen
                                        ? "grid-cols-1 lg:grid-cols-2"
                                        : "sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4"
                                } ${
                                    isOpen
                                        ? "gap-x-4 2xl:gap-x-10"
                                        : "sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4"
                                }`}
                            >
                                {post.map(
                                    (e, index) =>
                                            <PostCard
                                                key={e.placeID}
                                                {...e}
                                                isOpen={isOpen}
                                            />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Posts;
