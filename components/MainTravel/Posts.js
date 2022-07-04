import React, { useEffect, useRef, useState, useMemo } from "react";

// import contexts
import { usePostsContext } from "../../context/MainTravel/PostContext";
import { useMapContext } from "../../context/MainTravel/MapContext";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faMountain } from "@fortawesome/free-solid-svg-icons";

// import components
import OpenButton from "./OpenButton";
import PostCard from "./PostCard";
import AmphoeSelector from "./AmphoeSelector";
import SearchBar from "./SearchBar";

const Posts = () => {
    const { amphoeArr, postsArr, setActiveAmphoe, isScrollTo, filter } =
        usePostsContext();

    const [extraAmphoe, setExtraAmphoe] = useState(postsArr.map(() => 1));

    const { isOpen } = useMapContext();

    const eachAmphoreRef = useRef([]);

    const rootRef = useRef(null);
    const testRef = useRef(null);

    const scrollTimeout = useRef(null);

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
                className={` h-full w-full flex-wrap justify-center overflow-x-hidden overflow-y-scroll bg-[#fafafa]   ${
                    isOpen ? "hidden px-2 md:flex" : "flex px-3 sm:px-6 "
                }`}
            >
                <div
                    className={`flex  flex-col   ${
                        isOpen ? "w-full xl:w-auto" : " w-full sm:w-auto"
                    }`}
                >
                    <span
                        className={`mr-2 mt-10 text-[27px] font-semibold text-text  ${
                            isOpen
                                ? "text-[20px] xl:text-[27px]"
                                : "text-[18px] sm:text-[22px] lg:text-[27px] "
                        }`}
                    >
                        {filter ? (
                            <div className="">ผลการค้นหาสำหรับ "{filter}"</div>
                        ) : (
                            <>
                                แหล่งท่องเที่ยว
                                <span className="mr-5  inline" ref={testRef}>
                                    ในชลบุรี
                                </span>
                                <FontAwesomeIcon
                                    icon={faMountain}
                                    className="text-2xl text-primary-lighter"
                                />
                            </>
                        )}
                    </span>
                    <div className="group sticky top-0  z-20  mt-4 mb-4 flex w-full items-center justify-between gap-3 py-2  md:py-4">
                        <div className="absolute inset-0 bg-white opacity-80"></div>
                        <AmphoeSelector />
                        <SearchBar />
                    </div>
                    {postsArr.every((e) => e.length <= 0) ? (
                        <NoPost isOpen={isOpen} />
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
                                        className={`mb-10 flex scroll-my-14 flex-col  rounded-2xl bg-white  py-8 shadow-small  ${
                                            isOpen ? "px-3 xl:px-4" : "px-4 sm:px-8"
                                        }`}
                                        key={amphoeArr[index]}
                                    >
                                        <div className=" flex items-center text-xl  text-text">
                                            <span className="font-medium">
                                                อำเภอ{amphoeArr[index]}
                                            </span>
                                            <div className="mx-3 h-[4px] w-[4px] rounded-full bg-primary"></div>
                                            <span className="text-lg font-light text-primary-lighter ">
                                                {postsArr[index].length} สถานที่
                                            </span>
                                        </div>
                                        <div className="mb-6 mt-3 h-[1.5px] w-full bg-[#EFEFEF]"></div>
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
                                            <MoreButton
                                                amphoeIndex={index}
                                                setExtraAmphoe={setExtraAmphoe}
                                            />
                                        ) : (
                                            posts.length > 4 && (
                                                <LessButton
                                                    amphoeIndex={index}
                                                    eachAmphoreRef={
                                                        eachAmphoreRef
                                                    }
                                                    setExtraAmphoe={
                                                        setExtraAmphoe
                                                    }
                                                />
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

const NoPost = ({ isOpen }) => {
    const { posts } = usePostsContext();
    const post = useMemo(() => posts["เมือง"][0], [posts]);
    return (
        <>
            <div
                className={`grid w-full grid-cols-1 gap-x-10 gap-y-10  sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4`}
            >
                <div className="flex w-full flex-col bg-black">
                    <div
                        className={
                            isOpen
                                ? "w-full xl:w-[260px] 2xl:w-[290px]"
                                : "w-full md:w-[260px] 2xl:w-[290px]"
                        }
                    ></div>
                </div>
            </div>
            <div className="text-text">ไม่พบผลลัพธ์ที่ต้องการค้นหา</div>
        </>
    );
};

const MoreButton = ({ setExtraAmphoe, amphoeIndex }) => {
    return (
        <div className="flex-cen mt-6 w-full">
            <div className="h-[1px] w-full bg-zinc-200"></div>
            <div
                className="flex-col-cen group relative mx-3 aspect-square shrink-0 cursor-pointer rounded-full border-[1.5px] border-text-lightest text-sm   font-light text-text-lighter hover:!border-primary hover:!shadow-blue"
                onClick={() =>
                    setExtraAmphoe((old) => {
                        const newC = old;
                        newC[amphoeIndex] += 1;
                        return [...newC];
                    })
                }
            >
                <span className="mx-2 font-medium text-text">เพิ่มเติม</span>
                <div className="-mb-[7px] flex flex-col text-xs">
                    <FontAwesomeIcon
                        className="-mb-[7px] text-text-lighter"
                        icon={faChevronDown}
                    />
                    <FontAwesomeIcon
                        className="text-text-lighter "
                        icon={faChevronDown}
                    />
                </div>
            </div>
            <div className="h-[1px] w-full bg-zinc-200"></div>
        </div>
    );
};

const LessButton = ({ setExtraAmphoe, amphoeIndex, eachAmphoreRef }) => {
    const { isScrollTo } = usePostsContext();
    return (
        <div className="flex-cen mt-6 w-full">
            <div className="h-[1px] w-full bg-zinc-200"></div>
            <div
                className="flex-col-cen group relative mx-3 aspect-square shrink-0 cursor-pointer rounded-full border-[1.5px] border-text-lightest text-sm   font-light text-text-lighter hover:!border-primary hover:!shadow-blue"
                onClick={() => {
                    isScrollTo.current = true;
                    setExtraAmphoe((old) => {
                        const newC = old;
                        newC[amphoeIndex] = 1;
                        return [...newC];
                    });
                    eachAmphoreRef.current[amphoeIndex].scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }}
            >
                <div className="-mt-[7px] flex flex-col text-xs">
                    <FontAwesomeIcon
                        className="-mb-[7px] rotate-180 text-text-lighter "
                        icon={faChevronDown}
                    />
                    <FontAwesomeIcon
                        className="rotate-180  text-text-lighter "
                        icon={faChevronDown}
                    />
                </div>
                <span className="mx-2 font-medium text-text">น้อยลง</span>
            </div>
            <div className="h-[1px] w-full bg-zinc-200"></div>
        </div>
    );
};

export default Posts;
