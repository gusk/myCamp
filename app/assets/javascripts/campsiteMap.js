window.CampsiteMap = function CampsiteMap(domId) {
  this.domId = domId;
};

CampsiteMap.prototype = {
  initialize: function () {
    var mapCenter = new google.maps.LatLng(39.7375670, -104.9847180);
    var mapOptions = {
      zoom: 10,
      center: mapCenter,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      draggableCursor: 'crosshair'

    };
    this.map = new google.maps.Map(document.getElementById(this.domId), mapOptions);

    google.maps.event.addListener(this.map, 'click', function (event) {
      var EditForm = '<p><div class="marker-edit">' +
        '<form action="/api/sites/create" method="POST" name="SaveMarker" id="SaveMarker">' +
        '<label for="pName"><span>Campsite Name :</span><input type="text" name="pName" class="save-name" placeholder="Enter Name" maxlength="40" /></label>' +
        '<label for="pDesc"><span>Description :</span><textarea name="pDesc" class="save-desc" placeholder="Enter Description" maxlength="150"></textarea></label>' +
        '<label for="pType"><span>Type :</span> <select name="pType" class="save-type"><option value="dispersed">Dispersed</option><option value="camp ground">Camp Ground</option>' +
        '</select></label>' +
        '</form>' +
        '</div></p><button name="save-marker" class="save-marker">Save Campsite</button>';

      this.createMarker(event.latLng, 'New Campsite', EditForm, true);
    }.bind(this));

    var weatherLayer = new google.maps.weather.WeatherLayer({
      temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
    });
    weatherLayer.setMap(this.map);

    var cloudLayer = new google.maps.weather.CloudLayer();
    cloudLayer.setMap(this.map);

    this.initializeMap();

  },
  initializeMap: function () {
    $.getJSON('/api/sites', function (data) {
      $.each(data, function (index, site) {
        var myLatlng = new google.maps.LatLng(site.lat, site.long);
        var marker = this.createMarker(myLatlng, site.name, site.description);
        marker.id = site.id;
      }.bind(this));
    }.bind(this));
  },
  createMarker: function create_marker(MapPos, CampTitle, CampDesc, InfoOpenDefault) {
    var marker = new google.maps.Marker({
      position: MapPos,
      map: this.map,
      animation: google.maps.Animation.DROP
    });

    var contentString = $('<div class="marker-info-win">' +
      '<div class="marker-inner-win"><span class="info-content">' +
      '<h1 class="marker-heading">' + CampTitle + '</h1>' + CampDesc +
      '<br>' +
      '</span><button name="remove-marker" class="remove-marker" title="Remove Marker">Remove Campsite</button>' + '</div></div>');

    var infowindow = new google.maps.InfoWindow();

    infowindow.setContent(contentString[0]);

    var removeBtn = contentString.find('button.remove-marker')[0];

    var saveBtn = contentString.find('button.save-marker')[0];

    google.maps.event.addDomListener(removeBtn, "click", function (event) {
      this.removeMarker(marker)
    }.bind(this));

    if (typeof saveBtn !== 'undefined') {
      google.maps.event.addDomListener(saveBtn, "click", function (event) {
        var mReplace = contentString.find('span.info-content');
        var mName = contentString.find('input.save-name')[0].value;
        var mDesc = contentString.find('textarea.save-desc')[0].value;
        var mType = contentString.find('select.save-type')[0].value;
        if (mName == '' || mDesc == '') {
          alert("Please enter name and description.");
        } else {
          this.saveMarker(marker, mName, mDesc, mType, infowindow);
        }
      }.bind(this));
    }

    google.maps.event.addDomListener(marker, 'click', function () {
      infowindow.open(this.map, marker);
    }.bind(this));

    if (InfoOpenDefault) {
      infowindow.open(this.map, marker);
    }
    return marker;
  },
  saveMarker: function saveMarker(marker, mName, mDesc, mType, infoWindow) {
    var mLatLong = marker.getPosition();
    var mLat = mLatLong.lat();
    var mLng = mLatLong.lng();
    var myData = {name: mName, lat: mLat, long: mLng, description: mDesc, site_type: mType};
    $.ajax({
      type: "POST",
      url: '/api/sites',
      data: myData,
      dataType: 'json',
      success: function (data) {
        marker.id = data.id;

        var newInfoWindow = new google.maps.InfoWindow();

        var content = $('<div class="marker-info-win">' +
          '<div class="marker-inner-win"><span class="info-content">' +
          '<h1 class="marker-heading">' + data.name + '</h1>' + data.description +
          '<br>' +
          '</span><button name="remove-marker" class="remove-marker" title="Remove Marker">Remove Campsite</button>' + '</div></div>');


        newInfoWindow.setContent(content[0]);
        infoWindow.close();
        infoWindow = null;
        alert('Campsite successfully added!');

        newInfoWindow.open(this.map, marker);

        var removeBtn = content.find('button.remove-marker')[0];

        google.maps.event.addDomListener(removeBtn, "click", function (event) {
          this.removeMarker(marker)
        }.bind(this));

        return marker;
      }.bind(this),
      error: function (xhr, ajaxOptions, thrownError) {
        alert(thrownError);
      }
    });
  },

  removeMarker: function remove_marker(marker) {
    $.ajax({
      type: "DELETE",
      url: "/api/sites/" + marker.id,
      success: function (data) {
        alert('Campsite successfully removed.');
        marker.setMap(null);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(thrownError);
      }
    });
  }
};