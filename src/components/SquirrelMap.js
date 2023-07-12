import { useRef, useEffect } from "react";
import Map from "@arcgis/core/Map.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import _geoJsonRoute from "../data/flying_squirrel_official.json";
import '@arcgis/core/assets/esri/css/main.css';

const ps3Dl = {
  type: "path",  // autocasts as new PathSymbol3DLayer()
  profile: "circle",  // creates a rectangular shape
  width: 10,  // path width will also set the height to the same value
  material: { color: "white" },
  cap: "round"
};

const createRenderer = (stage)=> {
  return {
    type: "unique-value",
    field: "Descript",
    defaultSymbol: {
      type: "line-3d",  // autocasts as new LineSymbol3D()
      symbolLayers: [ps3Dl]
    },
    uniqueValueInfos: !stage ? 
      [] : 
      [
        {
          value: stage.toString(),
          symbol: {
            type: "line-3d",  // autocasts as new LineSymbol3D()
            symbolLayers: [{...ps3Dl, material: { color: "#ff7380" }}]    
          }
        }
      ]
  };  
}

export const SquirrelMap = ({slide})=>{

    const _refMap = useRef(null);
    const _refView = useRef(null);
    const _refRouteLayer = useRef(null);
    const _refGraphicsLayer = useRef(null);

    
    useEffect(
        ()=>{

          console.log("initializing map...")

          _refMap.current = new Map(
              {basemap: "hybrid", ground: "world-elevation"}
          );

          const blob = new Blob(
            [JSON.stringify(_geoJsonRoute)], 
            {type: "application/json"}
          );
          // URL reference to the blob
          _refRouteLayer.current = new GeoJSONLayer(
            {
              url: URL.createObjectURL(blob),
              elevationInfo: "relative-to-ground",
              renderer: createRenderer()
            }
          );

          _refMap.current.add(_refRouteLayer.current);
	        _refView.current = new SceneView({
                container: "view",
                map: _refMap.current,
                navigation: {
                  mouseWheelZoomEnabled: false,
                  browserTouchPanEnabled: false
                },
                camera: {"position":{"x":-82.55402116568489,"y":35.59686012465541,"z":1172.0963501837105},"tilt":67.59129631631237,"heading":32.57667035903703, "fov": 100}
              });


          _refGraphicsLayer.current = new GraphicsLayer({elevationInfo: "relative-to-ground"});
          _refMap.current.add(_refGraphicsLayer.current)

          const ts3dl = {
            type: "text",  // autocasts as new TextSymbol3DLayer()
            material: { color: [ 255,255,0 ] },
            background: { color: [0, 0, 0, 0.75] },
            size: 11  // points
          }
  
          _refGraphicsLayer.current.addMany(
            [
              new Graphic(
                {
                  geometry: {type: "point",x: -82.54234061560147,y: 35.62110855418713,z: 200}, 
                  symbol: {type: "point-3d", symbolLayers: [{...ts3dl, text: "Grove Park Inn"}]}
                }
              ),
              new Graphic(
                {
                  geometry: {type: "point", x: -82.53178870691916, y: 35.623872249757895},
                  symbol: {type: "point-3d", symbolLayers: [{...ts3dl, text: "Western Residence"}]}
                }
              ),
              new Graphic(
                {
                  geometry: {type: "point", x: -82.55050898034392, y: 35.60122031621403},
                  symbol: {type: "point-3d", symbolLayers: [{...ts3dl, text: "Start / Finish"}]}
                }
              ),
              new Graphic(
                {
                  geometry: {type: "point", x: -82.54483496802376, y: 35.60323510180051},
                  symbol: {type: "point-3d", symbolLayers: [{...ts3dl, text: "Asheville Arms"}]}
                }
              )
            ]
          );

          _refView.current.watch(
            "camera",
            (camera) => {
              const {tilt, heading} = camera;
              const {latitude, longitude, z} = camera.position;
              console.log("******************************");
              console.log(JSON.stringify({position:{x: longitude, y: latitude, z: z}, tilt: tilt, heading: heading}));
            }
          );

        },
        []
    );

    useEffect(
      ()=>{
        _refView.current.goTo(
          {...slide.camera, fov: 100},
          {animate: true, duration: 3000, easing: "in-out-cubic"}
        );
        _refRouteLayer.current.renderer = createRenderer(slide.segment);
      },
      [slide]
    );

    return <div id="view"></div>

}