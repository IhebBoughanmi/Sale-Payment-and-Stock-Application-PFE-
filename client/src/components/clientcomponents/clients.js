
import { useState,useEffect } from "react";
import ResponsiveAppBar, {pages} from './navbar';

import Acceuil from './acceuil';
import Com from './commander';
import Fac from './mesfactures';

import Compteutilisateur from './compteutilisateur'

function Clients() {
  const [commander, setclient]=useState("");
  const handleclient=(comm)=>{
    setclient(comm)
  }

  return (
   
<div>
       <ResponsiveAppBar handleclient={handleclient} />
      {commander==="Mes factures"? <Fac/>:
      commander==="Acceuil"?<Acceuil/>:
      commander==='Commander'?<Com/>:
      commander==='Account'?<Compteutilisateur/>

     :<Acceuil/>}
       
    </div>
  );
}

export default Clients;
