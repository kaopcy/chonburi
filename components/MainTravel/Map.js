import React, { useRef, useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap, OverlayView } from "@react-google-maps/api";
import gsap from "gsap/dist/gsap";

// import contexts
import { useMapContext } from "../../context/MainTravel/MapContext";
import { usePostsContext } from "../../context/MainTravel/PostContext";

// import constants - configs
import { mapStyles } from "../../config/mapConstants/mapStyles";

// import components

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMountain,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Map = () => {
    const { postByActiveAmphoe } = usePostsContext();
    const { isOpen, setMap, map } = useMapContext();
    const { isLoaded } = useJsApiLoader({
        region: "th",
        language: "th",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    });
    const mockCenter = useRef({ lat: 13, lng: 102 });
    const [isShowMap, setIsShowMap] = useState(false);

    useEffect(() => {
        const mapRef = document.getElementById("map");
        const evnt = () => {
            if (isOpen) setIsShowMap(true);
        };
        mapRef.addEventListener("transitionend", evnt);
        return () => {
            setIsShowMap(false);
            if (mapRef) mapRef.removeEventListener("transitionend", evnt);
        };
    }, [isOpen]);

    const onMapLoad = (initMap) => {
        setMap(initMap);
    };

    useEffect(() => {
        console.log("postByActiveAmphoe: ", postByActiveAmphoe);
        if (!map) return;
        if (!postByActiveAmphoe || postByActiveAmphoe === undefined) return;
        const newBounds = new google.maps.LatLngBounds();
        postByActiveAmphoe.forEach((place) => {
            console.log(place);
            newBounds.extend({
                lat: parseFloat(place.coords.lat),
                lng: parseFloat(place.coords.lng),
            });
        });
        map.fitBounds(newBounds);
    }, [postByActiveAmphoe, map]);

    return (
        <div
            id="map"
            className={`flex-cen  relative h-full shrink-0 bg-white  transition-all duration-1000 ease-in-out  ${
                isOpen ? "!w-[100%] md:!w-[55%] " : "w-0"
            }`}
        >
            <div className="group absolute top-0  z-10 flex w-full items-center justify-between py-4 md:hidden ">
                <div className="absolute inset-0 bg-white opacity-80"></div>
                <div className="z-10 whitespace-nowrap text-text">
                    {
                        <>
                            <span
                                className={`mr-2 text-[27px] font-semibold ${
                                    isOpen
                                        ? "text-[20px] xl:text-[27px]"
                                        : "text-[18px] sm:text-[22px] lg:text-[27px] "
                                }`}
                            >
                                แหล่งท่องเที่ยว
                                <span className="inline group-focus-within:hidden sm:group-focus-within:inline">
                                    ในชลบุรี
                                </span>
                            </span>
                            <FontAwesomeIcon
                                icon={faMountain}
                                className="text-2xl text-primary-lighter"
                            />
                        </>
                    }
                </div>
                <div
                    className={`z-10 flex w-60 items-center rounded-lg border-2 border-text-lighterr py-1 px-2   
                        ${
                            isOpen
                                ? "w-40 text-sm  xl:w-44 xl:text-base"
                                : "w-24 text-xs group-focus-within:w-24 sm:w-40 sm:group-focus-within:w-40 md:w-60 md:text-base md:group-focus-within:w-60"
                        }`}
                >
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="mr-2 text-text-lightest "
                    />
                    <input
                        type="text"
                        className="w-full bg-transparent placeholder:text-text-lighterr focus:outline-none"
                        placeholder="ค้นหา..."
                    />
                </div>
            </div>
            {isOpen && !isShowMap && (
                <div className=" h-20 w-20 animate-spin rounded-full rounded-tl-none border-2 border-red-400 "></div>
            )}
            {isShowMap && isLoaded && (
                <GoogleMap
                    onLoad={onMapLoad}
                    center={mockCenter.current}
                    zoom={8}
                    mapContainerStyle={{
                        width: "100%",
                        height: "100%",
                    }}
                    options={{
                        gestureHandling: "greedy",
                        restriction: {
                            latLngBounds: {
                                north: 20.4178496363,
                                south: 5.67,
                                west: 97.3758964376,
                                east: 105.589038527,
                            },
                            strictBounds: false,
                        },
                        streetViewControl: false,
                        mapTypeControl: false,
                        zoomControl: false,
                        fullscreenControl: false,
                        styles: mapStyles,
                    }}
                >
                    {postByActiveAmphoe?.map((post, index) => (
                        <Overlay key={post.placeID} post={post} index={index} />
                    ))}
                </GoogleMap>
            )}
        </div>
    );
};

const Overlay = ({ post, index }) => {
    const isLoad = useRef(false);
    const markerRef = useRef(null);
    const timeline = useRef(null);
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
            position={post.coords}
            mapPaneName={OverlayView.FLOAT_PANE}
            onLoad={onLoad}
        >
            <div
                onClick={() => setIsOpen((e) => !e)}
                ref={markerRef}
                className="relative flex max-w-[150px] items-center whitespace-nowrap rounded-full bg-white py-[4px]  px-[4px] font-sarabun shadow-big hover:border-blue-400"
            >
                <div className="ml-2 mr-1 flex min-w-0 flex-col">
                    <div className="ellipsis font-bold">{post.title}</div>
                    <div className="flex items-center text-[10px] text-text-lighterr ">
                        <span>ร้านอาหาร</span>{" "}
                        <span className="mx-1 h-[2.5px] w-[2.5px] shrink-0 rounded-full bg-text-lighter font-light"></span>
                        <span>3 รีวิว</span>
                    </div>
                </div>
            </div>
        </OverlayView>
    );
};

export default Map;
