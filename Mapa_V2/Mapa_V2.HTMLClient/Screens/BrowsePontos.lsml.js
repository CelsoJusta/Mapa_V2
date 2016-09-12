/// <reference path="~/GeneratedArtifacts/viewModel.js" />

var mapDiv;
var current = 0;
var step = 1;

myapp.BrowsePontos.Pontos_render = function (element, contentItem) {
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
                    screen.showPopup("Details");
                });
        }
    });
};
myapp.BrowsePontos.NextItems_execute_execute = function (screen) {
    current = current + step;
    if (current + step > screen.Pontos.count) {
        if (screen.Pontos.canLoadMore) {
            screen.Pontos.loadMore().then(function (result) {
                showItems(current, current + step, screen);
            });
        }
    } else {
        showItems(current, current + step, screen);
    }
};


myapp.BrowsePontos.PreviousItems_execute_execute = function (screen) {
    // Write code here.
    current = current - step;
    showItems(current, current + step, screen);
};