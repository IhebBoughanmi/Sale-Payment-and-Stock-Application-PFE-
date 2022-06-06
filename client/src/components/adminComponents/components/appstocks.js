import  MenuArticle from './componentsstock/menustock';
import React, { useState } from 'react';
import Livraison from './componentsstock/commandenonlivrai';
import Ajouterstock from './componentsstock/ajouterstock';
import Bonsortie from './componentsstock/bonsortie';

function Stock() {
  const [commander, setCommander]=useState("");
const handleCommander=(comm)=>{
  setCommander(comm)
}
function handleCallback(child){
  setCommander(child);
  setCommander("bonsortie");
}
  return (
    
  <div className='navGC'>
      <MenuArticle handleCommander={handleCommander} />
      {commander==="Ajouter stock"? <Ajouterstock />:
      commander==="Consulter comNonLIvrer"?<Livraison/>:
      commander==="bonsortie"?<Bonsortie handleCallback={handleCallback} />
     :null}
      {/* <Acqui/>
      <MAJAcqui/>
      <Echant/>  */}
      {/*   <MAJCOM/>
      <MAJEC/>  */}
  </div>
     
  );
}

export default Stock;