import { useRef } from "react";
import { useMapContext } from "../context/MapContext";

export const useMapSmoothPan = () => {
    const { map } = useMapContext();
    const initzoom = useRef(null);

    const project = (latLng) => {
        var TILE_SIZE = 256;

        var siny = Math.sin((latLng.lat() * Math.PI) / 180);

        siny = Math.min(Math.max(siny, -0.9999), 0.9999);
        return new google.maps.Point(
            TILE_SIZE * (0.5 + latLng.lng() / 360),
            TILE_SIZE *
                (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))
        );
    };

    const getPixel = (latLng, zoom) => {
        var scale = 1 << zoom;
        var worldCoordinate = project(latLng);
        return new google.maps.Point(
            Math.floor(worldCoordinate.x * scale),
            Math.floor(worldCoordinate.y * scale)
        );
    };

    const getMapDimenInPixels = () => {
        var zoom = map.getZoom();
        var bounds = map.getBounds();
        var southWestPixel = getPixel(bounds.getSouthWest(), zoom);
        var northEastPixel = getPixel(bounds.getNorthEast(), zoom);
        return {
            width: Math.abs(southWestPixel.x - northEastPixel.x),
            height: Math.abs(southWestPixel.y - northEastPixel.y),
        };
    };

    const willAnimatePanTo = (destLatLng, optionalZoomLevel) => {
        var dimen = getMapDimenInPixels();
        var mapCenter = map.getCenter();
        optionalZoomLevel = !!optionalZoomLevel
            ? optionalZoomLevel
            : map.getZoom();

        var destPixel = getPixel(destLatLng, optionalZoomLevel);
        var mapPixel = getPixel(mapCenter, optionalZoomLevel);
        var diffX = Math.abs(destPixel.x - mapPixel.x);
        var diffY = Math.abs(destPixel.y - mapPixel.y);

        return diffX < dimen.width && diffY < dimen.height;
    };

    const getOptimalZoomOut = (latLng, currentZoom) => {
        if (willAnimatePanTo(latLng, currentZoom - 1)) {
            return currentZoom - 1;
        } else if (willAnimatePanTo(latLng, currentZoom - 2)) {
            return currentZoom - 2;
        } else {
            return currentZoom - 3;
        }
    };

    const smoothlyAnimatePanToWorkarround = (
        destLatLng,
        optionalAnimationEndCallback
    ) => {
        var initialZoom = initzoom.current || map.getZoom(),
            listener;
        console.log("initzoom: ", initialZoom);

        function zoomIn() {
            if (map.getZoom() < initialZoom) {
                map.setZoom(Math.min(map.getZoom() + 3, initialZoom));
            } else {
                google.maps.event.removeListener(listener);

                //here you should (re?)enable only the ui controls that make sense to your app
                map.setOptions({
                    draggable: true,
                    zoomControl: true,
                    scrollwheel: true,
                    disableDoubleClickZoom: false,
                });

                if (!!optionalAnimationEndCallback) {
                    optionalAnimationEndCallback();
                }
            }
        }

        function zoomOut() {
            if (willAnimatePanTo(destLatLng)) {
                google.maps.event.removeListener(listener);
                listener = google.maps.event.addListener(map, "idle", zoomIn);
                map.panTo(destLatLng);
            } else {
                map.setZoom(getOptimalZoomOut(destLatLng, map.getZoom()));
            }
        }

        //here you should disable all the ui controls that your app uses
        map.setOptions({
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
        });

        map.setZoom(getOptimalZoomOut(destLatLng, initialZoom));
        listener = google.maps.event.addListener(map, "idle", zoomOut);
    };

    const smoothlyAnimatePanTo = (destLatLng, zoom) => {
        initzoom.current = zoom || null;
        if (willAnimatePanTo(destLatLng, initzoom.current || null)) {
            map.panTo(destLatLng);
        } else {
            smoothlyAnimatePanToWorkarround(destLatLng);
        }
    };
    return {
        smoothlyAnimatePanTo,
    };
};
