/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewPonto1.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Ponto.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Ponto." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}

var mapDiv;
var current = 0;
var step = 1;

myapp.ViewPonto1.Pontos_render = function (element, contentItem) {
    // Write code here.
    mapDiv = $('<div />').appendTo($(element));
    $(mapDiv).lightswitchBingMapsControl();

    var visualCollection = contentItem.value;
    if (visualCollection.isLoaded) {
        showItems(current, step, contentItem.screen);
    } else {
        visualCollection.addChangeListener("isLoaded", function () {
            showItems(current, step, contentItem.screen);
        });
        visualCollection.load();
    }
};

function showItems(start, end, screen) {
    $(mapDiv).lightswitchBingMapsControl("resetMap");

    $.each(screen.Pontos.data, function (i, Pontos) {
        if (i >= start && i <= end) {
            $(mapDiv).lightswitchBingMapsControl("addPinAsync", Pontos.Address,
                Pontos.City, Pontos.Country, i + 1, function () {
                    screen.Pontos.selectedItem = Pontos;
                    screen.showPopup("Details2");
                });
        }
    });
};
