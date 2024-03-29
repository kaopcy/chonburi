import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    useJsApiLoader,
    GoogleMap,
    Polyline,
    DirectionsRenderer,
} from "@react-google-maps/api";
import { getCenter, getCenterOfBounds } from "geolib";

// import custom hooks
import {
    useDirectionContext,
    useActiveDirection,
} from "../../../context/DirectionContext";
import {
    usePostsContext,
    usePostContext,
} from "../../../context/Travel/PostContext";
import { useUserLocation } from "../../../context/UserLocationContext";
import { useActiveOtherPlace } from "../../../context/Travel/ActiveOtherPlaceContext";
import { useSelectorContext } from "../../../context/Travel/SelectorContext";
import { useMapSmoothPan } from "../../../composables/useMapSmoothPan";
import { useMapContext } from "../../../context/MapContext";

// import constants
import { mapStyles } from "../../../config/mapConstants/mapStyles";
import { chonburiShape } from "../../../config/mapConstants/chonburiShape";
import {
    TRAVEL_MODE,
    DIRECTION_MODE,
    OTHERPLACE_MODE,
} from "../../../config/selectorConstant";

// import components
import Overlay from "../Detail/Overlay";
import DirectionRouteMarker from "./DirectionRouteMarker";
import UserLocationMarker from "./UserLocationMarker";
import DestinationMarker from "./DestinationMarker";
import DirectionInfoBox from "./DirectionInfoBox";

