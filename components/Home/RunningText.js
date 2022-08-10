import { useEffect, useRef } from "react";
import gsap from "gsap/dist/gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookAtlas,
    faMapLocationDot,
    faMountain,
    faMugHot,
    faPlane,
    faRoute,
    faUtensils,
} from "@fortawesome/free-solid-svg-icons";

const DURATION = 10;
const PADDING = "20px";

const RunningText = () => {
    const container = useRef(null);
    const rootContainer = useRef(null);
    const animate = useRef(null);
    useEffect(() => {
        const onResize = () => {
            if (!rootContainer.current) return;
            //  clear animation on resize event
            if (animate.current) {
                animate.current.kill();
                animate.current = null;
            }
            const allBox = gsap.utils.toArray(".box");
            // find allwidth (include padding) of element
            const allWidth = allBox.reduce(
                (prev, cur) => (prev += cur.clientWidth),
                0
            );
            // find time scale for duration
            const timeScale = allWidth / 600;

            // find element that have most width
            const mostElWidth = allBox.reduce(
                (prev, cur) => Math.max(prev, cur.clientWidth),
                0
            );
            // find offset of all element gap
            const offset = Math.max(
                0,
                parseInt(
                    (
                        (rootContainer.current.clientWidth -
                            allWidth +
                            mostElWidth) /
                        allBox.length
                    ).toFixed(2)
                )
            );

            let width = 0;
            allBox.forEach((e) => {
                gsap.set(e, {
                    x: width + offset,
                });
                width += e.clientWidth + offset;
            });

            const fixedWidth = Math.max(
                rootContainer.current.clientWidth + mostElWidth,
                allWidth
            );
            gsap.set(container.current, { left: -mostElWidth });
            animate.current = gsap.to(".box", {
                duration: DURATION * timeScale,
                ease: "none",
                x: `+=${fixedWidth}`,
                modifiers: {
                    x: gsap.utils.unitize((x) => parseFloat(x) % fixedWidth),
                },
                repeat: -1,
                overwrite: true,
            });
        };
        onResize();
        window.addEventListener("resize", onResize , { passive: true });
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    const textList = [
        {
            name: "ชลบุรี",
            icon: faPlane,
        },
        {
            name: "แหล่งท่องเที่ยว",
            icon: faMountain,
        },
        {
            name: "ร้านอาหาร",
            icon: faUtensils,
        },
        {
            name: "คาเฟ่",
            icon: faMugHot,
        },
        {
            name: "ร้านกาแฟ",
            icon: faMugHot,
        },
        {
            name: "โปรแกรมท่องเที่ยว",
            icon: faBookAtlas,
        },
        {
            name: "แผนที่",
            icon: faMapLocationDot,
        },
        {
            name: "เส้นทาง",
            icon: faRoute,
        },
    ];

    return (
        <div
            ref={rootContainer}
            className="relative mx-auto mt-20 flex h-14 w-full max-w-[1300px] overflow-hidden  border-t-2 border-b-2 border-t-gray-100 border-b-gray-100"
        >
            <div ref={container} className="relative left-[-80px]">
                {textList.map((text) => (
                    <div
                        key={text.name}
                        className="box absolute flex h-full cursor-default items-center whitespace-nowrap  text-text-lighter"
                        style={{ padding: PADDING }}
                    >
                        <div className="mr-2 text-base sm:text-xl">
                            {text.name}
                        </div>
                        <FontAwesomeIcon
                            icon={text.icon}
                            className="text-xs text-text-lightest sm:text-sm"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RunningText;
