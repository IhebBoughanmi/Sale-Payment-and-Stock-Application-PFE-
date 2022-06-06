import "./App.css";
import SideMenu, { menuItems } from "./Menu/SideMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import Bonsortie from "./bonsortie"
import Livraison from "./commandenonlivrai";
import Ajouterstock from "./ajouterstock";
import Home from "./acceuil";

function Rdepot() {
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
        active==="Ajout stock"?<Ajouterstock/>:
        active==="Mise à jour bon de sortie"?<Bonsortie/>:
        active==="Livraison"?<Livraison/>:

        <Home/>}
        
    </div>
  );
}

export default Rdepot;
