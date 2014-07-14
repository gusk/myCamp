var map;
var markers = [];

function initialize() {
  var denverCo = new google.maps.LatLng(39.7375670, -104.9847180);
  var mapOptions = {
    zoom: 10,
    center: denverCo,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    draggableCursor: 'crosshair'

  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng);
  })

}
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setAllMap(null);
}

function showMarkers() {
  setAllMap(map);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}