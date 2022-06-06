import Comp1 from './componentsLoc/menuloc'
import AddEch from './componentsLoc/ajouterloc.tsx';
import MenuEch from './componentsLoc/menuloc';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Article from './componentsLoc/consulterlocalisation'
function Apploc() {
  const [commander, setCommander]=useState("");
const handleCommander=(comm)=>{
  setCommander(comm)
}
  return (
    
  <div className='navGC'>
     <MenuEch handleCommander={handleCommander} />
     {commander==="Ajouter Ech"? <AddEch/>:
     commander==="Consulter Ech"?<Article />
         :null}
  </div>
     
  );
}

export default Apploc;