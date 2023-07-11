import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useState, useEffect } from 'react';
import { SquirrelMap } from './components/SquirrelMap';

function App() {

  const [slide, setSlide] = useState(0);  
  const [camera, setCamera] = useState(null);
  const [stage, setStage] = useState(null);
  const [showUI, setShowUI] = useState(true);

  useEffect(
    ()=>{
      window.addEventListener(
        "hashchange", 
        e => setSlide(
          parseInt(window.location.hash.replace("#","").trim()) || 0
        )
      );      
      // hide UI if this is an embed
      if (window.location !== window.parent.location) {
        setShowUI(false);
      }
    },
    []
  );


  useEffect(
    ()=>{
      if (slide === 11) {
        setStage(3)
      } else if (slide === 12) {
        setStage(2)
      } else if (slide === 13) {
        setStage(1)
      } else {
        setStage(slide);
      }
      
      switch(slide) {
        case 1:
          setCamera({"position":{"x":-82.55496521770479,"y":35.602586944219375,"z":815.0245417039841},"tilt":76.5319587554846,"heading":93.27359372638333});
          break;
        case 2:
          setCamera({"position":{"x":-82.54810739862326,"y":35.60320263765545,"z":751.8527606390417},"tilt":68.45018311164837,"heading":94.81286727687869});
          break;
        case 3:
          setCamera({"position":{"x":-82.54367972137065,"y":35.60059379674689,"z":1158.309389415197},"tilt":57.22973637566893,"heading":25.405367915729492});
          break;
        case 4:
          setCamera({"position":{"x":-82.54269233292231,"y":35.61967637111759,"z":992.3547712350264},"tilt":56.50032580692633,"heading":104.85270930354798});
          break;  
        case 5:
            setCamera({"position":{"x":-82.54270377490117,"y":35.61535406225044,"z":1089.133707743138},"tilt":66.34618150152471,"heading":68.05679436738653});
            break;        
        case 6: 
          setCamera({"position":{"x":-82.53919912662225,"y":35.62141216179676,"z":1244.7371664289385},"tilt":43.73277908351247,"heading":133.0537372281607})
          break;
        case 7:
          setCamera({"position":{"x":-82.53255892599616,"y":35.61372352164402,"z":1013.4161893324926},"tilt":70.70979141564882,"heading":345.7898025225666})
          break;
        case 8:
          setCamera({"position":{"x":-82.52790014576824,"y":35.620708420521275,"z":1394.1890664100647},"tilt":50.82424818512283,"heading":260.83372246327724})
          break;
        case 9:
          setCamera({"position":{"x":-82.5302806851093,"y":35.61929350728607,"z":1458.292859191075},"tilt":44.950598749165074,"heading":333.14961973990745})
          break;
        case 10:
          setCamera({"position":{"x":-82.53626657811118,"y":35.63221378675827,"z":1229.8606903115287},"tilt":57.038180726682896,"heading":188.58299220657088})
          break;
        case 11:
          setCamera({"position":{"x":-82.54332292819217,"y":35.623434993123645,"z":1258.0159265939146},"tilt":55.57046691987102,"heading":151.7827640210709})
          break;
        case 12:
          setCamera({"position":{"x":-82.53952046339386,"y":35.60287348402627,"z":1052.0692616533488},"tilt":51.89287396213735,"heading":277.2849267945036})
          break;
        case 13:
          setCamera({"position":{"x":-82.54512957636881,"y":35.601748891722,"z":1157.4822774985805},"tilt":32.56238188599556,"heading":272.80542524430626});
          break;
        default:
          setCamera({"position":{"x":-82.55402116568489,"y":35.59686012465541,"z":1172.0963501837105},"tilt":67.59129631631237,"heading":32.57667035903703, "fov": 100});
          console.log("default")
      }
    },
    [slide]
  )

  const populatePagination = () => 
    Array
    .from(Array(14).keys())
    .map(
      (value)=>(
        <li className="page-item" key={value}>
          <button className={"page-link"+(value===stage ? " active" : "")} 
                  type="button"
                  onClick={()=>{setSlide(value)}}>
                    {value === 0 ? "Intro" : value}
          </button>
        </li>
      )
    )
  

  return (
    <div className="App">
      <SquirrelMap camera={camera} stage={stage}></SquirrelMap>
      {
      showUI &&
      <nav className="position-absolute d-none d-sm-block" style={{"bottom": "20px"}} aria-label="Slide controls">
        <ul className="pagination pagination-lg d-none d-lg-flex">
          {populatePagination()}
        </ul>
        <ul className="pagination d-none d-sm-flex d-lg-none">
          {populatePagination()}
        </ul>
      </nav>
      }
    </div>
  );

}

export default App;
