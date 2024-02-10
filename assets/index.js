var mapa;
var capa;
var Point;
var SimpleMarkerSymbol;
var Graphic;
require([
    "esri/map",
    "esri/layers/GraphicsLayer",
    "esri/graphic",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/geometry/Point",
    "esri/dijit/Popup",
    'dojo/dom',
    "dojo/domReady!"
], function (
    Map, GraphicsLayer, EsriGraphic, EsriSimpleMarkerSymbol, EsriPoint
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
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("poiButton").onclick = agregarPunto;
    });
});

function agregarPunto() {
    var form = document.getElementById("poiForm");
    var name = form.elements["name"].value;
    var direction = form.elements["direction"].value;
    var telephone = form.elements["telephone"].value;
    var category = form.elements["category"].value;
    var coord = form.elements["coord"].value.split(',');

    var punto = new Point(parseFloat(coord[1]), parseFloat(coord[0]));
    var simbolo = new SimpleMarkerSymbol().setStyle(SimpleMarkerSymbol.STYLE_CIRCLE).setColor([255, 0, 0, 1]);
    var graficoPunto = new Graphic( punto, simbolo);

    capa.add(graficoPunto);

    mapa.centerAt(punto);
    

    console.log("Nombre:", name);
    console.log("Dirección:", direction);
    console.log("Teléfono:", telephone);
    console.log("Categoría:", category);
    console.log("Coordenadas:", punto.x, punto.y);
}
