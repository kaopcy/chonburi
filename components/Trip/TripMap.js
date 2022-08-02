import React, { useRef, useMemo, useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

// import constants - configs
import { mapStyles } from "../../config/mapConstants/mapStyles";

const TripMap = ({ trip }) => {
    const { isLoaded } = useJsApiLoader({
        region: "th",
        language: "th",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    });

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

    const onMapLoad = (/**@type google.maps.Map */ initMap) => {
        if (!placesGeo) return;
        const newBounds = new google.maps.LatLngBounds();
        placesGeo.forEach((place) => {
            console.log(place.lat);
            newBounds.extend({
                lat: parseFloat(place.lat),
                lng: parseFloat(place.lng),
            });
        });
        initMap.fitBounds(newBounds);
    };

    return (
        <div className="flex-cen relative h-[70vh]   w-full shrink-0 overflow-hidden rounded-lg  bg-white transition-all duration-1000  ease-in-out">
            {isLoaded && (
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
                    {placesGeo.map((e) => (
                        <Marker
                            key={e._key}
                            position={{ lat: e.lat, lng: e.lng }}
                        />
                    ))}
                </GoogleMap>
            )}
        </div>
    );
};

export default TripMap;
