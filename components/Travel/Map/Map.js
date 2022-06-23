import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
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

    const { map, setMap, isPanning, setIsPanning } = useMapContext();
    const { smoothlyAnimatePanTo } = useMapSmoothPan();

    const defaultCenter = useMemo(() => {
        if (!userLocation) return null;
        const center = getCenter([userLocation, tempLocation]);
        return { lat: center.latitude, lng: center.longitude };
    }, [userLocation]);

    useEffect(() => {
        if (!map || selectedMode !== DIRECTION_MODE) return;
        console.log("called");
        // map.panTo(activeDirectionCoord);
        const destCoords = new google.maps.LatLng(
            activeDirectionCoord.lat,
            activeDirectionCoord.lng
        );
        smoothlyAnimatePanTo(destCoords, 15);
    }, [activeDirectionCoord, selectedMode === DIRECTION_MODE]);

    useEffect(() => {
        if (!map || selectedMode !== TRAVEL_MODE) return;
        const destCoords = new google.maps.LatLng(
            tempLocation.lat,
            tempLocation.lng
        );
        smoothlyAnimatePanTo(destCoords, 15);
    }, [selectedMode === TRAVEL_MODE]);

    const firstRender = useRef(false);
    useEffect(() => {
        if (!map || firstRender.current) return;
        firstRender.current = true;
        setTimeout(() => {
            const destCoords = new google.maps.LatLng(
                tempLocation.lat,
                tempLocation.lng
            );
            console.log(destCoords.lat(), destCoords.lng());
            smoothlyAnimatePanTo(destCoords, 15);
        }, 1000);
    }, [map]);

    const calculateDirection = async () => {
        const directionService = new google.maps.DirectionsService();
        const result = await directionService.route({
            origin: userLocation,
            destination: tempLocation,
            travelMode: google.maps.TravelMode.WALKING,
        });
        setDirection(result);
    };

    const onMapLoad = (map) => {
        calculateDirection();
        setMap(map);
        chonburiShape.forEach((shape) => {
            const polyline = new google.maps.Polygon({
                fillColor: "#fff",
                fillOpacity: 0.3,
                path: [
                    ...shape.map((e) => ({
                        lat: parseFloat(e[1]),
                        lng: parseFloat(e[0]),
                    })),
                ],
                strokeColor: "#4f4f4f",
                strokeOpacity: 0.6,
                strokeWeight: 2,
            });
            polyline.setMap(map);
        });
    };

    return (
        isLoaded &&
        defaultCenter && (
            <GoogleMap
                center={tempLocation}
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
                onLoad={onMapLoad}
            >
                {userLocation && (
                    <>
                        {/* <Marker
                            position={userLocation}
                            options={{ optimized: true }}
                            animation={google.maps.Animation.DROP}
                        ></Marker> */}
                        <UserLocationMarker position={userLocation} />
                    </>
                )}
                {tempLocation && (
                    <Marker
                        options={{ optimized: true }}
                        position={tempLocation}
                        animation={google.maps.Animation.DROP}
                    />
                )}
                {selectedMode === OTHERPLACE_MODE && <OtherPlaces />}
                {activeDirectionCoord && selectedMode === DIRECTION_MODE && (
                    <>
                        <DirectionsRenderer
                            options={{
                                suppressMarkers: true,
                                preserveViewport: true,
                            }}
                            directions={direction}
                        />
                        <DirectionRouteMarker />
                    </>
                )}
            </GoogleMap>
        )
    );
};

const OtherPlaces = () => {
    const { distanceSortedPost, posts } = usePostsContext();
    const { activeOtherPlace } = useActiveOtherPlace();
    const { map } = useMapContext();

    const [isHideDetail, setIsHideDetail] = useState(false);
    console.log("rerenderred");

    useEffect(() => {
        const listener = map.addListener("zoom_changed", () => {
            if (map.getZoom() < 10) {
                setIsHideDetail(true);
            } else {
                setIsHideDetail(false);
            }
        });
        return ()=> {
            google.maps.event.removeListener(listener)
        }
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

export default Map;
