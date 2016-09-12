/// <reference path="jquery-1.7.1.js" />
/// <reference path="jquery.mobile-1.1.1.js" />
/// <reference path="msls-1.0.0.js" />

(function ($) {
    var _credentialsKey = "AtQYc9otpYbMEyPQTJs5Cn-P3lg8_d7gSjAHEyjLPTrtbeIkcYEvvyGumsUVYyqf";

    // load the directions module only once per session
    Microsoft.Maps.loadModule('Microsoft.Maps.Directions');

    $.widget("msls.lightswitchBingMapsControl", {
        options: {
            mapType: Microsoft.Maps.MapTypeId.road,
            zoom: 5,
            showDashboard: true,
            ShowScaleBar:false,
            enableSearchLogo:true
        },

        _create: function () {
        },

        _init: function () {
            this.createMap();
        },

        destroy: function () {
            this._destroyBingMapsControl();
        },

        createMap: function () {
            this.htmlMapElement = this.element[0];

            // create empty map
            this.map = new Microsoft.Maps.Map(this.htmlMapElement,
                                {
                                    credentials: _credentialsKey,
                                    mapTypeId: this.options.mapType,
                                    zoom: this.options.zoom,
                                    showDashboard: this.options.showDashboard,
                                    ShowScaleBar: this.options.ShowScaleBar,
                                    center: new Microsoft.Maps.Location(38.50, -18.69),
                                    enableSearchLogo : this.options.enableSearchLogo
                                
                              //      center: "37.77210411958221,-25.51025390625"
                                });
        },

        addPinAsync: function (street, city, country, i, callback) {

            var widgetInstance = this;

            // construct a request to the REST geocode service using the widget's
            // optional parameters
            var geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations/" +
                                 street + "," + city + "," + country +
                                 "?key=" + _credentialsKey;

            // make the ajax request to the Bing Maps geocode REST service
            $.ajax({
                url: geocodeRequest,
                dataType: 'jsonp',
                async: true,
                jsonp: 'jsonp',
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + " " + errorThrown);
                },
                success: function (result) {
                    var coordinates = null;

                    if (result && result.resourceSets && (result.resourceSets.length > 0) &&
                        result.resourceSets[0].resources && (result.resourceSets[0].resources.length > 0)) {

                        // create a location based on the geocoded coordinates
                        coordinates = result.resourceSets[0].resources[0].point.coordinates;

                        widgetInstance._createPinFromCoordinates(coordinates, i, callback);
                    }
                }
            });
        },

        _createPinFromCoordinates: function(coordinates, i, callback) {
            var location = new Microsoft.Maps.Location(coordinates[0], coordinates[1]);
            var pushpinOptions = { draggable: true };
            var pin = new Microsoft.Maps.Pushpin(location,pushpinOptions, { text: '' + i + '' });
            Microsoft.Maps.Events.addHandler(pin, 'click', callback);
            this.map.entities.push(pin);
          
        },

        resetMap: function () {
            this.map.entities.clear();
        },

        _handleError: function (error) {
            alert("An error occurred.  " + error.message);
        },

        _destroyBingMapsControl: function () {
            if (this.map != null) {
                this.map.dispose();
                this.map = null;
            }
        }
    });
}(jQuery));
