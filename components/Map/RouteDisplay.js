import { useEffect, useMemo, useState } from "react";
import gsap from "gsap";

// import icons
import {
    faChevronDown,
    faEllipsisVertical,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import constants
import { maneuverMap } from "../../utils/ManeuverMap";

// import hooks
import useIsTouchDevice from "../../composables/useIsTouchDevice";

const RouteDisplay = ({
    routes,
    setActivePopup,
    userLocationError,
    endPoint,
}) => {
    const isTouch = useIsTouchDevice();
    const [active, setActive] = useState(routes ? 0 : null);
    const shapedRoutes = useMemo(() => {
        const getSplitRoute = (s) => {
            const regex = /(<([^>]+)>)/gi;
            let splitIndex = null;
            splitIndex = s.indexOf("<div");
            if (splitIndex === -1) return { text: s.replace(regex, "") };
            return {
                text: s.slice(0, splitIndex).replace(regex, ""),
                extra: s.slice(splitIndex).replace(regex, ""),
            };
        };

        return routes
            ? routes.steps.map((e) => ({
                  key: e.encoded_lat_lngs,
                  distance: e.distance?.text,
                  icon: maneuverMap(e.maneuver),
                  ...getSplitRoute(e.instructions),
              }))
            : null;
    }, [routes]);

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
    }, [active, isTouch]);

    return (
        <div className="absolute inset-0  z-10 flex  flex-col overflow-y-auto rounded-md bg-white px-2 py-2 sm:border">
            <div className="my-2 mt-6 flex items-center px-[7px] text-xl font-semibold text-text">
                เส้นทาง
                <span className="ml-4 text-base font-light text-text-lighter">
                    ระยะทางรวม {routes.distance.text}
                </span>
            </div>

            <div className="mb-4 flex w-full flex-col">
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                        className="w-6 text-xs text-primary  "
                        icon={faCircle}
                    />
                    <div className="text-base font-light text-text">
                        {userLocationError ? "จากกรุงเทพ" : "ตำแหน่งของคุณ"}
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className=" w-6  text-xl text-gray-400"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                        className=" w-6  text-red-500"
                        icon={faLocationDot}
                    />
                    <div className="text-base font-light text-text">
                        {endPoint}
                    </div>
                </div>
            </div>

            <div className="mb-4 h-[2px] w-[85%] shrink-0 self-center  bg-zinc-100"></div>

            {shapedRoutes.map((route, index) => (
                <div
                    key={route.key}
                    className={`relative flex cursor-pointer flex-col sm:transition-all sm:duration-500 ${
                        active === index && "!py-4"
                    }`}
                    onClick={() => {
                        setActive(index);
                        setActivePopup(index);
                    }}
                >
                    <div className="relative z-10   mb-2 flex h-10 items-center  justify-between rounded-full  p-[7px] text-sm font-light text-text sm:text-base">
                        <div
                            className={`absolute top-0 left-0 h-full w-full rounded-full bg-zinc-100 transition-colors ${
                                active === index && "!bg-white "
                            }`}
                        ></div>
                        <div className="z-10 flex min-w-0 items-center">
                            <div className="relative mr-2  flex items-center">
                                <FontAwesomeIcon
                                    icon={route?.icon}
                                    className={` aspect-square shrink-0 rounded-full bg-zinc-300 p-2 text-white ${
                                        active === index && "!bg-green-500"
                                    }`}
                                />
                                {/* <div className="absolute top-0 h-full  w-[2px] bg-zinc-300 left-1/2"></div> */}
                            </div>

                            <div
                                className={`${
                                    active !== index && "ellipsis font-normal"
                                } font-semibold text-gray-800`}
                            >
                                {route?.text}
                            </div>
                        </div>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`z-10 px-3 text-text-lighter ${
                                active === index &&
                                "rotate-180 transition-transform"
                            }`}
                        />
                    </div>
                    <div
                        className={`relative h-0 w-[90%] self-end overflow-hidden  ${
                            active === index ? "active " : "inactive"
                        }`}
                    >
                        <div
                            className={`absolute top-0 left-0 flex flex-col items-start font-light text-text ${
                                active === index && "text-box-active"
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

export default RouteDisplay;
