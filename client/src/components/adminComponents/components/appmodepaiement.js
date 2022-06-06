import  Menumodepaiement from './Componentsmpaiement/menumodepaiement';
import React, { useState } from 'react';
import Ajoutermodepaieent from './Componentsmpaiement/ajoutmodepaiement.tsx';
import MAJModedepaiement from './Componentsmpaiement/consultermodedepaiement'

function Appmodepaiement() {
  const [commander, setCommander]=useState("");
const handleCommander=(comm)=>{
  setCommander(comm)
}
  return (
    
  <div className='navGC'>
      <Menumodepaiement handleCommander={handleCommander} />
      {commander==="Ajouter Mode de paiement"? <Ajoutermodepaieent/>:
      commander==="Consulter les modes de paiement"? <MAJModedepaiement/>
     :null}
      
  </div>
     
  );
}

export default Appmodepaiement;