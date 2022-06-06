import "./App.css";
import SideMenu from "./Menu/SideMenu";

import { useState,useEffect } from "react";
import Commander from "./commander";
import Home from "./dashboard/Default/acceuil";
import MAJEC from "./majetatcom";
import Acqui from "./acqui"
function Rventes() {
  const [inactive, setInactive] = useState(false);
  const [active, setActive] = useState('');
  const [commander, setCommander]=useState("");

const handleCommander=(comm)=>{
  setCommander(comm)
}
  const handleCallbackk = (childData) =>{
    setActive(childData);
}

function handleCallback(child){
  setCommander(child);
  setCommander("Commander");
}

  return (
    <div className="App">
      
      <SideMenu
          onCollapse={(inactive) => {
            setInactive(inactive);
          }}
          active
          parentCallback = {handleCallbackk}
        />
        {
        active==="Commander"?<Commander handleCallback={handleCallback} />:
        active==="Mise à jour état commande"?<MAJEC/>:
        active==="Saisit acquit à caution"?<Acqui/>:


        <Home/>}
        
    </div>
  );
}

export default Rventes;
