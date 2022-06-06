import "./App.css";
import SideMenu from "./componentsmenuprincipale/SideMenu";
import { useState,useEffect } from "react";
import GC from './components/appnavGC';
import Apploc from "./components/applocalisation.js";
import Apparticle from "./components/apparticle";
import Ajtclient from "./components/appajoutclient";
import ConsComptes from "./components/appconsultercompte";
import Home from './acceuil';
import Stock from'./components/appstocks';
import Appgf from './components/appnavgf';
import Appmodepaiement from "./components/appmodepaiement";
import Appmodelivraison from "./components/appmodelivraison";

function Admine() {
  const [inactive, setInactive] = useState(false);
  const [active, setActive] = useState('');

  const handleCallback = (childData) =>{
    setActive(childData);
    console.log(childData);
}

  return (
    <div className="App">
      
      <SideMenu
          onCollapse={(inactive) => {
            setInactive(inactive);
          }}
          active
          parentCallback = {handleCallback}
        />
        {active==="Échantillonnage"?<Apploc/>:
        active==="Articles"?<Apparticle/>:
        active==="Modes de paiement"?<Appmodepaiement/>:
        active==="Modes de livraison"?<Appmodelivraison/>:
        active==="Gestion des commandes"?<GC handleCallback={handleCallback}/>:
        active==="Gestion des factures"?< Appgf/>:
        active==="Ajouter un compte utilisateurs"?<Ajtclient/>:
        active==="consulter comptes utilisateurs"?<ConsComptes/>:
        active==="livraison"?<Stock/>:
     
        
        <Home/>}
        
    </div>
  );
}

export default Admine;
