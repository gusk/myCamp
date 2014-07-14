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

  var contentString = $('<div class="marker-info-win">' +
    '<div class="marker-inner-win"><span class="info-content">' +
    '<h1 class="marker-heading">New Campsite</h1>' +
    'Campsite Description' +
    '</span>' +
    '<br/><button name="remove-marker" class="remove-marker" title="Remove Marker">Remove Marker</button></div></div>');

  var infowindow = new google.maps.InfoWindow();

  infowindow.setContent(contentString[0]);


  var marker = new google.maps.Marker({
    position: location,
    map: map,
    animation: google.maps.Animation.DROP,
    title: 'Campsite name'
  });


  markers.push(marker);
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.open(map, marker);
  });

  var removeBtn = contentString.find('button.remove-marker')[0];
  google.maps.event.addDomListener(removeBtn, "click", function (event) {
    marker.setMap(null);
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


//google.maps.event.addDomListener(window, 'load', initialize);