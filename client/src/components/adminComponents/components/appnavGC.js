import React, { useState } from 'react';
import Navbar from '../componentsGC/Navbar';

import MAJEC from '../componentsGC/pagesGC/majetatcom';
import Commander from '../componentsGC/pagesGC/commander';
import Acqui from '../componentsGC/pagesGC/acqui';



function GC() {
  const [commander, setCommander]=useState("");
const handleCommander=(comm)=>{
  setCommander(comm)
}
function handleCallback(child){
  setCommander(child);
  setCommander("Commander");
}
function handleCallback2(child){
  setCommander(child);
  setCommander("MAJ acquis a cotions");
}
  return (
    
  <div className='navGC'>
      <Navbar handleCommander={handleCommander} />
      {commander==="MAJ acquis a cotions"? <Acqui  handleCallback={handleCallback2} />:
      commander==="Commander"?<Commander handleCallback={handleCallback}/>:
      commander==="MAJ état comamndes"?<MAJEC />
     :null}
  </div>
     
  );
}

export default GC;