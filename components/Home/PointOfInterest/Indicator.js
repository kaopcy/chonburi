import React, {
    forwardRef,
    useImperativeHandle,
    useState,
    useEffect,
    useRef,
    useMemo,
} from "react";

const Indicator = forwardRef(({ ...props }, ref) => {
    const [indicatorArr, setIndicatorArr] = useState([]);
    const initCardRef = useRef(null);

    const test = useMemo(() => {
        return initCardRef.current?.map((e) => indicatorArr.includes(e));
    }, [indicatorArr]);

    useImperativeHandle(ref, () => ({
        update: (intersect, notIntersect, cardArrRef) => {
            initCardRef.current = cardArrRef;
            setIndicatorArr((old) => [
                ...old.filter((old) => !notIntersect.includes(old)),
                ...intersect,
            ]);
        },
    }));

    useEffect(() => {
        console.log(test);
    }, [test]);

    return (
        <div className="mt-2 flex items-center gap-[4px] md:gap-[6px] mx-auto">
            {test?.map((isActive, index) => (
                <div
                    key={index + "isActive-indicator-restaurant"}
                    className={`h-[5px] w-[5px] md:h-[6px] md:w-[6px] rounded-full border-2  transition-transform ${
                        isActive
                            ? "scale-125 bg-text-lighterr border-text-lighterr"
                            : "scale-100 bg-text-lightest border-text-lightest"
                    } `}
                ></div>
            ))}
        </div>
    );
});

export default Indicator;
