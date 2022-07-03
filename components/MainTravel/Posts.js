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
import AmphoeSelector from "./AmphoeSelector";
import SearchBar from "./SearchBar";

const Posts = () => {
    const { amphoeArr, postsArr, activeAmphoe, setActiveAmphoe, isScrollTo } =
        usePostsContext();

    const [extraAmphoe, setExtraAmphoe] = useState(postsArr.map(() => 1));

    const { isOpen } = useMapContext();

    const eachAmphoreRef = useRef([]);

    const rootRef = useRef(null);
    const testRef = useRef(null);

    const scrollTimeout = useRef(null);

    const scrollTo = () => {};

    useEffect(() => {
        const scrollEvnt = () => {
            if (!isScrollTo.current) return;
            if (!scrollTimeout.current) {
                scrollTimeout.current = setTimeout(() => {
                    scrollTimeout.current = null;
                    isScrollTo.current = false;
                }, 1000);
            }
        };
        rootRef.current.addEventListener("scroll", scrollEvnt);

        let observeArr = [];

        const options = {
            root: rootRef.current,
            threshold: 0,
            rootMargin: "-40% 0px -40% 0px",
        };

        const onIntersect = (entries) => {
            if (isScrollTo.current) return;
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    observeArr = observeArr.filter((e) => e !== entry.target);
                } else observeArr.push(entry.target);
            });
            const activeAmphoe =
                observeArr[observeArr.length - 1]?.dataset?.amphoe;
            setActiveAmphoe((e) => (activeAmphoe ? activeAmphoe : e));
        };

        const observer = new IntersectionObserver(onIntersect, options);

        eachAmphoreRef.current.forEach((amphoe) => {
            if (!amphoe) return;
            observer.observe(amphoe);
        });
        return () => {
            observer.disconnect();
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, [postsArr]);

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
                <div
                    className={`flex  flex-col   ${
                        isOpen ? "w-full xl:w-auto" : " w-full sm:w-auto"
                    }`}
                >
                    <div className="group sticky top-0  z-20  mt-4 flex w-full items-center justify-between gap-3 py-2  md:py-4">
                        <div className="absolute inset-0 bg-white opacity-80"></div>
                        <AmphoeSelector />
                        <SearchBar />
                    </div>
                    {postsArr.every(e=> e.length <= 0 )  ? (
                        <NoPost />
                    ) : (
                        postsArr.map(
                            (posts, index) =>
                                posts.length > 0 && (
                                    <div
                                        id={`${amphoeArr[index]}`}
                                        data-amphoe={amphoeArr[index]}
                                        ref={(e) =>
                                            (eachAmphoreRef.current[index] = e)
                                        }
                                        className="mb-10 flex scroll-my-14 flex-col  pt-6"
                                        key={amphoeArr[index]}
                                    >
                                        <div className=" flex items-center text-xl  text-text">
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
                                                    postIndex <
                                                        extraAmphoe[index] *
                                                            4 && (
                                                        <PostCard
                                                            key={post.placeID}
                                                            {...post}
                                                            isOpen={isOpen}
                                                        />
                                                    )
                                            )}
                                        </div>
                                        {posts.length >
                                        extraAmphoe[index] * 4 ? (
                                            <div className="flex-cen mt-6 w-full">
                                                <div className="h-[1px] w-full bg-zinc-200"></div>

                                                <span
                                                    className="group relative mx-3 shrink-0 cursor-pointer text-sm font-light text-text-lighterr"
                                                    onClick={() =>
                                                        setExtraAmphoe(
                                                            (old) => {
                                                                const newC =
                                                                    old;
                                                                newC[
                                                                    index
                                                                ] += 1;
                                                                return [
                                                                    ...newC,
                                                                ];
                                                            }
                                                        )
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
                                                            isScrollTo.current = true;
                                                            setExtraAmphoe(
                                                                (old) => {
                                                                    const newC =
                                                                        old;
                                                                    newC[
                                                                        index
                                                                    ] = 1;
                                                                    return [
                                                                        ...newC,
                                                                    ];
                                                                }
                                                            );
                                                            eachAmphoreRef.current[
                                                                index
                                                            ].scrollIntoView({
                                                                behavior:
                                                                    "smooth",
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
                                )
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

const NoPost = () => {
    return <div className="w-full bg-black flex flex-col">
        <div className="w-[260px] h-[300px] bg-red-500"></div>
    </div>;
};

export default Posts;
