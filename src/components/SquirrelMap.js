import { useRef, useEffect } from "react";
import Map from "@arcgis/core/Map.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import '@arcgis/core/assets/esri/css/main.css';

export const SquirrelMap = ({})=>{
    const _refMap = useRef(null);
    const _refView = useRef(null);
    useEffect(
        ()=>{
            _refMap.current = new Map(
                {basemap: "satellite", ground: "world-elevation"}
            );
	        _refView.current = new SceneView({
                container: "view",
                map: _refMap.current/*,
                camera: {
                  position: {
                    x: ANIMATIONS[0].result.x,
                    y: ANIMATIONS[0].result.y,
                    z: ANIMATIONS[0].result.z
                  },
                  tilt: ANIMATIONS[0].result.tilt,
                  heading: ANIMATIONS[0].result.heading,
                  fov: ANIMATIONS[0].result.fov
                }*/
              });
  
        },
        []
    );
    return <div id="view"></div>
}