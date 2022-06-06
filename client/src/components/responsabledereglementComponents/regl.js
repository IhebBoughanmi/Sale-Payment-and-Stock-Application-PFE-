import "./App.css";
import SideMenu, { menuItems } from "./Menu/SideMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import Home from "./acceuil";
import Reglfcture from "./reglerfacture";
import Facture from "./historiquefacture";


function Rreglement() {
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
        {
        active==="Régler facture"?<Reglfcture/>:
        active==="Historique des factures"?<Facture/>:


        <Home/>}
        
    </div>
  );
}

export default Rreglement;
