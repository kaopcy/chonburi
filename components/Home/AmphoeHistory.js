import { useRef, useEffect, useState, forwardRef, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap/dist/gsap";
import { v4 as uuid } from "uuid";
// import images
import AmphoeChonburi from "../../icons/AmphoeChonburi";

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
                console.log("isUp: ", isUp);
                console.log(activeAmphoe);
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

        window.addEventListener("resize", resizeEvt);
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
        window.addEventListener("resize", scrollEvnt);

        return () => {
            window.removeEventListener("touchmove", scrollEvnt);
            window.removeEventListener("scroll", scrollEvnt);
            window.removeEventListener("resize", scrollEvnt);
        };
    }, []);

    return (
        <div className="relative mt-4 w-full bg-[#FFFFFC]  ">
            <div ref={containerRef} className="relative h-[2000px]">
                <div className="sticky  top-[70px] z-10 flex h-auto  w-full translate-y-0  flex-row items-center bg-[#fffffc]    md:top-[calc(100vh/2+20px)] md:w-1/2 md:-translate-y-1/2 md:flex-col ">
                    <div className="absolute top-1/2 right-8 h-[50px] w-[6px] -translate-y-1/2 space-y-1 overflow-hidden ">
                        <div
                            ref={indicatorRef}
                            className="absolute top-1/2 left-0 w-[6px] -translate-y-1/2 space-y-1"
                        >
                            {amphoeConstant.map((e) => (
                                <div
                                    className={`aspect-square w-full rounded-full  ${
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
                            className="flex items-center whitespace-nowrap   font-bold md:text-[28px]"
                        >
                            อำเภอ{currentAmphoe}
                            <div className="mx-4 h-[1.5px] w-full bg-text-lightest"></div>
                        </div>
                        <div
                            ref={redlineContainer}
                            className="mt-2 h-[1.5px] w-14 bg-[#FF5656] md:h-[3.5px] md:w-20"
                        ></div>
                    </div>
                    <div className="relative mx-auto w-full max-w-[250px] px-3 md:max-w-[500px] ">
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
                <div ref={textContainerRef} className="z-0   w-full ">
                    {amphoeConstant.map((amphoe, index) => (
                        <History
                            currentAmphoe={currentAmphoe}
                            amphoe={amphoe}
                            index={index}
                            ref={(e) => (quoteContainer.current[index] = e)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const History = forwardRef(({ currentAmphoe, amphoe, index }, ref) => {
    return (
        <div
            data-amphoe={amphoe.name}
            key={`${amphoe.name}-${amphoe.history}`}
            ref={ref}
            className="quote flex-col-cen mx-auto h-[calc(100vh-120px)] w-full max-w-[500px] border-b "
        >
            <div className="mb-8 text-2xl font-bold">{amphoe.name}</div>
            <div className="">
                <span className="mr-1 ml-10  cursor-pointer text-primary underline underline-offset-1">
                    {amphoe.name}
                </span>
                {amphoe.history}
            </div>
            <div className="mt-4 flex w-full items-center justify-between">
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
                        <div className="flex flex-col ">
                            <div className="text-sm font-semibold">
                                {e.name}
                            </div>
                            <div className="text-xs text-text-lighterr">
                                ต.{amphoe.name}
                            </div>
                            <div className="text-xs text-text-lighterr">
                                ต.{e.tambon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-12 flex items-center self-end font-medium">
                <div className="group  mr-4 flex cursor-pointer items-center  border border-text px-5 py-2 text-sm hover:bg-text ">
                    <div className="mr-2 group-hover:text-white">
                        แหล่งท่องเที่ยว
                    </div>
                    <div className="relative w-3 rotate-180 transition-transform group-hover:rotate-0">
                        <div className="absolute h-[1px] w-full bg-text group-hover:bg-white"></div>
                        <div className="absolute top-0 h-[1px] w-[50%] origin-bottom-left rotate-45 bg-text group-hover:bg-white"></div>
                        <div className="absolute top-0 h-[1px] w-[50%] origin-top-left -rotate-45 bg-text group-hover:bg-white"></div>
                    </div>
                </div>
                <div className="group flex cursor-pointer items-center border border-text bg-text  px-5 py-2 text-sm hover:bg-white">
                    <div className="mr-2 text-white group-hover:text-text">
                        ร้านอาหาร
                    </div>
                    <div className="relative w-3 rotate-180 transition-transform group-hover:rotate-0">
                        <div className="absolute h-[1px] w-full bg-white group-hover:bg-text "></div>
                        <div className="absolute top-0 h-[1px] w-[50%] origin-bottom-left rotate-45 bg-white group-hover:bg-text"></div>
                        <div className="absolute top-0 h-[1px] w-[50%] origin-top-left -rotate-45 bg-white group-hover:bg-text"></div>
                    </div>
                </div>
            </div>
        </div>
    );
});

const DistrictShow = forwardRef(({ currentAmphoeObj, mobile }, ref) => {
    return (
        <div
            ref={ref}
            className={`absolute  bottom-0 right-8  flex-col   items-center rounded-lg border-2 border-text-lighter bg-white p-3 
                ${mobile ? "flex md:hidden" : "hidden md:flex"}
            `}
        >
            <div className="text-sm font-semibold">
                เขตการปกครองแบบภูมิภาค
                <span className="mx-2">
                    {currentAmphoeObj?.district?.length}
                </span>
                ตำบล
            </div>
            <div className="ml-6 grid max-h-[100px] w-full grid-cols-2 overflow-y-auto py-3 text-xs">
                {currentAmphoeObj?.district?.map((e) => (
                    <div className="w-full">- {e}</div>
                ))}
            </div>
        </div>
    );
});

export default AmphoeHistory;
