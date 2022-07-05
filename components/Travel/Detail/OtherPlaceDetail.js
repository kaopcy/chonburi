import React, {
    useEffect,
    useState,
    useRef,
    useImperativeHandle,
    forwardRef,
    useCallback,
} from "react";
import Image from "next/image";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

// import contexts
import { usePostsContext } from "../../../context/Travel/PostContext";
import { useActiveOtherPlace } from "../../../context/Travel/ActiveOtherPlaceContext";
import useDraggable from "../../../composables/useDraggable";

// import config
import { urlFor } from "../../../lib/sanity";
import { useUserLocation } from "../../../context/UserLocationContext";

// import constants
import { getRestaurantTypeProperties } from "../../../utils/typeUtils";
import { OTHERPLACE_MODE } from "../../../config/selectorConstant";
import * as filterConst from "../../../config/otherplaceFilterConstant";
import { useMemo } from "react";

const OtherPlaceDetail = () => {
    const { posts, distanceSortedPost, distanceSortedByCurrentLocationPost } =
        usePostsContext();
    const { setActiveOtherPlace, activeOtherPlace } = useActiveOtherPlace();
    const { userLocation } = useUserLocation();
    const containerRef = useRef(null);
    const timer = useRef(null);

    const cardsRef = useRef([]);

    const [filter, setFilter] = useState(filterConst.NEAR_ME);
    const filteredPost = useMemo(() => {
        switch (filter) {
            case filterConst.NEAR_ME:
                return distanceSortedPost;
            case filterConst.NEAR_PLACE:
                return distanceSortedByCurrentLocationPost;
            default:
                return null;
        }
    }, [filter]);

    const callActiveOtherPlace = useCallback(() => {
        const newActiveOtherPlace = cardsRef.current
            .map((cardRef) =>
                cardRef?.onScroll(
                    containerRef.current.scrollTop,
                    containerRef.current.clientHeight
                )
            )
            .filter((e) => e);
        if (activeOtherPlace == newActiveOtherPlace) return;
        setActiveOtherPlace([]);
        setActiveOtherPlace(newActiveOtherPlace);
    },[]);
    
    useEffect(() => {
        const onScroll = () => {
            if (timer.current !== null) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(callActiveOtherPlace, 50);
        };
        if (!containerRef.current || cardsRef.current.length === 0) return;
        containerRef.current.addEventListener("scroll", onScroll, false);
        callActiveOtherPlace();
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener(
                    "scroll",
                    onScroll,
                    false
                );
            }
        };
    }, []);

    useEffect(()=>{
        callActiveOtherPlace()
    },[filter])
    
    return (
        <div
            ref={containerRef}
            className="flex h-full w-full shrink-0 flex-col overflow-y-auto p-3 lg:pl-0 lg:pr-8"
            id={`${OTHERPLACE_MODE}-detail`}
        >
            <FilterSlider filter={filter} setFilter={setFilter} />
            {filteredPost &&
                filteredPost.map((post, index) => (
                    <Card
                        ref={(e) => (cardsRef.current[index] = e)}
                        key={post._id}
                        post={post}
                    />
                ))}
        </div>
    );
};

const Card = forwardRef(({ post }, ref) => {
    const cardRef = useRef(null);
    const [isActive, setIsActive] = useState(false);

    const onScroll = (containerScrollTop, containerHeight) => {
        if (!cardRef.current) return;
        const cardTop = cardRef.current.offsetTop;
        const cardH = cardRef.current.clientHeight;

        const cardBot = cardTop + cardH;
        let onScreen = false;
        if (
            cardBot >= containerScrollTop &&
            cardTop <= containerHeight + containerScrollTop
        ) {
            onScreen = true;
        }
        setIsActive(onScreen);
        return onScreen ? post : null;
    };

    const roundedDistance = (distance) => {
        return distance > 1000
            ? `${(distance / 1000).toFixed(2)} กม.`
            : `${distance} ม.`;
    };

    useImperativeHandle(ref, () => ({
        onScroll,
    }));

    return (
        <div
            className={`my-3 flex h-28 w-full  min-w-0 shrink-0  items-center whitespace-nowrap border-b pb-4 text-text transition-transform sm:h-36`}
            ref={cardRef}
        >
            <div className="relative aspect-[12/9] h-full shrink-0 overflow-hidden rounded-xl  shadow-md sm:aspect-[11/9] md:aspect-[12/9]">
                {post.mainImage[2] && (
                    <Image
                        priority="low"
                        layout="fill"
                        objectFit="cover"
                        src={urlFor(post.mainImage[2]).url()}
                    />
                )}
            </div>

            <div className="flex h-full w-full flex-col justify-between overflow-hidden px-3">
                <div className="flex flex-col ">
                    <Type locationType={post.locationType} />
                    <div className=" mt-1 flex min-w-0 items-center justify-between">
                        <h1 className="ellipsis text-lg font-semibold text-text sm:text-xl ">
                            {post.title}
                        </h1>
                    </div>
                    <div className=" flex w-full min-w-0 items-center justify-between text-sm">
                        <div className="ellipsis text-text-lighter">
                            {post.location}
                        </div>
                    </div>
                    <div className=" flex items-center font-light text-text-lighter">
                        {post.tag &&
                            post.tag.map((tag) => (
                                <Tag tag={tag} key={tag._id} />
                            ))}
                    </div>
                </div>
                <div className=""></div>
                <div className=" mt-1 flex items-center text-sm font-light text-text-lighter">
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className="mr-2 text-xs text-red-500"
                    />
                    ระยะห่าง{" "}
                    {post.distance ? roundedDistance(post.distance) : "-- เมตร"}
                    {!post.distance && (
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
});

const Type = ({ locationType }) => {
    const { color, icon, name } = getRestaurantTypeProperties(locationType);
    return (
        <div className="flex items-center  whitespace-nowrap rounded-l-full  text-sm text-text-dark">
            <FontAwesomeIcon
                icon={icon}
                className="mr-1  aspect-square rounded-full p-[5px] text-[10px] text-white"
                style={{ color: "white", backgroundColor: color }}
            />
            <div className=" text-text-lighter">{name}</div>
        </div>
    );
};

const FilterSlider = ({ filter, setFilter }) => {
    const { slider } = useDraggable();
    const match = (cur) => filter === cur;
    return (
        <div className="relative w-full shrink-0 overflow-hidden">
            <div className="absolute top-[81%] left-0 z-10 h-5 w-full bg-white "></div>
            <div
                className="relative flex w-full space-x-3 overflow-x-auto pb-2"
                ref={slider}
            >
                {Object.values(filterConst).map((e) => (
                    <div
                        key={e}
                        onClick={() => setFilter(e)}
                        className={`whitespace-nowrap rounded-full border  border-text-lighterr  px-3 py-1 text-sm  text-text-lighter hover:bg-text hover:text-white ${match(e) && '!bg-text !text-white'}`}
                    >
                        {e}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OtherPlaceDetail;
