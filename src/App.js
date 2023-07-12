import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useState, useEffect } from 'react';
import { SquirrelMap } from './components/SquirrelMap';
import SLIDES from './data/slides.json';

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

      setCamera(SLIDES[slide]);
      
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
