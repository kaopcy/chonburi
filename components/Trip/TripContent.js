import { useEffect, useState, useMemo, useRef } from "react";
import gsap from "gsap/dist/gsap";
import Link from "next/link";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import SvgSuitcase from "../../icons/Suitcase";

// import Components
import TripMap from "./TripMap";
import SvgUtensil from "../../icons/Utensil";
import SvgCar from "../../icons/Car";

const TripContent = ({ trip }) => {
    const [activeNum, setActiveNum] = useState(null);
    const stickyMapRef = useRef();

    useEffect(() => {
        const resizeEvt = () => {
            const stickyH = stickyMapRef.current.clientHeight;
            const windowH = window.innerHeight;
            const preferredT = `${35 + (windowH / 2 - stickyH / 2)}px`;
            if (window.innerWidth > 768)
                stickyMapRef.current.style.top = preferredT;
            else stickyMapRef.current.style.top = 0;
        };
        resizeEvt();
        window.addEventListener("resize", resizeEvt);

        return () => {
            window.removeEventListener("resize", resizeEvt);
        };
    }, []);

    return (
        <>
            <div className="mb-10 flex flex-col text-text sm:mb-20 ">
                <div className="flex self-center text-xl font-bold sm:text-3xl">
                    <span className="mr-2">{trip.title.split("/")[0]}</span>
                    <span className="">{trip.title.split("/")[1]}</span>
                </div>
            </div>
            <div className="relative flex flex-col md:flex-row">
                <div className=" relative flex w-full max-w-[800px] flex-col self-start  px-4 text-sm text-text sm:text-base md:px-8">
                    <div className="absolute top-0 left-14 z-[-1] h-full w-[1.5px] bg-text-lightest md:left-20"></div>
                    {trip.days.map((day, daysIndex) => (
                        <>
                            <div className="mb-8  ml-0 flex items-center bg-white py-2 text-xl font-bold">
                                <div className="mr-3 mt-[2px] w-3 md:w-4">
                                    <SvgSuitcase />
                                </div>
                                <span className="text-base tracking-wide underline underline-offset-1 md:text-xl">
                                    วันที่ {daysIndex + 1}
                                </span>
                            </div>
                            <div key={day._key} className="">
                                {day.activities.map((activity, index) => (
                                    <ActivityCard
                                        key={activity._key}
                                        activity={activity}
                                        activeNum={activeNum}
                                        index={index}
                                        setActiveNum={setActiveNum}
                                    />
                                ))}
                            </div>
                            {daysIndex === trip.days.length - 1 && (
                                <div className="  ml-0 flex items-center bg-white py-2 text-xl font-bold">
                                    <div className="mr-3 mt-[2px] w-3 md:w-4">
                                        <SvgSuitcase />
                                    </div>
                                    <span className="text-base tracking-wide underline underline-offset-1 md:text-xl">
                                        เดินทางกลับโดยสวัสดิภาพ
                                    </span>
                                </div>
                            )}
                        </>
                    ))}
                </div>
                <div
                    ref={stickyMapRef}
                    className="sticky top-[70px] mt-10  flex w-full flex-col items-center  self-start rounded-md px-4 md:mt-0 md:pl-0 md:pr-8"
                >
                    <div className="mb-3 flex items-center text-xl font-bold text-text">
                        <FontAwesomeIcon
                            className="mr-2 mt-1 text-base text-text-lighterr"
                            icon={faMap}
                        />
                        <span>แผนที่แสดงทริป</span>
                    </div>
                    <TripMap
                        activeNum={activeNum}
                        setActiveNum={setActiveNum}
                        trip={trip}
                    />
                </div>
            </div>
        </>
    );
};

const ActivityCard = ({ activity, activeNum, index, setActiveNum }) => {
    const link = activity.link;
    const type = useMemo(() => activity.link?.split("/")[1], [activity]);

    const isActive = useMemo(
        () => activeNum === activity._key,
        [activity._key, activeNum]
    );

    const onCardClick = () => {
        setActiveNum(isActive ? -1 : activity._key);
    };

    const textRef = useRef();

    useEffect(() => {
        if (!isActive) return;
        gsap.fromTo(textRef.current, { height: 0 }, { height: "auto" });
    }, [isActive]);

    return (
        <div className="mb-4 flex w-full flex-col rounded-lg  border bg-white px-6 py-4 last-of-type:mb-8">
            <div className="flex items-center justify-between">
                <div className="relative flex">
                    <div
                        className={`absolute top-[6px] -left-4 h-[9px] w-[9px] rounded-full  sm:top-[7px] sm:-left-3 ${
                            isActive ? "bg-[#00d62d] " : "bg-[#ff4646]"
                        }`}
                    ></div>
                    <div
                        className={`ml-1 w-12 shrink-0 whitespace-nowrap sm:ml-2 sm:w-16 ${
                            isActive ? "font-bold" : "font-medium"
                        }`}
                    >
                        {activity.time} น.
                    </div>
                    {type === "travel" ? (
                        <div className="ml-2 mr-3 mt-[9px] w-[12px]  shrink-0 self-start">
                            <SvgCar stroke="#b0b0b0" />
                        </div>
                    ) : (
                        <div className="ml-2 mr-3 mt-[6px] w-[10px]  shrink-0 self-start">
                            <SvgUtensil stroke="#b0b0b0" />
                        </div>
                    )}
                    <div className=" flex flex-col">
                        <div
                            onClick={onCardClick}
                            className={`cursor-pointer underline-offset-1 hover:underline ${
                                isActive ? "font-bold" : "font-medium"
                            }`}
                        >
                            {activity.name}
                        </div>
                        {isActive && (
                            <div className="flex  flex-col py-3  font-extralight leading-6 tracking-wide">
                                <div ref={textRef} className="">
                                    {activity.detail}
                                </div>
                                <Link href={link} passHref>
                                    <div className="mt-8 cursor-pointer self-end text-sm text-primary underline underline-offset-1 hover:text-blue-500 ">
                                        {link.split("/")[2]}
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <FontAwesomeIcon
                    onClick={onCardClick}
                    className={`ml-3 cursor-pointer py-1 text-sm text-text-lighterr ${
                        isActive ? "rotate-180" : "rotate-0"
                    }`}
                    icon={faChevronDown}
                />
            </div>
        </div>
    );
};

export default TripContent;
