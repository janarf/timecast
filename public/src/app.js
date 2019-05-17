
function getRouteTime(waypointString0, waypointString1) {
    fetch(`https://route.api.here.com/routing/7.2/calculateroute.json
?app_id=lT3yqAJmOo0tSCEDAY24
&app_code=fd9_LnoGgmj6hkcLl2RhNQ
&waypoint0=${waypointString0}
&waypoint1=${waypointString1}
&routeattributes=wp,sm,sh,sc
&mode=fastest;${$('#transport').val()}`).then(res => res.json())
        .then(res => {
            if ($('#transport').val() == 'car') {
                console.log(res.response.route[0].summary.trafficTime)
            } else {
                console.log(res.response.route[0].summary.baseTime)

            }
        })
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
}
function getPosition(userPosition) {
    var platform = new H.service.Platform({
        'app_id': 'lT3yqAJmOo0tSCEDAY24',
        'app_code': 'fd9_LnoGgmj6hkcLl2RhNQ'
    });
    var defaultLayers = platform.createDefaultLayers();
    let map = new H.Map(
        $('#mapContainer')[0],
        defaultLayers.normal.map, {
            zoom: 15,
            center: { lat: userPosition.coords.latitude, lng: userPosition.coords.longitude }
        });
    var marker = new H.map.Marker({
        lat: userPosition.coords.latitude,
        lng: userPosition.coords.longitude
    });
    map.addObjects([marker])

    $("#address-search").on('click', (e) => {
        e.preventDefault();
        var geocodingParams = {
            searchText: $("#address-search-bar").val()
        };
        var geocoder = platform.getGeocodingService();
        let userpoint = `geo!${userPosition.coords.latitude},${userPosition.coords.longitude}`
        console.log($("#address-search-bar").val().split(' ').join('+'))

        fetch(`https://geocoder.api.here.com/6.2/geocode.json?app_id=lT3yqAJmOo0tSCEDAY24&app_code=fd9_LnoGgmj6hkcLl2RhNQ&searchtext=${$("#address-search-bar").val().split(' ').join('+')}`)
            .then(res => res.json()).then(result => {
                let destiny = `geo!${result.Response.View[0].Result[0].Location.DisplayPosition.Latitude},${result.Response.View[0].Result[0].Location.DisplayPosition.Longitude}`
                console.log(destiny)
                getRouteTime(userpoint, destiny)
                var routingParameters = {
                    // The routing mode:
                    'mode': `fastest;${$('#transport').val()};traffic:enabled`,
                    // The start point of the route:
                    'waypoint0': userpoint,
                    // The end point of the route:
                    'waypoint1': destiny,
                    // To retrieve the shape of the route we choose the route
                    // representation mode 'display'
                    'representation': 'display',
                };

                // Define a callback function to process the routing response:
                var onResult = function (result) {
                    var route,
                        routeShape,
                        startPoint,
                        endPoint,
                        linestring;

                    if (result.response.route) {
                        // Pick the first route from the response:
                        route = result.response.route[0];
                        // Pick the route's shape:
                        routeShape = route.shape;

                        // Create a linestring to use as a point source for the route line

                        linestring = new H.geo.LineString();

                        // Push all the points in the shape into the linestring:
                        routeShape.forEach(function (point) {
                            var parts = point.split(',');
                            linestring.pushLatLngAlt(parts[0], parts[1]);
                        });

                        // Retrieve the mapped positions of the requested waypoints:
                        startPoint = route.waypoint[0].mappedPosition;
                        endPoint = route.waypoint[1].mappedPosition;

                        // Create a polyline to display the route:
                        var routeLine = new H.map.Polyline(linestring, {
                            style: { strokeColor: 'blue', lineWidth: 10 }
                        });
                        var endMarker = new H.map.Marker({
                            lat: endPoint.latitude,
                            lng: endPoint.longitude
                        });

                        // Add the route polyline and the two markers to the map:
                        map.addObjects([routeLine, endMarker]);

                        // Set the map's viewport to make the whole route visible:
                        map.setViewBounds(routeLine.getBounds());
                    }
                };
                var router = platform.getRoutingService();
                // Call calculateRoute() with the routing parameters,
                // the callback and an error callback function (called if a
                // communication error occurs):
                router.calculateRoute(routingParameters, onResult,
                    function (error) {
                        alert(error.message);
                    });
                // })
            })
    })

}

function getRoute(userPosition) {


}

function searchDestiny() {
    $("#address-search").on('click', (e) => {
        e.preventDefault();
    })
}
getLocation()