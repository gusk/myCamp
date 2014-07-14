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
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  google.maps.event.addListener(map, 'click', function (event) {
    addMarker(event.latLng);
  });
  var weatherLayer = new google.maps.weather.WeatherLayer({
    temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
  });
  weatherLayer.setMap(map);

  var cloudLayer = new google.maps.weather.CloudLayer();
  cloudLayer.setMap(map);

}

function addMarker(location) {
  var contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Campsite</h1>' +
    '<div id="bodyContent">' +
    '<p><b>Campsite Name</b></p>' +
    '</div>' +
    '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: 'Campsite name'
  });
  markers.push(marker);
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.open(map, marker);
  });
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


function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("map-canvas");

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  } else {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '95%';
  }
}
//google.maps.event.addDomListener(window, 'load', initialize);