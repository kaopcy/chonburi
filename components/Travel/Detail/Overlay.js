import React, { useEffect, useRef, useState } from "react";
import { OverlayView } from "@react-google-maps/api";
import gsap from "gsap/dist/gsap";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import constants
import { getRestaurantTypeProperties } from "../../../utils/typeUtils";

const Overlay = ({ post, index, isHideDetail }) => {
    const { coords, title, locationType } = post;
    // onClick stuff
    const [isOpen, setIsOpen] = useState(false);

    // animation stuff
    const markerRef = useRef(null);
    const timeline = useRef(null);
    const isLoad = useRef(false);
    const onLoad = () => {
        isLoad.current = true;
        timeline.current = gsap.timeline();
        if (!markerRef.current) return;
        gsap.set(markerRef.current, { opacity: 0, yPercent: -200 });
        gsap.to(markerRef.current, {
            opacity: 1,
            delay: parseFloat(index * 0.13).toFixed(2),
            yPercent: 0,
            ease: "elastic.out(1.2,0.5)",
            duration: 1,
        });
    };

    useEffect(() => {
        if (isLoad) {
            timeline.current = gsap.timeline();
            if (!markerRef.current) return;
            gsap.set(markerRef.current, { opacity: 0, yPercent: -200 });
            gsap.to(markerRef.current, {
                opacity: 1,
                delay: parseFloat(index * 0.13).toFixed(2),
                yPercent: 0,
                ease: "elastic.out(1.2,0.5)",
                duration: 1,
            });
        }
        return () => {
            if (timeline.current) {
                timeline.current.kill();
            }
        };
    }, []);

    return (
        <OverlayView
            position={coords}
            mapPaneName={OverlayView.FLOAT_PANE}
            onLoad={onLoad}
        >
            <div
                onClick={() => setIsOpen((e) => !e)}
                ref={markerRef}
                className="relative flex max-w-[150px] items-center whitespace-nowrap rounded-full bg-white py-[4px]  px-[4px] font-sarabun shadow-big hover:border-blue-400"
            >
                <Type locationType={locationType} />
                {!isHideDetail && (
                    <div className="flex min-w-0 flex-col ml-2 mr1">
                        <div className="flex items-center text-[10px] text-text-lighterr ">
                            <span>ร้านอาหาร</span>{" "}
                            <span className="h-[2.5px] w-[2.5px] shrink-0 rounded-full bg-text-lighterr mx-1"></span>
                            <span>3 รีวิว</span>
                        </div>
                        <div className="ellipsis">{title}</div>
                    </div>
                )}

                {isOpen && <Popup post={post} />}
            </div>
        </OverlayView>
    );
};

const Popup = ({ post }) => {
    const popupRef = useRef(null);
    const animation = useRef(null);

    useEffect(() => {
        animation.current = gsap.timeline();

        return () => {
            if (animation.current) {
                animation.current.kill();
            }
        };
    }, []);

    return (
        <div className="absolute top-0 left-0 h-10 w-10 rounded-md bg-white shadow-md">
            <div className="">this is popup</div>
        </div>
    );
};

const Type = ({ locationType }) => {
    const { color, icon, name } = getRestaurantTypeProperties(locationType);
    return (
        <FontAwesomeIcon
            icon={icon}
            className=" aspect-square rounded-full p-[7px] text-white "
            style={{ color: "white", backgroundColor: color }}
        />
    );
};

export default Overlay;
