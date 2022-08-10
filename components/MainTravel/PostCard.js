import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getDistance } from "geolib";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faStar,
    faChevronRight,
    faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

// import hook
import { useUserLocation } from "../../context/UserLocationContext";

const PostCard = React.memo(({ post, type, isOpen }) => {
    const { placeID, imageURL, title, amphoe, tambon, slug, reviews, star } =
        post;
    const imageCount = useMemo(
        () => (imageURL ? imageURL.length : 0),
        [imageURL]
    );
    const { userLocation } = useUserLocation();
    const distance = useMemo(
        () =>
            userLocation && post
                ? (
                      getDistance(
                          { lat: userLocation.lat, lng: userLocation.lng },
                          { lat: post.coords.lat, lng: post.coords.lng }
                      ) / 1000
                  ).toFixed(2)
                : null,
        [userLocation, post.coords]
    );

    const imageContainerRef = useRef(null);
    const prevTouchX = useRef(null);
    const startTouchX = useRef(null);
    const deltaX = useRef(null);

    const [curIndex, setCurIndex] = useState(0);

    const increase = () => {
        setCurIndex((old) => (old >= imageCount - 1 ? old : old + 1));
    };
    const decrease = () => {
        setCurIndex((old) => (old <= 0 ? old : old - 1));
    };

    const onTouchMove = (e) => {
        const curTouchX = e.touches[0].clientX;
        const curLeftX = parseFloat(
            imageContainerRef.current.style.left.slice(0, -2)
        );
        deltaX.current = prevTouchX.current
            ? curTouchX - prevTouchX.current
            : 0;
        if (
            (curIndex < imageCount - 1 && deltaX.current < 0) ||
            (curIndex > 0 && deltaX.current > 0)
        ) {
            imageContainerRef.current.style.left = `${
                curLeftX + deltaX.current
            }px`;
        }
        imageContainerRef.current.style.transitionProperty = "none";
        prevTouchX.current = curTouchX;
    };

    const onTouchEnd = () => {
        imageContainerRef.current.style.transitionProperty = "all";
        const deltaStartX = prevTouchX.current
            ? Math.abs(startTouchX.current) - Math.abs(prevTouchX.current)
            : 0;
        console.log(Math.abs(deltaStartX));
        if (Math.abs(deltaStartX) < 100) {
            imageContainerRef.current.style.left = `${
                curIndex * -imageContainerRef.current.clientWidth
            }px`;
        } else {
            deltaX.current < 0 ? increase() : decrease();
        }
        deltaX.current = null;
        prevTouchX.current = null;
    };

    useEffect(() => {
        imageContainerRef.current.style.left = `${
            curIndex * -imageContainerRef.current.clientWidth
        }px`;
    }, [curIndex]);

    return (
        <div
            className={`flex shrink-0 flex-col  overflow-hidden  text-text ${
                isOpen
                    ? "w-full xl:w-[260px] 2xl:w-[290px]"
                    : "w-full md:w-[260px] 2xl:w-[290px]"
            } `}
            key={placeID}
        >
            <div
                onTouchStart={(e) =>
                    (startTouchX.current = e.touches[0].clientX)
                }
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className="relative mb-2 aspect-[13/9] w-full shrink-0 overflow-hidden  rounded-xl"
                key={imageURL[0]._key}
            >
                <div
                    ref={imageContainerRef}
                    className="absolute top-0 left-0 flex  aspect-[13/9] w-full flex-nowrap transition-all duration-700 "
                >
                    {imageURL.map((e) => (
                        <ImageComponent
                            imageURL={e}
                            key={e._key}
                            title={title}
                        />
                    ))}
                    {/* <ImageComponent imageURL={imageURL[0]} />
                        <ImageComponent imageURL={imageURL[0]} /> */}
                </div>
                <Controller
                    increase={increase}
                    decrease={decrease}
                    curIndex={curIndex}
                    imageCount={imageCount}
                />
                <Indicator
                    placeID={placeID}
                    imageCount={imageCount}
                    curIndex={curIndex}
                />
                <div className="absolute top-4 right-0 z-10 flex items-center overflow-hidden rounded-l-lg px-2 py-[3px] text-white">
                    <div className="absolute inset-0 z-0 bg-black opacity-40"></div>
                    <span className="z-30 mr-1 text-sm font-light ">
                        {reviews ? Object.keys(reviews).length : 0} รีวิว
                    </span>
                    <FontAwesomeIcon
                        className="z-30 -rotate-45 text-xs"
                        icon={faPencilAlt}
                    />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <Link
                    href={`/${
                        type === "restaurant" ? "restaurant" : "travel"
                    }/${slug.current}`}
                    passHref
                >
                    <a className="font-medium underline-offset-1 hover:underline">
                        {title}
                    </a>
                </Link>
                <div className="flex items-center">
                    <span className="mr-1 text-sm">{star}</span>
                    <FontAwesomeIcon
                        className="text-xs text-yellow-200"
                        icon={faStar}
                    />
                </div>
            </div>
            <div className="flex justify-between font-light text-text-lighter">
                <span className="text-xs ">
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className="mr-[6px] text-red-400"
                    />
                    <span className="">ระยะห่าง {distance} กม.</span>
                </span>

                <span className="ellipsis text-xs">
                    <span className=" mr-1">อ. {amphoe.name}</span>
                    <span className="">ต. {tambon.name}</span>
                </span>
            </div>
        </div>
    );
});

const ImageComponent = ({ imageURL, title }) => {
    return (
        <div
            className="relative  aspect-[13/9] w-full shrink-0 overflow-hidden"
            key={imageURL._key}
        >
            <Image
                layout="fill"
                objectFit="cover"
                src={imageURL.url}
                alt={title}
                quality="low"
                blurDataURL="data:image/jpeg;base64,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"
                placeholder="blur"
            />
        </div>
    );
};

const Indicator = ({ placeID, imageCount, curIndex }) => {
    return (
        <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center">
            {[...Array(imageCount)].map((_, index) => (
                <div
                    className={`mx-[3px] h-[6px] w-[6px] rounded-full border border-white ${
                        curIndex === index && "scale-125 bg-white"
                    }`}
                    key={`main-card-indicator-${curIndex}-${index}-${placeID}`}
                ></div>
            ))}
        </div>
    );
};

const Controller = ({ increase, decrease, imageCount, curIndex }) => {
    return (
        <>
            <button
                name="ย้อนกลับ"
                disabled={curIndex === 0}
                onClick={() => decrease()}
                className="flex-cen group absolute top-1/2 left-2 z-10 h-8 w-8 -translate-y-1/2  cursor-pointer overflow-hidden rounded-full border-white text-white hover:border-2 disabled:hidden"
            >
                <div className="absolute inset-0 hidden bg-black opacity-40 group-hover:block"></div>
                <FontAwesomeIcon
                    className="z-10 rotate-180"
                    icon={faChevronRight}
                />
            </button>
            <button
                name="ถัดไป"
                disabled={curIndex === imageCount - 1}
                onClick={() => increase()}
                className="flex-cen group absolute top-1/2 right-2   z-10 h-8 w-8 -translate-y-1/2  cursor-pointer overflow-hidden rounded-full border-white text-white hover:border-2 disabled:hidden"
            >
                <div className="absolute inset-0 hidden bg-black opacity-40 group-hover:block"></div>
                <FontAwesomeIcon className="z-10" icon={faChevronRight} />
            </button>
        </>
    );
};

export default PostCard;
