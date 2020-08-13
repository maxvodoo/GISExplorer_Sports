import "./config";
import FeatureLayer from "esri/layers/FeatureLayer";
import ArcGISMap from "esri/Map";
import MapView from "esri/views/MapView";
import React from 'react'


export default function App() {

    React.useEffect(() => {
        const map = new ArcGISMap({
            basemap: "topo",
        });

        const view = new MapView({
            map,
            container: "map",
            zoom: 10,
            center: [50.03602559770744, 26.38306796977232], // longitude, latitude
        });
        window._view = view
        window._map = map

        // The function used for the PopupTemplate
        function getInfo(feature) {
            var graphic, attributes, content;
            graphic = feature.graphic;
            attributes = graphic.attributes;
            let date = new Date(attributes.DateCreated).toLocaleDateString();

            content =
                "—ﬁ„ «·‰ﬁÿÂ:- " +
                attributes.point_numb +
                "</br>" +
                " „Êﬁ⁄ «·‰ﬁÿÂ:-" +
                attributes.Point_Posi +
                "</br>" +
                "«·„⁄—› «·Ã€—«›Ï:-" +
                '<img  src="' +
                attributes.Zone1 +
                '" alt="" height="30" width="92"  />';

            return content;
        }

        const popupTemplate = {
            title: "Zone: {Zone}",
            outFields: ["*"],
            content: getInfo,
        };
        var nasemPointSymbol = {
            type: "simple",
            symbol: {
                type: "picture-marker",
                url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
                width: "15px",
                height: "15px",
            },
        };

        const layer1 = new FeatureLayer({
            url:
                "http://localhost:6080/arcgis/rest/services/DataWorkerHttp/FeatureServer/5",
            outFields: ["*"],
            popupTemplate,
            renderer: nasemPointSymbol,
        });

        // map.addMany([layer1, layer2]);
        map.add(layer1);

        layer1.when(() => {
            view.goTo({ target: layer1.fullExtent });
        },[]);
    })
    return (
        <div id="map" style={{width:"100vx", height:"100vh"}}></div>
    )
}