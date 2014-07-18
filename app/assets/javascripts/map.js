var map;

function initialize() {
  var mapCenter = new google.maps.LatLng(39.7375670, -104.9847180);
  var mapOptions = {
    zoom: 10,
    center: mapCenter,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    draggableCursor: 'crosshair'

  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  google.maps.event.addListener(map, 'click', function (event) {
    var EditForm = '<p><div class="marker-edit">' +
      '<form action="/api/sites/create" method="POST" name="SaveMarker" id="SaveMarker">' +
      '<label for="pName"><span>Campsite Name :</span><input type="text" name="pName" class="save-name" placeholder="Enter Name" maxlength="40" /></label>' +
      '<label for="pDesc"><span>Description :</span><textarea name="pDesc" class="save-desc" placeholder="Enter Description" maxlength="150"></textarea></label>' +
      '<label for="pType"><span>Type :</span> <select name="pType" class="save-type"><option value="dispersed">Dispersed</option><option value="camp ground">Camp Ground</option>' +
      '</select></label>' +
      '</form>' +
      '</div></p><button name="save-marker" class="save-marker">Save Marker Details</button>';

    create_marker(event.latLng, 'New Campsite', EditForm, true, true, true);
  });

  var weatherLayer = new google.maps.weather.WeatherLayer({
    temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
  });
  weatherLayer.setMap(map);

  var cloudLayer = new google.maps.weather.CloudLayer();
  cloudLayer.setMap(map);

}

function create_marker(MapPos, CampTitle, CampDesc, InfoOpenDefault) {

  var marker = new google.maps.Marker({
    position: MapPos,
    map: map,
    animation: google.maps.Animation.DROP,
    title: 'Campsite name'
  });

  var contentString = $('<div class="marker-info-win">' +
    '<div class="marker-inner-win"><span class="info-content">' +
    '<h1 class="marker-heading">' + CampTitle + '</h1>' + CampDesc +
    '</span><button name="remove-marker" class="remove-marker" title="Remove Marker">Remove Marker</button>' + '</div></div>');

  var infowindow = new google.maps.InfoWindow();

  infowindow.setContent(contentString[0]);

  var removeBtn = contentString.find('button.remove-marker')[0];

  var saveBtn = contentString.find('button.save-marker')[0];

  google.maps.event.addDomListener(removeBtn, "click", function (event) {
    marker.setMap(null);
  });

  if (typeof saveBtn !== 'undefined') {
    google.maps.event.addDomListener(saveBtn, "click", function (event) {
      var mReplace = contentString.find('span.info-content');
      var mName = contentString.find('input.save-name')[0].value;
      var mDesc = contentString.find('textarea.save-desc')[0].value;
      var mType = contentString.find('select.save-type')[0].value;
      if (mName == '' || mDesc == '') {
        alert("Please enter name and description.");
      } else {
        save_marker(marker, mName, mDesc, mType, mReplace);
      }
    });
  }

  google.maps.event.addDomListener(marker, 'click', function () {
    infowindow.open(map, marker);
  });

  if (InfoOpenDefault) {
    infowindow.open(map, marker);
  }
}

function save_marker(Marker, mName, mDesc, mType, replaceWin) {
  var mLatLong = Marker.getPosition().toUrlValue();
  var myData = {name: mName, latlong: mLatLong, description: mDesc, site_type: mType};

//  var jsonData = JSON.stringify(myData);
//  console.log(jsonData);
  console.log(myData);
  console.log(replaceWin);
  $.ajax({
    type: "POST",
    url: '/api/sites',
    data: myData,
    dataType: 'json',
    success: function (data) {
      alert(data);
//      Marker.setDraggable(false);
      alert('Campsite successfully added!')
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(thrownError);
    }
  });
}

function remove_marker(Marker) {
  var mLatLang = Marker.getPosition().toUrlValue();
  var myData = {del: 'true', latlang: mLatLang};
  $.ajax({
    type: "DELETE",
    url: "/api/sites",
    data: myData,
    success: function (data) {
      Marker.setMap(null);
      alert(data);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(thrownError);
    }
  });
}
function initializeMap() {
  $.getJSON('/api/sites', function (data) {
    $.each( data, function( index, site ) {
      var latLng = site.latlong.split(",");
      var myLatlng = new google.maps.LatLng(parseFloat(latLng[0]), parseFloat(latLng[1]));
//      var myLatlng = new google.maps.LatLng(site.lat), site.lng));
      create_marker(myLatlng, site.title, site.description);
    });
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
