import React, { useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const gridLayout = [
    { col: "col-[1/4]", row: "row-[1/8] " },
    { col: "col-[4/7]", row: "row-[1/3]" },
    { col: "col-[7/11]", row: "row-[1/5]" },
    { col: "col-[4/7]", row: "row-[3/5]" },
    { col: "col-[4/11]", row: "row-[5/8]" },
];

const TripImages = ({ trip }) => {
    const [firstQuote, secondQuote] = useMemo(
        () => trip?.title.split("/"),
        [trip]
    );
    const layoutRef = useRef();
    const fqRef = useRef();
    const sqRef = useRef();
    const containerRef = useRef();

    useEffect(() => {
        const resizeEvnt = () => {
            containerRef.current.style.height = `${
                window.innerHeight + layoutRef.current.clientHeight
            }px`;
        };
        resizeEvnt();
        window.addEventListener("resize", resizeEvnt);

        gsap.timeline({
            scrollTrigger: {
                trigger: layoutRef.current,
                start: "top top",
                scrub: 1,
                end: "bottom",
            },
        })
            .to(layoutRef.current, {
                opacity: 0,
                duration: 1,
            })
            .to(
                fqRef.current,
                { yPercent: -200, opacity: 0, ease: "power2.out" },
                "<"
            )
            .to(
                sqRef.current,
                { yPercent: -200, opacity: 0, ease: "power2.out" },
                "<0.1"
            );

        return () => {
            window.removeEventListener("resize", resizeEvnt);
        };
    }, []);

    return (
        <div ref={containerRef} className="mb-10  h-screen w-full">
            <div className="sticky top-[70px]">
                <div className="relative mb-10 grid aspect-[13/10]  w-full grid-cols-9   grid-rows-[repeat(7,_1fr)]   gap-0 md:aspect-[13/8] ">
                    <div
                        ref={layoutRef}
                        className="absolute inset-0 z-30 bg-black opacity-40"
                    ></div>
                    <div className="abs-center z-30  flex flex-col text-center text-white ">
                        <div
                            ref={fqRef}
                            className="mb-3 whitespace-nowrap text-4xl font-black md:mb-6 md:text-6xl"
                        >
                            {firstQuote}
                        </div>
                        <div
                            ref={sqRef}
                            className="text-xl font-medium md:text-2xl"
                        >
                            {secondQuote}
                        </div>
                    </div>
                    {gridLayout.map((e, index) => (
                        <ImageComponent {...e} image={trip.images[index]} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const ImageComponent = ({ col, row, image }) => {
    return (
        <div className={`relative  h-full w-full bg-blue-500 ${col} ${row}`}>
            {/* <div className="flex-cen absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black opacity-50"></div> */}
            <div className="absolute bottom-2 right-2 z-20  font-light text-white ">
                {image.name}
            </div>
            <Image
                layout="fill"
                objectFit="cover"
                quality="low"
                blurDataURL="URL"
                placeholder="blur"
                className=""
                src={image.url}
            />
        </div>
    );
};

export default TripImages;
