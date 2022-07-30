import React, {
    forwardRef,
    useImperativeHandle,
    useState,
    useEffect,
    useRef,
    useMemo,
} from "react";

const Indicator = forwardRef(({ length }, ref) => {
    const [indicatorArr, setIndicatorArr] = useState([]);
    const initCardRef = useRef(null);

    const dotArrRef = useRef([]);

    const indicator = useMemo(() => {
        return initCardRef.current?.map((e) => indicatorArr.includes(e));
    }, [indicatorArr]);

    useImperativeHandle(ref, () => ({
        updateScroll: (min, max) => {
            dotArrRef.current.forEach((dot, index) => {
                if (index >= min && index < max) {
                    dot.style.transform = "scale(1.25)";
                    dot.style.backgroundColor = "#C2C2C2";
                } else {
                    dot.style.transform = "scale(1)";
                    dot.style.backgroundColor = "#DFDFDF";
                }
            });
        },
    }));

    return (
        <div className="mx-auto mt-2 flex items-center gap-[4px] md:gap-[6px]">
            {[...Array(length)].map((_, index) => (
                <div
                    ref={(e) => (dotArrRef.current[index] = e)}
                    key={index + "isActive-indicator-restaurant"}
                    className="h-[5px] w-[5px] rounded-full  bg-text-lightest transition-transform  md:h-[6px] md:w-[6px] "
                ></div>
            ))}
        </div>
    );
});

export default Indicator;
