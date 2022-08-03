import React, { useRef, useMemo, useEffect, useState } from "react";
import {
    useJsApiLoader,
    GoogleMap,
    DirectionsRenderer,
} from "@react-google-maps/api";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

// import constants - configs
import { mapStyles } from "../../config/mapConstants/mapStyles";

// import components
import TripMarker from "../../components/Trip/TripMarker";

const TripMap = ({ trip, activeNum, setActiveNum }) => {
    const { isLoaded } = useJsApiLoader({
        region: "th",
        language: "th",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    });

    const map = useRef(/**@type google.maps.Map */ null);
    const [direction, setDirection] = useState(null);

    const placesGeo = useMemo(
        () =>
            trip.days
                ?.map((day) =>
                    day.activities
                        .filter((act) => act.lat)
                        .map((act) => ({
                            lat: act.lat,
                            lng: act.lng,
                            name: act.link.split("/")[2],
                            ...act,
                        }))
                )
                .flat(),
        [trip]
    );

    console.log(placesGeo);

    const mockCenter = useRef({ lat: 13, lng: 102 });

    // * Map control
    const fitBounds = () => {
        const newBounds = new google.maps.LatLngBounds();
        placesGeo.forEach((place) => {
            console.log(place.lat);
            newBounds.extend({
                lat: parseFloat(place.lat),
                lng: parseFloat(place.lng),
            });
        });
        map.current.fitBounds(newBounds);
    };

    const zoomIn = () => {
        if (!map.current) return;
        map.current.setZoom(map.current.getZoom() + 1);
    };

    const zoomOut = () => {
        if (!map.current) return;
        map.current.setZoom(map.current.getZoom() - 1);
    };

    // * Map init
    const directionInit = async () => {
        const waypoints = [];
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();

        placesGeo.forEach((place) => {
            const location = new google.maps.LatLng(place.lat, place.lng);
            waypoints.push({ location, stopover: true });
        });

        const origin = new google.maps.LatLng(
            placesGeo[0].lat,
            placesGeo[0].lng
        );
        const destination = new google.maps.LatLng(
            placesGeo[placesGeo.length - 1].lat,
            placesGeo[placesGeo.length - 1].lng
        );
        const req = {
            origin,
            destination,
            waypoints,
            travelMode: google.maps.TravelMode.WALKING,
        };

        const results = await directionsService.route(req);
        setDirection(results);
    };

    const onMapLoad = (/**@type google.maps.Map */ initMap) => {
        map.current = initMap;
        if (!placesGeo) return;
        fitBounds();
        directionInit();
    };

    return (
        <div className="flex-cen relative h-[70vh]   w-full shrink-0 overflow-hidden rounded-lg  bg-white transition-all duration-1000  ease-in-out">
            {isLoaded && (
                <>
                    <FitButton fitBounds={fitBounds} />
                    <ZoomInButton zoomIn={zoomIn} />
                    <ZoomOutButton zoomOut={zoomOut} />
                    <GoogleMap
                        clickableIcons={false}
                        onLoad={onMapLoad}
                        center={mockCenter.current}
                        zoom={8}
                        mapContainerStyle={{
                            width: "100%",
                            height: "100%",
                        }}
                        options={{
                            clickableIcons: false,
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
                        {placesGeo.map((e) => (
                            <TripMarker
                                setActiveNum={setActiveNum}
                                isActive={activeNum === e._key}
                                key={e._key}
                                coords={{ lat: e.lat, lng: e.lng }}
                                {...e}
                            />
                        ))}

                        {direction && (
                            <DirectionsRenderer
                                directions={direction}
                                options={{ suppressMarkers: true }}
                            />
                        )}
                    </GoogleMap>
                </>
            )}
        </div>
    );
};

const FitButton = ({ fitBounds }) => {
    return (
        <div
            onClick={fitBounds}
            className="flex-cen absolute bottom-2 left-2 z-10 aspect-square w-7 cursor-pointer rounded-full bg-white shadow-lg"
        >
            <FontAwesomeIcon className="text-sm text-text" icon={faExpand} />
        </div>
    );
};

const ZoomInButton = ({ zoomIn }) => {
    return (
        <div
            onClick={zoomIn}
            className="flex-cen absolute bottom-[88px] left-2 z-10 aspect-square w-7 cursor-pointer rounded-full bg-white shadow-lg"
        >
            <FontAwesomeIcon className="text-sm text-text" icon={faPlus} />
        </div>
    );
};

const ZoomOutButton = ({ zoomOut }) => {
    return (
        <div
            onClick={zoomOut}
            className="flex-cen absolute bottom-14 left-2 z-10 aspect-square w-7 cursor-pointer rounded-full bg-white shadow-lg"
        >
            <FontAwesomeIcon className="text-sm text-text" icon={faMinus} />
        </div>
    );
};

export default TripMap;
