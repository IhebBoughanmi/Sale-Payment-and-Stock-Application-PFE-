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
    handleCommands("Ajouter Article");
  }
  const openAcquis=()=>{
    setAcquis(true);
   
    setMaj(false);
    handleCommands("Consulter Article");

  }
  const handleCommands=(name)=>{
    props.handleCommander(name)
  }
  return (
    <>
      <nav className='navbar'>
       
        
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          
          <li className={maj?"nav-item active":"nav-item"} onClick={()=>openMaj()} >
       Ajouter Article
          
          </li>
           
          <li className={acquis?"nav-item active":"nav-item"} onClick={()=>openAcquis()}>
Consulter Article          </li>
      
        </ul>
       
      </nav>
    </>
  );
}

export default MenuArticle;