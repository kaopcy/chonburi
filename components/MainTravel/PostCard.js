import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { v4 as uuid } from "uuid";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faStar,
    faChevronRight,
    faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

const PostCard = ({
    placeID,
    imageURL,
    title,
    amphoe,
    tambon,
    isOpen,
    reviews,
    star,
}) => {
    const imageCount = useMemo(
        () => (imageURL ? imageURL.length : 0),
        [imageURL]
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
            className={`flex flex-col overflow-hidden    text-text ${
                isOpen
                    ? "w-full xl:w-[260px] 2xl:w-[290px]"
                    : "w-full md:w-[260px] 2xl:w-[290px]"
            }`}
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
                <Indicator imageCount={imageCount} curIndex={curIndex} />
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
                <div className="font-medium">{title}</div>
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
                    <span className="">ระยะห่าง 90 กม.</span>
                </span>

                <span className="ellipsis text-xs">
                    <span className=" mr-1">อ. {amphoe.name}</span>
                    <span className="">ต. {tambon.name}</span>
                </span>
            </div>
        </div>
    );
};

const ImageComponent = ({ imageURL, title }) => {
    return (
        <div
            className="relative  aspect-[13/9] w-full shrink-0 overflow-hidden"
            key={imageURL._key}
        >
            <Image
                alt={title}
                quality="low"
                layout="fill"
                objectFit="cover"
                src={imageURL.url}
                blurDataURL="URL"
                placeholder="blur"
            />
        </div>
    );
};

const Indicator = ({ imageCount, curIndex }) => {
    return (
        <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center">
            {[...Array(imageCount)].map((_, index) => (
                <div
                    className={`mx-[3px] h-[6px] w-[6px] rounded-full border border-white ${
                        curIndex === index && "scale-125 bg-white"
                    }`}
                    key={uuid()}
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
