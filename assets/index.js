var mapa;
var capa;
var Point;
var SimpleMarkerSymbol;
var Graphic;
var PopupTemplate;

require([
    "esri/map",
    "esri/layers/GraphicsLayer",
    "esri/graphic",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/geometry/Point",
    "esri/dijit/PopupTemplate",
    "dojo/dom",
    "dojo/domReady!"
], function (
    Map, GraphicsLayer, EsriGraphic, EsriSimpleMarkerSymbol, EsriPoint, EsriPopupTemplate
) {
    mapa = new Map("map", {
        center: [-58.3724715, -34.595986],
        zoom: 15,
        basemap: "streets"
    });
    capa = new GraphicsLayer();
    mapa.addLayer(capa);
    Point = EsriPoint;
    SimpleMarkerSymbol = EsriSimpleMarkerSymbol;
    Graphic = EsriGraphic;
    PopupTemplate = EsriPopupTemplate;

    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("poiButton").onclick = agregarPunto;
    });
});
//punto 2
function agregarPunto() {
    var form = document.getElementById("poiForm");
    var name = form.elements["name"].value;
    var direction = form.elements["direction"].value;
    var telephone = form.elements["telephone"].value;
    var category = form.elements["category"].value;
    var coord = form.elements["coord"].value.split(',');

    var punto = new Point(parseFloat(coord[1]), parseFloat(coord[0]));
    var simbolo = new SimpleMarkerSymbol().setStyle(SimpleMarkerSymbol.STYLE_CIRCLE).setColor([295, 0, 0, 1]);
// punto 3
    var content = "<b>Nombre:</b> " + name + "<br><b>Dirección:</b> " + direction + "<br><b>Teléfono:</b> " + telephone + "<br><b>Categoría:</b> " + category + "<br><b>Coordenadas:</b> " + punto.x + ", " + punto.y;
    var graficoPunto = new Graphic(punto, simbolo).setInfoTemplate(new esri.InfoTemplate("Punto de Interés", content));

    capa.add(graficoPunto);
    mapa.centerAt(punto);
}