import { useEffect, useRef } from "react";
const useDraggable = (
    options = {
        speed: 1,
    }
) => {
    const slider = useRef(null);
    useEffect(() => {
        if (!slider.current) return;
        slider.current.style.transition = "all 0.4s";
        slider.current.style.overflowY = "hidden";
        slider.current.style.cursor = "grab";
        let isDown = false;
        let startX;
        let scrollLeft;

        var velX = 0;
        var momentumID;

        const onMouseDown = (e) => {
            isDown = true;
            slider.current.style.cursor = "grabbing";
            startX = e.pageX - slider.current.offsetLeft;
            scrollLeft = slider.current.scrollLeft;
            cancelMomentumTracking();
        };

        const onMouseLeave = () => {
            isDown = false;
            slider.current.style.cursor = "grab";
        };
        const onMouseUp = () => {
            isDown = false;
            slider.current.style.cursor = "grab";
            beginMomentumTracking();
        };

        const onMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.current.offsetLeft;
            const walk = (x - startX) * options.speed; //scroll-fast
            var prevScrollLeft = slider.current.scrollLeft;
            slider.current.scrollLeft = scrollLeft - walk;
            velX = slider.current.scrollLeft - prevScrollLeft;
        };

        const onWheel = (e) => {
            cancelMomentumTracking();
        };

        slider.current.addEventListener("mousedown", onMouseDown, { passive: true });
        slider.current.addEventListener("mouseleave", onMouseLeave, { passive: true });
        slider.current.addEventListener("mouseup", onMouseUp, { passive: true });
        slider.current.addEventListener("mousemove", onMouseMove, { passive: true });
        slider.current.addEventListener("wheel", onWheel, { passive: true });

        function beginMomentumTracking() {
            cancelMomentumTracking();
            momentumID = requestAnimationFrame(momentumLoop);
        }
        function cancelMomentumTracking() {
            cancelAnimationFrame(momentumID);
        }
        function momentumLoop() {
            if (!slider.current) return;
            slider.current.scrollLeft += velX;
            velX *= 0.95;
            if (Math.abs(velX) > 0.2) {
                momentumID = requestAnimationFrame(momentumLoop);
            }
        }
        return () => {
            if (slider.current) {
                slider.current.removeEventListener("mousedown", onMouseDown);
                slider.current.removeEventListener("mouseleave", onMouseLeave);
                slider.current.removeEventListener("mouseup", onMouseUp);
                slider.current.removeEventListener("mousemove", onMouseMove);
                slider.current.removeEventListener("wheel", onWheel);
            }
        };
    }, []);

    return { slider };
};

export default useDraggable;
