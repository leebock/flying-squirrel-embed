import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useState, useEffect } from 'react';
import { SquirrelMap } from './components/SquirrelMap';
import SLIDES from './data/slides.json';

function App() {

  const [slide, setSlide] = useState(SLIDES[0]);  
  const [showUI, setShowUI] = useState(true);

  useEffect(
    ()=>{
      window.addEventListener(
        "hashchange", 
        e => setSlide(
          SLIDES[parseInt(window.location.hash.replace("#","").trim()) || 0]
        )
      );      
      // hide UI if this is an embed
      if (window.location !== window.parent.location) {
        setShowUI(false);
      }
    },
    []
  );

  const populatePagination = () => 
    SLIDES.map(
      (value, index)=>(
        <li className="page-item" key={index}>
          <button className={"page-link"+(index===SLIDES.indexOf(slide) ? " active" : "")} 
                  type="button"
                  onClick={()=>{setSlide(SLIDES[index])}}>
                    {index === 0 ? "Intro" : index}
          </button>
        </li>
      )
    )
  
  return (
    <div className="App">
      <SquirrelMap slide={slide}></SquirrelMap>
      {
      showUI &&
      <nav className="position-absolute d-none d-sm-block" 
          style={{"bottom": "20px"}} 
          aria-label="Slide controls">
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