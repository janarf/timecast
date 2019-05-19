const transport = ['car', 'bicycle', 'pedestrian'];

function getRouteTime(waypointString0, waypointString1) {
  transport.forEach(
    mean => {
      fetch(`https://route.api.here.com/routing/7.2/calculateroute.json
?app_id=lT3yqAJmOo0tSCEDAY24
&app_code=fd9_LnoGgmj6hkcLl2RhNQ
&waypoint0=${waypointString0}
&waypoint1=${waypointString1}
&routeattributes=wp,sm,sh,sc
&mode=fastest;${mean};traffic:enabled`)
        .then(res => res.json())
        .then(res => {
          if (mean == 'car') {
            localStorage.setItem(mean, res.response.route[0].summary.trafficTime);
            $(`#${mean}-time`).html(
              moment.utc(res.response.route[0].summary.trafficTime * 1000)
                .format('HH:mm'))
          } else {
            localStorage.setItem(mean, res.response.route[0].summary.baseTime)
            $(`#${mean}-time`).html(
              moment.utc(res.response.route[0].summary.baseTime * 1000)
                .format('HH:mm'))
          }
        })
    }
  )
}

function getRoute(transportMean) {

  let userPoint = `geo!${localStorage.getItem("latitude")},${localStorage.getItem("longitude")}`

  fetch(`https://geocoder.api.here.com/6.2/geocode.json?app_id=lT3yqAJmOo0tSCEDAY24&app_code=fd9_LnoGgmj6hkcLl2RhNQ&searchtext=${$("#address-search-bar").val().replace(/(-)|(,)/g, '').split(' ').join('+')}`)
    .then(res => res.json()).then(result => {
      let destiny = `geo!${result.Response.View[0].Result[0].Location.DisplayPosition.Latitude},${result.Response.View[0].Result[0].Location.DisplayPosition.Longitude}`

      getRouteTime(userPoint, destiny);

      var routingParameters = {
        'mode': `fastest;${transportMean};traffic:enabled`,
        'waypoint0': userPoint,
        'waypoint1': destiny,
        'representation': 'display',
      };

      var onResult = function (result) {
        var route,
          routeShape,
          startPoint,
          endPoint,
          linestring;

        if (result.response.route) {
          route = result.response.route[0];
          routeShape = route.shape;
          linestring = new H.geo.LineString();

          routeShape.forEach(function (point) {
            var parts = point.split(',');
            linestring.pushLatLngAlt(parts[0], parts[1]);
          });

          startPoint = route.waypoint[0].mappedPosition;
          endPoint = route.waypoint[1].mappedPosition;
          var routeLine = new H.map.Polyline(linestring, {
            style: { strokeColor: 'blue', lineWidth: 10 }
          });
          var endMarker = new H.map.Marker({
            lat: endPoint.latitude,
            lng: endPoint.longitude
          });
          var startMarker = new H.map.Marker({
            lat: localStorage.getItem("latitude"),
            lng: localStorage.getItem("longitude")
          });
          map.addObjects([startMarker, routeLine, endMarker]);
          map.setViewBounds(routeLine.getBounds());

        }
      };
      var router = platform.getRoutingService();
      router.calculateRoute(routingParameters, onResult,
        function (error) {
          alert(error.message);
        });
    })
}


function searchDestiny() {
  $("#address-search").on('click', (e) => {
    e.preventDefault();
  })
}

getLocation()

var platform = new H.service.Platform({
  'app_id': 'lT3yqAJmOo0tSCEDAY24',
  'app_code': 'fd9_LnoGgmj6hkcLl2RhNQ'
});
var defaultLayers = platform.createDefaultLayers();
let map = new H.Map(
  $('#mapContainer')[0],
  defaultLayers.normal.map, {
    zoom: 13,
    center: { lat: localStorage.getItem("latitude"), lng: localStorage.getItem("longitude") }
  });
var marker = new H.map.Marker({
  lat: localStorage.getItem("latitude"),
  lng: localStorage.getItem("longitude")
});
map.addObjects([marker])

var ui = H.ui.UI.createDefault(map, defaultLayers);


$("#address-search-bar").keypress((e) => {
  if (e.which == 13) {
    $('.transport').removeClass('invisible');
    $(`#car`).addClass('transport-button--clicked').removeClass('transport-button');
    $('#confirm').removeClass('disabled');
    localStorage.setItem('transport', 'car');
    getRoute('car');
  };
});

function addClickEventTransport(mean) {
  $(`#${mean}`).on('click', () => {
    transport.filter((element) => element !== mean)
      .forEach(otherMean => $(`#${otherMean}`)
        .addClass('transport-button')
        .removeClass('transport-button--clicked'));
    localStorage.setItem('transport', mean)
    $(`#${mean}`).addClass('transport-button--clicked')
      .removeClass('transport-button');

    map.removeObjects(map.getObjects());
    getRoute(mean);
  })
}

transport.forEach(mean => addClickEventTransport(mean));

