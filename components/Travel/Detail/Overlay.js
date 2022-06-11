import React, { useEffect, useRef, useState } from "react";

// import dependencies
import gsap from "gsap/dist/gsap";

// import google map stuff
import { OverlayView } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMuseum } from "@fortawesome/free-solid-svg-icons";

const Overlay = ({ post, index }) => {
    const { coords, title } = post;
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
        console.log('hi');
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
                className="relative flex max-w-[100px]  items-center whitespace-nowrap rounded-full border bg-white py-2 px-2 hover:border-blue-400"
            >
                <FontAwesomeIcon
                    icon={faMuseum}
                    className="mr-2 text-[#FF3B8B]"
                />
                <div className="ellipsis">{title}</div>
                {isOpen && <Popup post={post} />}
            </div>
        </OverlayView>
    );
};

const Popup = ({ post }) => {
    const popupRef = useRef(null);
    const animation = useRef(null);

    useEffect(() => {
        console.log(post);
    }, [post]);

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

export default Overlay;