// import utils
import { getCenterWithOffset } from "../../../utils/map/getCenterWithOffset";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faLocationCrosshairs,
    faMinus,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Map = () => {
    // not fallback
    const { post } = usePostContext();

    const { isLoaded } = useJsApiLoader({
        region: "th",
        language: "th",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    });
    const { userLocation } = useUserLocation();
    const { setDirection, direction } = useDirectionContext();
    const { activeDirectionCoord } = useActiveDirection();
    const { selectedMode } = useSelectorContext();

    const [tempLocation, setTempLocation] = useState(post.coords);

    const { map, setMap } = useMapContext();
    const [isHighlight, setIsHighlight] = useState(true);
    const { smoothlyAnimatePanTo } = useMapSmoothPan();

    const defaultCenter = useMemo(() => {
        if (!userLocation) return null;
        const center = getCenter([userLocation, tempLocation]);
        return { lat: center.latitude, lng: center.longitude };
    }, [userLocation]);

    useEffect(() => {
        if (!map || selectedMode !== DIRECTION_MODE) return;
        // map.panTo(activeDirectionCoord);
        const destCoords = new google.maps.LatLng(
            activeDirectionCoord.lat,
            activeDirectionCoord.lng
        );
        smoothlyAnimatePanTo(getCenterWithOffset(map, destCoords, 0, 50), 15);
    }, [activeDirectionCoord, selectedMode === DIRECTION_MODE]);

    useEffect(() => {
        if (!map || selectedMode !== TRAVEL_MODE) return;
        const destCoords = new google.maps.LatLng(
            tempLocation.lat,
            tempLocation.lng
        );
        smoothlyAnimatePanTo(getCenterWithOffset(map, destCoords, 0, 100), 15);
    }, [selectedMode === TRAVEL_MODE]);

    const calculateDirection = async () => {
        const directionService = new google.maps.DirectionsService();
        const result = await directionService.route({
            origin: userLocation,
            destination: tempLocation,
            travelMode: google.maps.TravelMode.WALKING,
        });
        setDirection(result);
    };

    const onMapLoad = (initmap) => {
        google.maps.event.addListener(initmap, "projection_changed", () => {
            const newCenter = getCenterWithOffset(
                initmap,
                tempLocation,
                0,
                100
            );
            initmap.setCenter(newCenter);
        });
        calculateDirection();
        setMap(initmap);
        chonburiShape.forEach((shape) => {
            const polyline = new google.maps.Polygon({
                fillColor: "#fff",
                fillOpacity: 0.2,
                strokeColor: "#4f4f4f",
                strokeOpacity: 0.6,
                strokeWeight: 2,
            });
            polyline.setMap(initmap);
        });
    };

    return (
        isLoaded &&
        defaultCenter &&
        tempLocation && (
            <>
                <GoogleMap
                    clickableIcons={false}
                    center={tempLocation}
                    zoom={15}
                    mapContainerStyle={{
                        width: "100%",
                        height: "100%",
                    }}
                    options={{
                        clickableIcons: false,
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
                    onLoad={onMapLoad}
                >
                    <DestinationMarker coords={post.coords} />
                    {userLocation && selectedMode === DIRECTION_MODE && (
                        <UserLocationMarker position={userLocation} />
                    )}
                    {selectedMode === OTHERPLACE_MODE && <OtherPlaces />}
                    {activeDirectionCoord && selectedMode === DIRECTION_MODE && (
                        <>
                            <DirectionsRenderer
                                options={{
                                    polylineOptions: {
                                        strokeColor: "rgb(34,197,94)",
                                        strokeWeight: 5,
                                        strokeOpacity: 0.7,
                                    },
                                    suppressMarkers: true,
                                    preserveViewport: true,
                                }}
                                directions={direction}
                            />
                            <DirectionRouteMarker />
                        </>
                    )}
                    {isHighlight &&
                        chonburiShape?.map((shape) => (
                            <Polyline
                                key={shape}
                                options={{
                                    strokeColor: "#4f4f4f",
                                    strokeOpacity: 0.6,
                                    strokeWeight: 2,
                                }}
                                path={[
                                    ...shape.map(
                                        (e) =>
                                            new google.maps.LatLng(
                                                parseFloat(e[1]),
                                                parseFloat(e[0])
                                            )
                                    ),
                                ]}
                            />
                        ))}
                </GoogleMap>
                {selectedMode === TRAVEL_MODE && (
                    <Controller
                        isHighLight={isHighlight}
                        setIsHighLight={setIsHighlight}
                        tempLocation={tempLocation}
                    />
                )}

                {selectedMode === DIRECTION_MODE && <DirectionInfoBox />}
            </>
        )
    );
};

const OtherPlaces = () => {
    const { distanceSortedPost, posts } = usePostsContext();
    const { activeOtherPlace } = useActiveOtherPlace();
    const { map } = useMapContext();

    const [isHideDetail, setIsHideDetail] = useState(false);

    useEffect(() => {
        const listener = map.addListener("zoom_changed", () => {
            if (map.getZoom() < 10) {
                setIsHideDetail(true);
            } else {
                setIsHideDetail(false);
            }
        });
        return () => {
            google.maps.event.removeListener(listener);
        };
    }, [map]);

    useEffect(() => {
        if (activeOtherPlace?.length <= 0) return;
        const newBounds = new google.maps.LatLngBounds();
        activeOtherPlace.forEach((place) => {
            newBounds.extend({ lat: place.coords.lat, lng: place.coords.lng });
        });
        map.fitBounds(newBounds);
    }, [activeOtherPlace]);

    return activeOtherPlace.map((post, index) => (
        <Overlay
            isHideDetail={isHideDetail}
            key={post._id}
            post={post}
            index={index}
        />
    ));
};

const Controller = ({ isHighLight, setIsHighLight, tempLocation }) => {
    const { map } = useMapContext();
    return (
        <>
            <div className="absolute bottom-[calc(12px+70px)] left-3 flex flex-col   md:bottom-3 ">
                <div
                    className="flex-cen mb-2 h-8 w-8 cursor-pointer rounded-full bg-white shadow-lg md:h-9 md:w-9"
                    onClick={() => map.setZoom(map.getZoom() + 1)}
                >
                    <FontAwesomeIcon
                        className="text-xs text-text md:text-sm"
                        icon={faPlus}
                    />
                </div>
                <div
                    className="flex-cen mb-4 h-8 w-8 cursor-pointer rounded-full bg-white shadow-lg md:h-9 md:w-9"
                    onClick={() => map.setZoom(map.getZoom() - 1)}
                >
                    <FontAwesomeIcon
                        className="text-xs text-text md:text-sm"
                        icon={faMinus}
                    />
                </div>
                <div
                    className="flex-cen h-8 w-8 cursor-pointer rounded-full bg-white shadow-lg md:h-9 md:w-9"
                    onClick={() => {
                        map.panTo(
                            new google.maps.LatLng(
                                getCenterWithOffset(map, tempLocation, 0, 100)
                            )
                        );
                    }}
                >
                    <FontAwesomeIcon
                        className="text-sm text-text md:text-base"
                        icon={faLocationCrosshairs}
                    />
                </div>
            </div>
            <div className="absolute bottom-[calc(12px+70px)] left-1/2 flex -translate-x-1/2 items-center rounded-md   bg-white px-[8px] py-[6px] shadow-lg md:bottom-3">
                <div
                    className={`flex-cen mr-2 h-4 w-4 rounded-sm border-2 border-[#008F18] md:h-6 md:w-6 md:rounded-md ${
                        isHighLight ? " bg-[#008F18]" : "bg-white"
                    }`}
                    onClick={() => setIsHighLight((e) => !e)}
                >
                    <FontAwesomeIcon
                        className="text-xs text-white md:text-base"
                        icon={faCheck}
                    />
                </div>
                <div className="text-xs text-text ">ขอบจังหวัดชลบุรี</div>
            </div>
        </>
    );
};

export default Map;
