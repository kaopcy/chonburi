import React, { useRef } from "react";
import Image from "next/image";
import { useEffect } from "react";

// import hooks
import useIsTouchDevice from "../../composables/useIsTouchDevice";
import { v4 as uuid } from "uuid";

const SLIDER_MARGIN = 30;
const SCROLL_SPEED = 1;
const SCROLL_RATIO = 0.05;
const SLIDER_SPEED = 1;
const SLIDER_COPY = 2;

const HistoryImageSlider = () => {
    const containerRef = useRef(null);
    const sliderRef = useRef([]);

    const scrollListenerRef = useRef([]);
    const resizeListenerRef = useRef([]);
    const intersectObsRef = useRef([]);
    const resizeObsRef = useRef([]);

    const isTouch = useIsTouchDevice();

    useEffect(() => {
        if (!sliderRef.current) return;
        const sliderChildren = [...sliderRef.current[0].children];
        const sliderFirstChild = sliderChildren[0];

        sliderRef.current.forEach((slider, index) => {
            let sliderHeight;
            let imageMargin;

            const initSlider = () => {
                if (!sliderRef.current || !containerRef.current) return;
                sliderRef.current[1].style.right = `${
                    slider.clientWidth + SLIDER_MARGIN
                }px`;

                const imageHeight = sliderFirstChild.clientHeight;
                imageMargin = parseFloat(
                    getComputedStyle(sliderFirstChild).marginBottom.slice(0, 2)
                );
                console.log(imageMargin);
                sliderHeight =
                    (imageHeight + imageMargin) * sliderChildren.length;
                if (index === 0) slider.style.marginTop = `-${sliderHeight}px`;
                else slider.style.marginBottom = `${sliderHeight}px`;
            };
            initSlider();

            let requestID;
            let y = 0;
            let windowHeight = window.innerHeight;

            let startScrollY = 0;
            let easingScrollY = 0;
            let diffScrollY = 0;

            let isIntersecting = false;

            const lerp = (x, y, p) => x + (y - x) * p;
            let containerPosi =
                containerRef.current.getBoundingClientRect().top;

            const scrollAnime = () => {
                if (!sliderRef.current || !containerRef.current) return;

                startScrollY = windowHeight - containerPosi;
                easingScrollY = lerp(easingScrollY, startScrollY, SCROLL_RATIO);
                diffScrollY = startScrollY - easingScrollY;
                const scrollAmount = Math.abs(diffScrollY) / 10;
                const getY = (SLIDER_SPEED + scrollAmount) * SCROLL_SPEED;
                if (index === 0) y += getY;
                else y -= getY;

                if (index === 0 && y >= sliderHeight) y = sliderHeight / 2;
                else if (
                    index === 1 &&
                    y <= -(sliderHeight - containerRef.current.clientHeight)
                )
                    y = -(sliderHeight / 2 - containerRef.current.clientHeight);

                slider.style.transform = "translateY(" + y + "px)";
                if (isIntersecting) {
                    requestID = requestAnimationFrame(scrollAnime);
                }
            };

            scrollListenerRef.current[index] = () => {
                if (!sliderRef.current || !containerRef.current) return;
                containerPosi =
                    containerRef.current.getBoundingClientRect().top;
            };

            intersectObsRef.current[index] = new IntersectionObserver(
                (entries) => {
                    if (!sliderRef.current || !containerRef.current) return;
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            cancelAnimationFrame(requestID);
                            requestID = requestAnimationFrame(scrollAnime);
                            window.addEventListener(
                                "scroll",
                                scrollListenerRef.current[index],
                                {
                                    passive: true,
                                }
                            );
                            isIntersecting = true;
                        } else {
                            cancelAnimationFrame(requestID);
                            window.removeEventListener(
                                "scroll",
                                scrollListenerRef.current[index],
                                { passive: true }
                            );
                            isIntersecting = false;
                        }
                    });
                }
            );

            intersectObsRef.current[index].observe(containerRef.current);

            resizeObsRef.current[index] = new ResizeObserver(() => {
                if (!sliderRef.current || !containerRef.current) return;
                initSlider();
                cancelAnimationFrame(requestID);
                requestID = requestAnimationFrame(scrollAnime);
            });

            resizeObsRef.current[index].observe(sliderFirstChild);

            resizeListenerRef.current[index] = () => {
                windowHeight = window.innerHeight;
            };

            window.addEventListener("resize", resizeListenerRef.current[index]);
        });

        return () => {
            if (resizeListenerRef.current.length > 0)
                resizeListenerRef.current.forEach((e) => {
                    window.removeEventListener("resize", e);
                });
            if (scrollListenerRef.current.length > 0)
                scrollListenerRef.current.forEach((e) => {
                    window.removeEventListener("scroll", e);
                });
            if (intersectObsRef.current.length > 0)
                intersectObsRef.current.forEach((e) => {
                    e.disconnect();
                });
            if (resizeObsRef.current.length > 0)
                resizeObsRef.current.forEach((e) => {
                    e.disconnect();
                });
        };
    }, [isTouch]);

    useEffect(() => {
        console.log("isTouch rerender: ", isTouch);
    }, [isTouch]);

    return (
        <div className="relative mt-24 mb-10 flex h-auto w-full max-w-[1300px]  flex-col justify-end self-center text-text sm:mt-32  md:h-[80vh] md:flex-row">
            <div className="mb-24 flex h-full w-[100%] flex-col items-center justify-center px-4 md:mb-0 xl:w-[80%]">
                <div className="mb-7 sm:mb-10 flex w-full items-center justify-center">
                    <div className="h-[1px] w-[80%] border-t"></div>
                    <div className="mx-3 text-2xl sm:text-4xl font-bold ">ชลบุรี</div>
                    <div className="h-[1px]  w-[80%] border-t"></div>
                </div>
                <div className="mb-7 sm:mb-10 text-base sm:text-xl font-semibold text-center">
                    การท่องเที่ยวแบบวิถีกิน วิถีถิ่น ในจังหวัดชลบุรี
                </div>
                <div className="text-center text-sm sm:text-base font-normal ">
                    นโยบาย Thailand 4.0 ที่มีโมเดลสร้างความ
                </div>
                <div className="text-base sm:text-lg  font-bold ">
                    “มั่นคง มั่งคั่งและยั่งยืน”
                </div>
                <div className="text-center text-sm sm:text-base font-normal ">
                    ส่งผลถึงการส่งเสริมการท่องเที่ยวของไทยให้ก้าวไปสู่
                </div>
                <div className="text-center text-sm sm:text-base font-normal ">
                    การท่องเที่ยวที่เป็นเครื่องมือในการช่วยเหลือ
                </div>
                <div className="text-center text-sm sm:text-base font-normal">
                    สร้างความสุข และการลดความเหลื่อมล้ำทางสังคมให้กับประชาชน
                </div>
            </div>
            <div
                ref={containerRef}
                className="relative flex h-[400px] w-full   justify-end overflow-hidden md:h-full "
            >
                <div
                    ref={(e) => (sliderRef.current[0] = e)}
                    className="absolute flex w-[45%] max-w-[300px] flex-col items-center "
                >
                    {[...Array(SLIDER_COPY)].map(() => (
                        <React.Fragment key={uuid()}>
                            <ImageComponent src="https://lh3.ggpht.com/p/AF1QipM1CGCZ1rEssQseh1Il4euzxrUx4esF0-hnJf7z=s512" />
                            <ImageComponent src="https://lh3.ggpht.com/p/AF1QipNBl5Mu_tkqBpFq_vnK1DD-V3RIr7_RMvc5xgYH=s512" />
                            <ImageComponent src="https://lh3.ggpht.com/p/AF1QipPVnzICqxT217fmc990SfUWzKWhwF4i4mqOVPZ2=s512" />
                            <ImageComponent src="https://lh3.ggpht.com/p/AF1QipMwx7Kd00udbf3ziJXUstngS70mB-nZsrN5r_OY=s512" />
                            <ImageComponent src="https://lh3.ggpht.com/p/AF1QipOd-MWWtI_ZDE2T6AUbaTu44j25H7MV1mo1vokC=s512" />
                        </React.Fragment>
                    ))}
                </div>
                <div
                    ref={(e) => (sliderRef.current[1] = e)}
                    className="absolute flex w-[45%] max-w-[300px] flex-col items-center"
                >
                    {[...Array(SLIDER_COPY)].map(() => (
                        <React.Fragment key={uuid()}>
                            <ImageComponent src="https://lh3.ggpht.com/p/AF1QipOe8YF50UrtooRPmsv_1MwtGYfcrLc7zXG_5In_=s512" />
                            <ImageComponent src="https://lh3.ggpht.com/p/AF1QipORF97Z0LKSJ278MyFmK8KclZ6-Wldfm1Xq95cv=s512" />
                            <ImageComponent src="https://lh3.ggpht.com/p/AF1QipOqlK_EpBf3UzKMUyyWv-BqfRSZQr8MyTrtM1vb=s512" />
                            <ImageComponent src="https://lh3.ggpht.com/p/AF1QipP5zyhdwZZPYa02i9Wekh2kXOMkEmgC9aLmsqQ=s512" />
                            <ImageComponent src="https://lh3.ggpht.com/p/AF1QipMzQ87y3kYUD9i1VKnRgm3lbD8xX5OvunXYavlx=s512" />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ImageComponent = ({ src }) => {
    return (
        <div className="relative mb-4 aspect-[12/9] w-full  md:mb-6 md:aspect-[9/10] ">
            <Image
                quality="low"
                blurDataURL="URL"
                placeholder="blur"
                src={src}
                layout="fill"
                objectFit="cover "
            />
        </div>
    );
};

export default HistoryImageSlider;