import React, { useRef, useEffect } from "react";
import gsap from "gsap/dist/gsap";

// import Icons
import SvgSearch from "../../icons/Search";

const SearchBar = () => {
    const overlayRef = useRef();
    const formRef = useRef();
    const lastInputTop = useRef(0);
    const onSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        gsap.set(overlayRef.current, { autoAlpha: 0 });
    }, []);

    const onInputFocus = () => {
        gsap.to(overlayRef.current, { autoAlpha: 0.7 });
        document.body.style.overflow = "hidden";
        lastInputTop.current =
            formRef.current.getBoundingClientRect().top -
            formRef.current.clientHeight;

        formRef.current.style.transform = `translate(-50%,-${lastInputTop.current}px)`;
        formRef.current.style.zIndex = `1030`;
    };

    const onInputBlur = () => {
        gsap.to(overlayRef.current, { autoAlpha: 0 });
        document.body.style.overflow = "auto";
        formRef.current.style.transform = `translate(-50%,50%)`;
        formRef.current.style.zIndex = `10`;
    };

    return (
        <>
            <div
                ref={overlayRef}
                className="fixed invisible top-0 left-0 z-[1020]  h-full w-full bg-black opacity-50"
            ></div>
            <form
                ref={formRef}
                onSubmit={onSubmit}
                className="absolute left-1/2 bottom-0 z-10  flex w-full -translate-x-1/2 translate-y-1/2 px-5 transition-transform duration-500"
            >
                <div className=" mx-auto flex h-[50px] w-full max-w-[800px]  items-center rounded-full bg-white px-3 py-3 shadow-xl md:h-[70px] md:px-6 md:py-4">
                    <div className="mr-3 w-8 shrink-0 p-1 ">
                        <SvgSearch strokeWidth={44} />
                    </div>
                    <div className="mr-3 h-full w-[3px] bg-text-lightest md:mr-5"></div>
                    <input
                        onFocus={onInputFocus}
                        onBlur={onInputBlur}
                        type="text"
                        className="h-full w-full border-none text-lg text-text outline-none placeholder:text-text-lightest md:text-xl "
                        placeholder="ค้นหาในชลบุรี . . ."
                    />
                </div>
            </form>
        </>
    );
};

export default SearchBar;
