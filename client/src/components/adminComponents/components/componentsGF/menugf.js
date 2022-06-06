import React, { useState } from 'react';

import './comp1.css';


function MenuArticle(props) {
  const [click, setClick] = useState(false);
  const [com,setCom]=useState(true)
  const [maj,setMaj]=useState(false)
  const [acquis,setAcquis]=useState(false)

  
  const openMaj=()=>{
    setAcquis(false);
   
    setMaj(true);
    handleCommands("Régler facture");
  }
  const openAcquis=()=>{
    setAcquis(true);
   
    setMaj(false);
    handleCommands("facture");

  }
  
  const handleCommands=(name)=>{
    props.handleCommander(name)
  }
  return (
    <>
      <nav className='navbar'>
       
        
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          
          <li className={maj?"nav-item active":"nav-item"} onClick={()=>openMaj()} >
    Régler facture
          
          </li>
           
          <li className={acquis?"nav-item active":"nav-item"} onClick={()=>openAcquis()}>
Historique des factures       </li>

        </ul>
       
      </nav>
    </>
  );
}

export default MenuArticle;