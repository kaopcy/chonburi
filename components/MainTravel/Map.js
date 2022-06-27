import React, { useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import { mapStyles } from "../../config/mapConstants/mapStyles";

// import contexts
import { useMapContext } from "../../context/MainTravel/MapContext";

const Map = () => {
    const { isOpen, setMap } = useMapContext();
    const { isLoaded } = useJsApiLoader({
        region: "th",
        language: "th",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    });
    const [isShowMap, setIsShowMap] = useState(false);

    useEffect(() => {
        console.log("isloaded", isLoaded);
    }, [isLoaded]);

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

    return (
        <div
            id="map"
            className={`flex-cen  relative h-full shrink-0 bg-white  transition-all duration-1000 ease-in-out  ${
                isOpen ? "!w-[100%] md:!w-[55%] " : "w-0"
            }`}
        >
            {isOpen && !isShowMap && (
                <div className=" h-20 w-20 animate-spin rounded-full rounded-tl-none border-2 border-red-400 "></div>
            )}
            {isShowMap && isLoaded && (
                <GoogleMap
                    onLoad={onMapLoad}
                    center={new google.maps.LatLng(13, 102)}
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
                ></GoogleMap>
            )}
        </div>
    );
};

export default Map;
