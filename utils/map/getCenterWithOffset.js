export const getCenterWithOffset = (initmap , latlng, offsetx, offsety) => {
    var scale = Math.pow(2, initmap.getZoom());
    var worldCoordinateCenter = initmap
        .getProjection()
        .fromLatLngToPoint(latlng);
    var pixelOffset = new google.maps.Point(
        offsetx / scale || 0,
        offsety / scale || 0
    );

    var worldCoordinateNewCenter = new google.maps.Point(
        worldCoordinateCenter.x - pixelOffset.x,
        worldCoordinateCenter.y + pixelOffset.y
    );

    var newCenter = initmap
        .getProjection()
        .fromPointToLatLng(worldCoordinateNewCenter);
    return newCenter
};
