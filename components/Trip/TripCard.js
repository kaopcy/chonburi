import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

const BLURRED_URL =
    "data:image/webp;base64,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";

const TripCard = ({ trip, index }) => {
    const firstImage = useMemo(() => trip?.images?.[0], [trip]);
    const [firstQuote, secondQuote] = useMemo(
        () => trip?.title.split("/"),
        [trip]
    );
    const cardTitle = useMemo(
        () =>
            trip.images.reduce(
                (old, e) => `${old}${old.length > 0 ? " , " : ""} ${e.name}`,
                ""
            ),
        [trip]
    );

    return (
        <Link href={`trip/${trip.slug.current}`} passHref>
            <div
                className={`group w-full cursor-pointer   overflow-hidden  ${
                    index === 1 && "md:col-auto lg:col-[span_2]"
                } ${index === 2 && "md:col-[span_2] lg:col-auto"}`}
            >
                <div className="relative flex w-full flex-col">
                    <div className="flex-cen absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black opacity-60 transition-opacity duration-700 group-hover:opacity-80"></div>
                    <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"  >
                        <div className="mb-3 whitespace-nowrap text-center text-4xl font-black text-white ">
                            {firstQuote}
                        </div>
                        <div  className="transition-all h-0 group-hover:h-10 ease-out duration-500 w-[1px] bg-white mx-auto"></div>
                        <div className="whitespace-nowrap text-center text-lg font-medium text-white underline underline-offset-1">
                            {secondQuote}
                        </div>
                    </div>
                    <div className={`relative h-[230px] overflow-hidden `}>
                        <div className="absolute inset-0 transition-transform duration-500  ease-out group-hover:scale-125">
                            <Image
                                layout="fill"
                                alt={firstImage.name}
                                objectFit="cover"
                                quality="low"
                                blurDataURL={BLURRED_URL}
                                placeholder="blur"
                                src={`${firstImage.url.slice()}`}
                                className=""
                            />
                        </div>
                    </div>
                    <div className=" z-20 flex h-10 w-full min-w-0 items-center bg-[#fcfcfc] border px-3 text-sm font-light text-text">
                        <div className="ellipsis">{cardTitle}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default TripCard;
