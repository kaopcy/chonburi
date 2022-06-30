import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

// import contexts
import { usePostsContext } from "../../context/MainTravel/PostContext";
import { useMapContext } from "../../context/MainTravel/MapContext";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faMountain } from "@fortawesome/free-solid-svg-icons";

// import components
import OpenButton from "./OpenButton";
import PostCard from "./PostCard";

const Posts = () => {
    const {
        amphoeArr,
        postsArr,
        activeAmphoe,
        setActiveAmphoe,
        postByActiveAmphoe,
    } = usePostsContext();
    const [extraAmphoe, setExtraAmphoe] = useState(postsArr.map(() => 1));

    const { isOpen } = useMapContext();

    const eachAmphoreRef = useRef([]);

    const rootRef = useRef(null);
    const testRef = useRef(null);

    useEffect(() => {
        let observeArr = [];

        const options = {
            root: rootRef.current,
            threshold: 0.2,
            rootMargin: "0px",
        };

        const onIntersect = (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    observeArr = observeArr.filter((e) => e !== entry.target);
                } else observeArr.push(entry.target);
            });
            const activeAmphoe =
                observeArr[observeArr.length - 1]?.dataset?.amphoe;
            setActiveAmphoe(activeAmphoe);
        };

        const observer = new IntersectionObserver(onIntersect, options);

        eachAmphoreRef.current.forEach((amphoe) => {
            observer.observe(amphoe);
        });
        // observer.observe(testRef.current);
        return () => {
            observer.disconnect();
        };
    }, []);

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
                            {activeAmphoe ? (
                                <span
                                    className={`mr-2 text-[27px] font-semibold ${
                                        isOpen
                                            ? "text-[20px] xl:text-[27px]"
                                            : "text-[18px] sm:text-[22px] lg:text-[27px] "
                                    }`}
                                >
                                    {activeAmphoe}
                                </span>
                            ) : (
                                <>
                                    <span
                                        className={`mr-2 text-[27px] font-semibold ${
                                            isOpen
                                                ? "text-[20px] xl:text-[27px]"
                                                : "text-[18px] sm:text-[22px] lg:text-[27px] "
                                        }`}
                                    >
                                        แหล่งท่องเที่ยว
                                        <span
                                            className="inline group-focus-within:hidden sm:group-focus-within:inline"
                                            ref={testRef}
                                        >
                                            ในชลบุรี
                                        </span>
                                    </span>
                                    <FontAwesomeIcon
                                        icon={faMountain}
                                        className="text-2xl text-primary-lighter"
                                    />
                                </>
                            )}
                        </div>
                        <div
                            className={`z-10 flex w-60 items-center rounded-lg border-2 border-text-lighterr py-1 px-2   
                        ${
                            isOpen
                                ? "w-40 text-sm  xl:w-44 xl:text-base"
                                : "w-24 text-xs group-focus-within:w-24 sm:w-40 sm:group-focus-within:w-40 md:w-60 md:text-base md:group-focus-within:w-60"
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
                    {postsArr.map((posts, index) => (
                        <div
                            data-amphoe={amphoeArr[index]}
                            ref={(e) => (eachAmphoreRef.current[index] = e)}
                            className="mb-10 flex flex-col pt-6"
                            key={amphoeArr[index]}
                        >
                            <div
                                className=" flex items-center text-xl  text-text"
                                onClick={() => {}}
                            >
                                <span className="font-medium">
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
                                        ? "grid-cols-1 xl:grid-cols-2"
                                        : "sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4"
                                } ${
                                    isOpen
                                        ? "gap-x-4 2xl:gap-x-10"
                                        : "sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4"
                                }`}
                            >
                                {posts.map(
                                    (post, postIndex) =>
                                        postIndex < extraAmphoe[index] * 4 && (
                                            <PostCard
                                                key={post.placeID}
                                                {...post}
                                                isOpen={isOpen}
                                            />
                                        )
                                )}
                            </div>
                            {posts.length >= extraAmphoe[index] * 4 ? (
                                <div className="flex-cen mt-6 w-full">
                                    <div className="h-[1px] w-full bg-zinc-200"></div>

                                    <span
                                        className="group relative mx-3 shrink-0 cursor-pointer text-sm font-light text-text-lighterr"
                                        onClick={() =>
                                            setExtraAmphoe((old) => {
                                                const newC = old;
                                                newC[index] += 1;
                                                console.log(newC);
                                                return [...newC];
                                            })
                                        }
                                    >
                                        แสดงเพิ่มเติม
                                        <FontAwesomeIcon
                                            className="absolute top-full left-1/2 -translate-y-full -translate-x-1/2 text-xs text-text-lightest opacity-0 transition-opacity-transform group-hover:translate-y-full group-hover:opacity-100"
                                            icon={faChevronDown}
                                        />
                                    </span>
                                    <div className="h-[1px] w-full bg-zinc-200"></div>
                                </div>
                            ) : (
                                posts.length > 4 && (
                                    <div className="flex-cen mt-6 w-full">
                                        <div className="h-[1px] w-full bg-zinc-200"></div>

                                        <span
                                            className="group relative mx-3 shrink-0 cursor-pointer text-sm font-light text-text-lighterr"
                                            onClick={() => {
                                                setExtraAmphoe((old) => {
                                                    const newC = old;
                                                    newC[index] = 1;
                                                    console.log(newC);
                                                    return [...newC];
                                                });
                                                eachAmphoreRef.current[
                                                    index
                                                ].scrollIntoView({
                                                    behavior: "smooth",
                                                    block: "start",
                                                });
                                            }}
                                        >
                                            แสดงน้อยลง
                                            <FontAwesomeIcon
                                                className="absolute top-full left-1/2 -translate-y-full -translate-x-1/2 text-xs text-text-lightest opacity-0 transition-opacity-transform group-hover:translate-y-full group-hover:opacity-100"
                                                icon={faChevronDown}
                                            />
                                        </span>
                                        <div className="h-[1px] w-full bg-zinc-200"></div>
                                    </div>
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Posts;
