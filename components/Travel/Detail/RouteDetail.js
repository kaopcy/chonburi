import { useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { useRouter } from "next/dist/client/router";

// import icons
import {
    faChevronDown,
    faEllipsisVertical,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import constants
import { maneuverMap } from "../../../utils/ManeuverMap";
import {
    DIRECTION_MODE,
    OTHERPLACE_MODE,
    TRAVEL_MODE,
} from "../../../config/selectorConstant";

// import hooks
import useIsTouchDevice from "../../../composables/useIsTouchDevice";
import { useActiveDirection } from "../../../context/DirectionContext";
import { useUserLocation } from "../../../context/UserLocationContext";
import { useDirectionContext } from "../../../context/DirectionContext";

// currentRoutes={direction?.currentRoutes[0].legs[0]}

const RouteDetail = ({ setIsOpen }) => {
    const isTouch = useIsTouchDevice();
    const { userLocation, userLocationError } = useUserLocation();
    const { currentRoutes, shapedRoutes } = useDirectionContext();
    const endPoint = useRouter().query.slug;
    const { setActiveDirectionNumber, activeDirectionNumber } =
        useActiveDirection();

    if (!currentRoutes)
        return (
            <div
                className="flex h-full w-full shrink-0 flex-col overflow-y-auto bg-blue-100 px-3 xl:px-5"
                id={`${DIRECTION_MODE}-detail`}
            ></div>
        );

    useEffect(() => {
        const height = gsap.getProperty(".text-box-active", "height");
        const active = gsap.utils.toArray(".active")[0];

        if (isTouch || isTouch === null) {
            gsap.set(".inactive", {
                height: `0`,
                overwrite: true,
            });
            gsap.set(active, {
                height: `${height + 10}px`,
                overwrite: true,
            });
            return;
        }

        gsap.to(".inactive", {
            ease: "power4.out",
            height: `${0}px`,
            overwrite: true,
        });
        gsap.to(active, {
            ease: "power4.out",
            height: `${height + 10}px`,
            overwrite: true,
        });
    }, [activeDirectionNumber, isTouch]);

    return (
        <div
            className="flex h-full w-full shrink-0 flex-col overflow-y-auto  overflow-x-hidden px-3 xl:px-5"
            id={`${DIRECTION_MODE}-detail`}
        >
            <div className="my-4 flex w-full flex-col">
                <div className="mt-2 flex items-center space-x-2">
                    <div className="relative mx-1  h-4 w-4 shrink-0 rounded-full bg-primary">
                        <div className="absolute inset-[5px] rounded-full bg-white"></div>
                    </div>
                    <div className="flex w-full items-center justify-between text-lg font-semibold text-text">
                        {userLocationError ? "จากกรุงเทพ" : "ตำแหน่งของคุณ"}{" "}
                        <span className="text-base font-light text-text-lighter">
                            ห่าง {currentRoutes.distance.text}
                        </span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className=" w-6  text-xl text-text-lighterr"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                        className=" w-6  text-red-500"
                        icon={faLocationDot}
                    />
                    <div className="text-lg font-semibold text-text">
                        {endPoint}
                    </div>
                </div>
            </div>

            <div className="mb-4 h-[1px] w-[110%] shrink-0 self-center  bg-zinc-100"></div>

            {shapedRoutes.map((route, index) => (
                <div
                    key={route.key}
                    className={`relative flex cursor-pointer flex-col sm:transition-all sm:duration-500   ${
                        activeDirectionNumber === index && "!py-4"
                    }`}
                    onClick={() => {
                        setActiveDirectionNumber(index);
                        isTouch && setIsOpen(false);
                    }}
                >
                    <div className="relative z-10   mb-2 flex h-10 items-center  justify-between rounded-full  p-[7px] text-sm font-light text-text sm:text-base">
                        <div
                            className={`group absolute top-0 left-0 h-full w-full rounded-full  bg-[#C8C8C81A] transition-colors hover:border-2 hover:border-primary ${
                                activeDirectionNumber === index && "!bg-white "
                            }`}
                        ></div>
                        <div
                            className={`flex min-w-0 items-center  ${
                                activeDirectionNumber === index && "z-10"
                            }`}
                        >
                            <div className="relative mr-2  flex items-center ">
                                <FontAwesomeIcon
                                    icon={route?.icon}
                                    className={` aspect-square shrink-0 rounded-full bg-[#DDDDDD] p-2 text-white ${
                                        activeDirectionNumber === index &&
                                        "!bg-green-500"
                                    }`}
                                />
                                {/* <div className="absolute top-0 h-full  w-[2px] bg-zinc-300 left-1/2"></div> */}
                            </div>

                            <div
                                className={`${
                                    activeDirectionNumber !== index &&
                                    "ellipsis font-normal"
                                } font-semibold text-gray-800`}
                            >
                                {route?.text}
                            </div>
                        </div>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`z-10 px-3 text-text-lighter ${
                                activeDirectionNumber === index &&
                                "rotate-180 transition-transform"
                            }`}
                        />
                    </div>
                    <div
                        className={`relative h-0 w-[90%] self-end overflow-hidden  ${
                            activeDirectionNumber === index
                                ? "active "
                                : "inactive"
                        }`}
                    >
                        <div
                            className={`absolute top-0 left-0 flex flex-col items-start font-light text-text ${
                                activeDirectionNumber === index &&
                                "text-box-active"
                            }`}
                        >
                            <div className="">- ระยะทาง: {route.distance}</div>
                            {route.extra && (
                                <div className="">- {route.extra}</div>
                            )}
                        </div>
                    </div>
                    <div className="absolute top-0 left-[23px]  h-full w-[2px] bg-zinc-100"></div>
                </div>
            ))}
        </div>
    );
};

export default RouteDetail;
