import { useRef, useEffect, useState, forwardRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap/dist/gsap";
import { v4 as uuid } from "uuid";
// import images
import AmphoeChonburi from "../../icons/AmphoeChonburi";
import AmphoeChonburiMobile from "../../icons/AmphoeChonburiMobile";

// import constants
import { amphoeConstant } from "../../config/homeConstants/AmphoeConstant";

const AmphoeHistory = () => {
    const [currentAmphoe, setCurrentAmphoe] = useState("เกาะสีชัง");
    const currentAmphoeObj = useMemo(
        () => amphoeConstant.filter((e) => e.name === currentAmphoe)[0],
        [currentAmphoe]
    );

    const containerRef = useRef();
    const svgRef = useRef();
    const process = useRef(0);

    const quoteContainer = useRef([]);
    const topicRef = useRef();
    const indicatorRef = useRef();
    const redlineContainer = useRef();

    const textContainerRef = useRef();
    const districtRef = useRef();

    useEffect(() => {
        if (!quoteContainer.current) return;

        const quoteElements = document.querySelectorAll(".quote");
        let activeAmphoe = [];
        let lastScroll = 0;
        const observer = new IntersectionObserver(
            (entries) => {
                const newAmphoe = entries.filter((e) => e.isIntersecting)[0]
                    ?.target.dataset.amphoe;
                const outAmphoe = entries.filter((e) => !e.isIntersecting)[0]
                    ?.target.dataset.amphoe;
                if (newAmphoe) activeAmphoe.push(newAmphoe);
                if (outAmphoe)
                    activeAmphoe = activeAmphoe.filter((e) => e != outAmphoe);

                const isUp = lastScroll > window.scrollY;
                lastScroll = window.scrollY;
                setCurrentAmphoe((e) =>
                    activeAmphoe[0]
                        ? isUp
                            ? activeAmphoe[1]
                                ? activeAmphoe[1]
                                : activeAmphoe[0]
                            : activeAmphoe[0]
                        : e
                );
            },
            {
                root: null,
                rootMargin: "-100px 0px 0px 0px",
                threshold: 0,
            }
        );

        observer.observe(quoteElements[0]);

        quoteContainer.current.forEach((quote) => {
            observer.observe(quote);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        let curAmphoeIndex = 0;
        amphoeConstant.forEach((e, index) => {
            if (e.name === currentAmphoe) curAmphoeIndex = index;
        });

        gsap.to(indicatorRef.current, {
            yPercent: `${curAmphoeIndex * -10}`,
            ease: "elastic.out(0.5,0.3)",
            duration: 1,
            overwrite: true,
        });
        svgRef.current.setColor();
        gsap.fromTo(
            redlineContainer.current,
            {
                scaleX: 0,
            },
            {
                scaleX: 1,
                ease: "elastic.out(0.5,0.3)",
                duration: 1,
                overwrite: true,
            }
        );
        gsap.fromTo(
            topicRef.current,
            {
                xPercent: 10,
            },
            {
                xPercent: 0,
                ease: "elastic.out(0.5,0.3)",
                duration: 1.2,
                overwrite: true,
            }
        );
        if (districtRef.current) {
            gsap.fromTo(
                districtRef.current,
                {
                    scale: 0.9,
                },
                {
                    scale: 1,
                    ease: "elastic.out(0.5,0.3)",
                    duration: 0.9,
                    overwrite: true,
                }
            );
        }
    }, [currentAmphoe]);

    useEffect(() => {
        const resizeEvt = () => {
            if (quoteContainer.current[0]) {
                containerRef.current.style.height = `${
                    quoteContainer.current[0].clientHeight *
                        (amphoeConstant.length + 1) -
                    quoteContainer.current[0].clientHeight / 4
                }px`;
            }

            if (window.innerWidth > 768)
                textContainerRef.current.style.paddingTop = `${
                    svgRef.current.getSvgRef().clientHeight / 2
                }px`;
            else
                textContainerRef.current.style.paddingTop = `${
                    svgRef.current.getSvgRef().clientHeight * 2
                }px`;
        };

        window.addEventListener("resize", resizeEvt, { passive: true });
        resizeEvt();
        return () => {
            window.removeEventListener("resize", resizeEvt);
        };
    }, []);

    useEffect(() => {
        containerRef.current.style.paddingTop = `${
            svgRef.current.getSvgRef().clientHeight
        }px`;

        const scrollEvnt = () => {
            if (!containerRef.current) return;
            const containerEnd =
                containerRef.current.offsetTop +
                containerRef.current.clientHeight -
                window.innerHeight;
            const { clientHeight: containerHeight, offsetTop: containerTop } =
                containerRef.current;

            const isEnter =
                window.scrollY > containerTop && window.scrollY < containerEnd;
            const isOut = window.scrollY > containerEnd;

            const preferredContainerH = containerHeight - window.innerHeight;

            process.current =
                100 -
                ((containerRef.current.getBoundingClientRect().top +
                    preferredContainerH) /
                    preferredContainerH) *
                    100;

            // if (isEnter) {
            //     svgRef.current.setColor(process.current);
            // }
            if (isOut) console.log("out");
        };
        scrollEvnt();
        window.addEventListener("scroll", scrollEvnt, { passive: true });
        window.addEventListener("touchmove", scrollEvnt, { passive: true });
        window.addEventListener("resize", scrollEvnt, { passive: true });

        return () => {
            window.removeEventListener("touchmove", scrollEvnt);
            window.removeEventListener("scroll", scrollEvnt);
            window.removeEventListener("resize", scrollEvnt);
        };
    }, []);

    return (
        <div className="relative mt-4 w-full bg-[#FFFFFC]  ">
            <div ref={containerRef} className="relative h-[2000px]">
                <div className="sticky top-[70px] z-10 hidden h-auto  w-[90%]  translate-y-0    flex-row items-center bg-white md:top-[calc(100vh/2+20px)] md:flex    md:w-1/2 md:-translate-y-1/2 md:flex-col md:bg-[#fffffc] ">
                    <div className="absolute top-1/2 right-8 h-[50px] w-[6px] -translate-y-1/2 space-y-1 overflow-hidden ">
                        <div
                            ref={indicatorRef}
                            className="absolute top-1/2 left-0 w-[6px] -translate-y-1/2 space-y-1"
                        >
                            {amphoeConstant.map((e, index) => (
                                <div
                                    key={`history-indicator-${index}`}
                                    className={`hidden aspect-square w-full rounded-full md:block  ${
                                        e.name === currentAmphoe
                                            ? "bg-text"
                                            : "bg-text-lightest"
                                    }`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div className=" mx-auto  flex w-full max-w-[500px] flex-col md:mb-10">
                        <div
                            ref={topicRef}
                            className="flex items-center self-start whitespace-nowrap rounded-md border border-text  px-3 py-[6px] font-medium md:border-none md:p-0 md:text-[28px] md:font-bold"
                        >
                            อำเภอ{currentAmphoe}
                            <div className="mx-4 hidden h-[1.5px] w-full bg-text-lightest md:block"></div>
                        </div>
                        <div
                            ref={redlineContainer}
                            className="mt-2 h-[1.5px] w-14 bg-[#FF5656] md:h-[3.5px] md:w-20"
                        ></div>
                    </div>
                    <div className="relative mx-auto w-full max-w-[250px] bg-transparent px-3 md:max-w-[500px]">
                        <AmphoeChonburi
                            ref={svgRef}
                            currentAmphoe={currentAmphoe}
                        />
                    </div>
                    <DistrictShow
                        ref={districtRef}
                        currentAmphoeObj={currentAmphoeObj}
                    />
                </div>
            </div>
            <div className="absolute top-0 left-0 flex w-full">
                <div className="hidden w-full md:block "></div>
                <div
                    ref={textContainerRef}
                    className="z-0 flex w-full flex-col"
                >
                    {amphoeConstant.map((amphoe, index) => (
                        <History
                            ref={(e) => (quoteContainer.current[index] = e)}
                            key={`history-${amphoe.name}-${index}`}
                            amphoe={amphoe}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const History = forwardRef(({ amphoe }, ref) => {
    return (
        <div
            data-amphoe={amphoe.name}
            key={`${amphoe.name}-${amphoe.history}`}
            ref={ref}
            className="quote flex-col-cen relative mx-auto min-h-[calc(100vh-120px)] w-full max-w-[500px] border-b py-10 px-3 md:py-0 md:px-0"
        >
            <div className="sticky top-[70px]  z-10 mb-4 flex w-full items-center justify-between bg-white py-2 md:hidden">
                <div className="text-xl font-medium">อำเภอ{amphoe.name}</div>
                <div className="relative w-[100px]">
                    <AmphoeChonburiMobile currentAmphoe={amphoe.name} />
                </div>
            </div>
            <div className="mb-4 hidden text-xl font-bold md:mb-8 md:block md:text-2xl">
                {amphoe.name}
            </div>
            <div className="text-sm md:text-base">
                <span className="mr-1 ml-10  cursor-pointer text-primary underline underline-offset-1">
                    {amphoe.name}
                </span>
                {amphoe.history}
            </div>
            <DistrictShow mobile currentAmphoeObj={amphoe} />
            <div className="mt-4 grid w-full grid-cols-2 items-center justify-between gap-y-2 md:flex md:flex-wrap md:gap-y-0">
                {amphoe.images.map((e) => (
                    <div
                        className="flex items-center"
                        key={`${e.name}-${e.url}`}
                    >
                        <div className="relative mr-2 h-12 w-12 shrink-0 overflow-hidden rounded-full">
                            <Image
                                layout="fill"
                                objectFit="cover"
                                alt={e.name}
                                quality="low"
                                blurDataURL={"URL"}
                                placeholder="blur"
                                src={e.url}
                                className=""
                            />
                        </div>
                        <div className="flex min-w-0 flex-col">
                            <div className="ellipsis text-xs font-semibold md:text-sm">
                                {e.name}
                            </div>
                            <div className="ellipsis text-xs text-text-lighterr md:text-xs">
                                ต.{amphoe.name}
                            </div>
                            <div className="ellipsis text-xs text-text-lighterr md:text-xs">
                                ต.{e.tambon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-12 flex items-center self-end font-medium">
                <Link href={`/travel?amphoe=${amphoe.name}&map=true`} passHref>
                    <div className="group  mr-4 flex cursor-pointer items-center  border border-text px-5 py-2 text-sm hover:bg-text ">
                        <>
                            <div className="mr-2 group-hover:text-white">
                                แหล่งท่องเที่ยว
                            </div>
                            <div className="relative w-3 rotate-180 transition-transform group-hover:translate-x-2 group-hover:rotate-0">
                                <div className="absolute h-[1px] w-full bg-text group-hover:bg-white"></div>
                                <div className="absolute top-0 h-[1px] w-[50%] origin-bottom-left rotate-45 bg-text group-hover:bg-white"></div>
                                <div className="absolute top-0 h-[1px] w-[50%] origin-top-left -rotate-45 bg-text group-hover:bg-white"></div>
                            </div>
                        </>
                    </div>
                </Link>
                <Link
                    href={`/restaurant?amphoe=${amphoe.name}&map=true`}
                    passHref
                >
                    <div className="group flex cursor-pointer items-center border border-text bg-text  px-5 py-2 text-sm hover:bg-white">
                        <div className="mr-2 text-white group-hover:text-text">
                            ร้านอาหาร
                        </div>
                        <div className="relative w-3 rotate-180 transition-transform group-hover:translate-x-2 group-hover:rotate-0">
                            <div className="absolute h-[1px] w-full bg-white group-hover:bg-text "></div>
                            <div className="absolute top-0 h-[1px] w-[50%] origin-bottom-left rotate-45 bg-white group-hover:bg-text"></div>
                            <div className="absolute top-0 h-[1px] w-[50%] origin-top-left -rotate-45 bg-white group-hover:bg-text"></div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
});

const DistrictShow = forwardRef(({ currentAmphoeObj, mobile }, ref) => {
    return (
        <div
            ref={ref}
            className={`w-auto  flex-col items-center rounded-lg border-2 border-text-lighter bg-white p-3 pb-0 md:w-[150px] md:pb-3 lg:w-auto
                ${
                    mobile
                        ? "relative  mt-5 mb-3 flex self-center md:hidden"
                        : "absolute right-8 -bottom-[50px] hidden md:-bottom-[40px] md:flex lg:bottom-0 "
                }
            `}
        >
            <div className="text-sm font-semibold">
                เขตการปกครองแบบภูมิภาค
                <span className="mx-2">
                    {currentAmphoeObj?.district?.length}
                </span>
                ตำบล
            </div>
            <div className="ml-6 grid w-full grid-cols-2 overflow-y-auto py-3 text-xs md:max-h-[100px] md:grid-cols-1 lg:grid-cols-2">
                {currentAmphoeObj?.district?.map((e, index) => (
                    <div
                        key={`${mobile ? "mobile" : "desktop"}-${index}-${
                            currentAmphoeObj.name
                        }`}
                        className="w-full"
                    >
                        - {e}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default AmphoeHistory;
