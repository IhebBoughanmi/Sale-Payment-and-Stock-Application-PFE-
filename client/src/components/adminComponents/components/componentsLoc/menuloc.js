import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './comp1.css';


function MenuEch(props) {
  const [click, setClick] = useState(false);
  const [com,setCom]=useState(true)
  const [maj,setMaj]=useState(false)
  const [acquis,setAcquis]=useState(false)

  
  const openMaj=()=>{
    setAcquis(false);
   
    setMaj(true);
    handleCommands("Ajouter Ech");
  }
  const openAcquis=()=>{
    setAcquis(true);
   
    setMaj(false);
    handleCommands("Consulter Ech");

  }
  const handleCommands=(name)=>{
    props.handleCommander(name)
  }
  return (
    <>
      <nav className='navbar'>
       
        
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          
          <li className={maj?"nav-item active":"nav-item"} onClick={()=>openMaj()} >
       Mise à jour échantillon
          
          </li>
           
          <li className={acquis?"nav-item active":"nav-item"} onClick={()=>openAcquis()}>
       Consulter les échantillons           </li>
      
        </ul>
       
      </nav>
    </>
  );
}

export default MenuEch;