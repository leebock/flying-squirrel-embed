import { useRef, useEffect } from "react";
import Map from "@arcgis/core/Map.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import _geoJsonRoute from "../data/saturday-run.json";
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

export const SquirrelMap = ({camera, stage})=>{

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
                camera: {
                  position: {
                    x: -82.57080137652181,
                    y: 35.61561421226409,
                    z: 1931
                  },
                  tilt: 67,
                  heading: 93,
                  fov: 100
                }
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
                  geometry: {type: "point",x: -82.54681495295014,y: 35.60458161641058, z: 200}, 
                  symbol: {type: "point-3d", symbolLayers: [{...ts3dl, text: "Taco Temple"}]}
                }
              ),
              new Graphic(
                {
                  geometry: {type: "point", x: -82.5539519233415, y: 35.61412957325879}, 
                  symbol: {type: "point-3d", symbolLayers: [{...ts3dl, text: "Weaver Park"}]}
                }
              ),
              new Graphic(
                {
                  geometry: {type: "point", x: -82.53178870691916, y: 35.623872249757895},
                  symbol: {type: "point-3d", symbolLayers: [{...ts3dl, text: "Western Residence"}]}
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
          camera,
          {animate: true, duration: 3000, easing: "in-out-cubic"}
        );
      },
      [camera]
    );

    useEffect(
      ()=>{
        _refRouteLayer.current.renderer = createRenderer(stage);
      },
      [stage]
    )

    return <div id="view"></div>
}