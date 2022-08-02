import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import gsap from "gsap/dist/gsap";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import SvgSuitcase from "../../icons/Suitcase";

// import Components
import TripMap from "./TripMap";

const TripContent = ({ trip }) => {
    const [activeNum, setActiveNum] = useState(null);
    const stickyMapRef = useRef();

    useEffect(() => {
        const stickyH = stickyMapRef.current.clientHeight;
        const windowH = window.innerHeight;

        const preferredT = `${35 + (windowH / 2 - stickyH / 2)}px`;
        stickyMapRef.current.style.top = preferredT;
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
                <div className="relative flex w-full max-w-[800px] flex-col self-start  px-4 text-sm text-text sm:text-base md:px-8">
                    <div className="absolute top-0 left-14 z-[-1] h-full w-[1.5px] bg-text-lightest md:left-20"></div>
                    {trip.days.map((day, daysIndex) => (
                        <>
                            <div className="mb-8  ml-0 flex items-center bg-white py-2 text-xl font-bold">
                                <div className="mr-3 mt-[2px] w-3 md:w-4">
                                    <SvgSuitcase />
                                </div>
                                <span className="text-base tracking-wide md:text-xl">
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
                                    <span className="text-base tracking-wide md:text-xl">
                                        เดินทางกลับโดยสวัสดิภาพ
                                    </span>
                                </div>
                            )}
                        </>
                    ))}
                </div>
                <div
                    ref={stickyMapRef}
                    className="sticky top-[70px] mt-10  w-full self-start rounded-md px-4  md:mt-0 md:px-0"
                >
                    <TripMap trip={trip} />
                </div>
            </div>
        </>
    );
};

const ActivityCard = ({ activity, activeNum, index, setActiveNum }) => {
    const link = activity.link;
    const isActive = useMemo(
        () => activeNum === activity._key,
        [activity._key, activeNum]
    );

    const textRef = useRef();

    useEffect(() => {
        if (!isActive) return;
        gsap.fromTo(textRef.current, { height: 0 }, { height: "auto" });
    }, [isActive]);

    return (
        <div
            onClick={() => setActiveNum(isActive ? -1 : activity._key)}
            className="mb-4 flex w-full flex-col rounded-lg  border bg-white px-6 py-4 last-of-type:mb-8"
        >
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
                    <div className="mx-3">-</div>
                    <div className="flex flex-col">
                        <div
                            className={`${
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
                                <div href={link}>
                                    <div className="mt-4 self-end text-sm text-primary underline underline-offset-1">
                                        เปิดใน google map
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <FontAwesomeIcon
                    className={`ml-3 text-sm text-text-lighterr ${
                        isActive ? "rotate-180" : "rotate-0"
                    }`}
                    icon={faChevronDown}
                />
            </div>
        </div>
    );
};

export default TripContent;
