import React, { useState } from 'react';

import './comp2.css';


function MenuArticle(props) {
  const [click, setClick] = useState(false);
  const [com,setCom]=useState(true)
  const [maj,setMaj]=useState(false)
  const [acquis,setAcquis]=useState(false)
  const [bns,setbns]=useState(false)

  
  const openMaj=()=>{
    setAcquis(false);
   setbns(false);
    setMaj(true);
    handleCommands("Ajouter stock");
  }
  const openAcquis=()=>{
    setAcquis(true);
    setbns(false);
    setMaj(false);
    handleCommands("Consulter comNonLIvrer");

  }
  const openbns=()=>{
    setAcquis(false);
    setbns(true);
    setMaj(false);
    handleCommands("bonsortie");

  }
  const handleCommands=(name)=>{
    props.handleCommander(name)
  }
  return (
    <>
      <nav className='navbar'>
       
        
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          
          <li className={maj?"nav-item active":"nav-item"} onClick={()=>openMaj()} >
       Ajouter stock
          
          </li>
          <li className={bns?"nav-item active":"nav-item"} onClick={()=>openbns()}>
Bon de sortie      </li>
           
          <li className={acquis?"nav-item active":"nav-item"} onClick={()=>openAcquis()}>
Livraison          </li>
      
        </ul>
       
      </nav>
    </>
  );
}

export default MenuArticle;