import './App.css';

import { useState, useEffect } from 'react';
import { SquirrelMap } from './components/SquirrelMap';

function App() {

  const [chapter, setChapter] = useState(0);  
  const [camera, setCamera] = useState(null);
  const [stage, setStage] = useState(null);

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
      setStage(chapter);
      switch(chapter) {
        case 1:
          setCamera({"position":{"x":-82.54080942296807,"y":35.6229064911869,"z":853.4267870280892},"tilt":63.508395780474515,"heading":277.6184397896687});
          break;
        case 2:
          setCamera({"position":{"x":-82.54832748422344,"y":35.62537346716634,"z":1031.3559071803465},"tilt":50.57416036515074,"heading":192.0313728721747});
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
          setCamera({"position":{"x":-82.54613627153849,"y":35.60817243901398,"z":757.7495830571279},"tilt":68.05215283709595,"heading":183.60283792581788});
          break;  
        case 5:
            setCamera({"position":{"x":-82.54809225434899,"y":35.603745564619274,"z":735.2827116167173},"tilt":75.56272799028817,"heading":92.93273438260117});
            break;        
        case 6: 
          setCamera({"position":{"x":-82.54367972137065,"y":35.60059379674689,"z":1158.309389415197},"tilt":57.22973637566893,"heading":25.405367915729492})
          break;
        case 7:
          setCamera({"position":{"x":-82.54269233292231,"y":35.61967637111759,"z":992.3547712350264},"tilt":56.50032580692633,"heading":104.85270930354798})
          break;
        case 8:
          setCamera({"position":{"x":-82.54270377490117,"y":35.61535406225044,"z":1089.133707743138},"tilt":66.34618150152471,"heading":68.05679436738653})
          break;
        case 9:
          setCamera({"position":{"x":-82.53919912662225,"y":35.62141216179676,"z":1244.7371664289385},"tilt":43.73277908351247,"heading":133.0537372281607})
          break;
        case 10:
          setCamera({"position":{"x":-82.53255892599616,"y":35.61372352164402,"z":1013.4161893324926},"tilt":70.70979141564882,"heading":345.7898025225666})
          break;
        case 11:
          setCamera({"position":{"x":-82.52790014576824,"y":35.620708420521275,"z":1394.1890664100647},"tilt":50.82424818512283,"heading":260.83372246327724})
          break;
        case 12:
          setCamera({"position":{"x":-82.5308485746166,"y":35.62034341944399,"z":1422.7674179403111},"tilt":48.96252650906155,"heading":332.97023558944545})
          break;
        case 13:
          setCamera({"position":{"x":-82.5308942276016,"y":35.6268957423192,"z":1330.225029363297},"tilt":56.80397809687866,"heading":256.4266226941248});
          break;
        default:
          setCamera({
            position: {
              x: -82.57080137652181,
              y: 35.61561421226409,
              z: 1931
            },
            tilt: 67,
            heading: 93,
            fov: 100
          });
          console.log("default")
      }
    },
    [chapter]
  )


  return (
    <div className="App">
      <SquirrelMap camera={camera} stage={stage}></SquirrelMap>
    </div>
  );
}

export default App;
