import { useEffect, useRef } from "react";

const History = () => {
    const testRef = useRef();
    useEffect(() => {
        const scrollEvt = () => {
            const windowScroll = window.scrollY;
            testRef.current.style.top = `${windowScroll}px`;
        };
        window.addEventListener("scroll", scrollEvt);

        return () => {
            window.removeEventListener("scroll", scrollEvt);
        };
    });
    return (
        <div className="flex-cen relative h-[3000px] w-full">
            <div ref={testRef} className="absolute">
                awdwa
            </div>
        </div>
    );
};

export default History;
