import './App.css';

import { useState, useEffect } from 'react';
import { SquirrelMap } from './components/SquirrelMap';

function App() {

  const [section, setSection] = useState(0);  

  useEffect(
    ()=>{
      window.addEventListener(
        "hashchange", 
        e => setSection(
          parseInt(window.location.hash.replace("#","").trim()) || 0
        )
      );      
    },
    []
  );


  useEffect(
    ()=>{
      switch(section) {
        default:
      }
    },
    [section]
  )


  return (
    <div className="App">
      <SquirrelMap></SquirrelMap>
    </div>
  );
}

export default App;
