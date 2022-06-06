import  MenuArticle from './componentsGF/menugf';
import React, { useState } from 'react';
import Facture from './componentsGF/historiquefacture';
import Reglfcture from './componentsGF/reglerfacture';

function Appgf() {
  const [commander, setCommander]=useState("");
const handleCommander=(comm)=>{
  setCommander(comm)
}
  return (
    
  <div className='navGC'>
      <MenuArticle handleCommander={handleCommander} />
      {commander==="Régler facture"? <Reglfcture/>:
      commander==="facture"?<Facture/>
     :null}
    
  </div>
     
  );
}

export default Appgf;