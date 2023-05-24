import './App.css';

import { useState, useEffect } from 'react';
import { SquirrelMap } from './components/SquirrelMap';

function App() {

  const [chapter, setChapter] = useState(0);  
  const [camera, setCamera] = useState(null);

  useEffect(
    ()=>{
      window.addEventListener(
        "hashchange", 
        e => setChapter(
          parseInt(window.location.hash.replace("#","").trim()) || 0
        )
      );      
    },
    []
  );


  useEffect(
    ()=>{

      switch(chapter) {
        case 1:
          setCamera(
            {
              position: {
                x: -82.53799843356778,
                y: 35.62626185903141,
                z: 1094.2781136026606
              },
              tilt: 72.90990972588057,
              heading: 216.55365390783064,
              fov: 100
            }            
          );
          break;
        case 2:
          setCamera(
            {
              position: {
                x: -82.54764699782481,
                y: 35.62631501857084 ,
                z: 1173.9075362496078
              },
              tilt: 65.34093408568543,
              heading: 192.74796920864986
            }
          );
          break;
        case 3:
          setCamera(
            {
              position: {
                x: -82.55403802256195,
                y: 35.6158699141095 ,
                z: 971.4670652030036
              },
              tilt: 55.36133679947065,
              heading: 145.85071494035003
            }
          );
          break;
        case 4:
          setCamera(
            {
              position: {
                x: -82.54604312292328 ,
                y: 35.60849254268956 ,
                z: 760.1628188071772
              },
              tilt: 84.82919450156275,
              heading: 184.0505151777685
            }
          );
          break;  
        case 5:
            setCamera(
              {
                position: {
                  x: -82.5485418138165,
                  y: 35.60334992876151,  
                  z: 727.2766323722899
                },
                tilt: 104.19509688802685,
                heading: 95.528487896522 
              }
            );
            break;        
        case 6: 
          setCamera(
            {
              position: {
                x: -82.54464088308944 ,
                y: 35.60398621957555 ,  
                z: 769.5960792656988
              },
              tilt: 53.40347519691426,
              heading: 93.71184525257955 
            }
          )
          break;
        case 7:
          setCamera(
            {
              position: {
                x: -82.54274294671109 ,
                y: 35.60359550754065 ,
                z: 1037.1561767142266
              },
              tilt: 42.45807667857504,
              heading: 17.92546823396507
            }
          )
          break;
        default:
      }
    },
    [chapter]
  )


  return (
    <div className="App">
      <SquirrelMap camera={camera}></SquirrelMap>
    </div>
  );
}

export default App;
