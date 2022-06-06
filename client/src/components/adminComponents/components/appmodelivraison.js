import  Menumodelivraison from './Componentsmodedelivraison/menumodelivraison';
import React, { useState } from 'react';
import Ajoutmodelivraison from './Componentsmodedelivraison/ajoutmodelivraison.tsx';
import Modedelivraison from './Componentsmodedelivraison/consultermodesdelivraison'
function Appmodelivraison() {
  const [commander, setCommander]=useState("");
const handleCommander=(comm)=>{
  setCommander(comm)
}
  return (
    
  <div className='navGC'>
      <Menumodelivraison handleCommander={handleCommander} />
      {commander==="Ajouter Mode de livraison"? <Ajoutmodelivraison/>:
      commander==="Consulter les modes de livraison"? <Modedelivraison/>
           :null}
      
  </div>
     
  );
}

export default Appmodelivraison;