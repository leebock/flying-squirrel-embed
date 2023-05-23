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
