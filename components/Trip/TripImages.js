import React, { useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const gridLayout = [
    { col: "col-[1/5] md:col-[1/4]", row: "row-[1/3]  md:row-[1/8]" },
    { col: "col-[3/5] md:col-[4/7]", row: "row-[3/7]  md:row-[1/3]" },
    { col: "col-[1/3] md:col-[7/11]", row: "row-[3/5]  md:row-[1/5]" },
    { col: "col-[1/3] md:col-[4/7]", row: "row-[5/7]  md:row-[3/5]" },
    { col: "col-[1/5] md:col-[4/11]", row: "row-[7/9]  md:row-[5/8]" },
];

const TripImages = ({ trip }) => {
    const [firstQuote, secondQuote] = useMemo(
        () => trip?.title.split("/"),
        [trip]
    );
    const layoutRef = useRef();
    const fqRef = useRef();
    const sqRef = useRef();
    const lineRef = useRef();
    const containerRef = useRef();
    const stickyRef = useRef();

    useEffect(() => {
        const resizeEvnt = () => {
            const layoutH = layoutRef.current.clientHeight;
            const windowH = window.innerHeight;
            const isMobile = window.innerWidth < 768;

            const preferredT = (windowH - 70) / 2 - layoutH / 2;

            containerRef.current.style.height = `${windowH + layoutH}px`;
            stickyRef.current.style.top = `${Math.max(preferredT + 70, window.innerWidth > 768 ? 100 : 70)}px`;
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
                lineRef.current,
                {
                    opacity: 0,
                    ease: "power2.out",
                    scaleY: 1.6,
                    yPercent: -100,
                },
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
        <div ref={containerRef} className="mb-10  h-screen w-full ">
            <div ref={stickyRef} className="sticky top-[70px]">
                <div className="relative mb-10 grid  h-[calc(100vh-70px)] w-full grid-cols-4 grid-rows-[repeat(8,_1fr)]  gap-1 px-2 md:aspect-[13/8]   md:h-auto md:grid-cols-9   md:grid-rows-[repeat(7,_1fr)] md:px-0 ">
                    <div
                        ref={layoutRef}
                        className="absolute inset-0 z-30 bg-black opacity-60"
                    ></div>
                    <div className="abs-center z-30  flex flex-col text-center text-white ">
                        <div
                            ref={fqRef}
                            className="mb-3 whitespace-nowrap text-4xl font-black md:mb-4 md:text-6xl"
                        >
                            {firstQuote}
                        </div>
                        <div
                            ref={lineRef}
                            className="mx-auto mb-3 h-14 w-[1px] bg-white md:mb-4"
                        ></div>
                        <div
                            ref={sqRef}
                            className="text-xl font-medium md:text-2xl"
                        >
                            {secondQuote}
                        </div>
                    </div>
                    {gridLayout.map((e, index) => (
                        <ImageComponent
                            key={trip.images[index]._key}
                            {...e}
                            image={trip.images[index]}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const ImageComponent = ({ col, row, image }) => {
    return (
        <div
            className={`relative h-full w-full  overflow-hidden rounded-lg bg-blue-500 ${col} ${row}`}
        >
            <div className="flex-cen absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black opacity-40"></div>
            <div className="md:text-base absolute bottom-2 right-2  z-20 text-right text-sm  font-light text-white ">
                {image.name}
            </div>
            <Image
                layout="fill"
                objectFit="cover"
                quality="low"
                blurDataURL="data:image/webp;base64,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"
                placeholder="blur"
                className=""
                src={image.url}
            />
        </div>
    );
};

export default TripImages;
