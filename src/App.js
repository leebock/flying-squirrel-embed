import './App.css';

import { useState, useEffect } from 'react';

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
      <div>Section: <strong>{section}</strong></div>
    </div>
  );
}

export default App;
