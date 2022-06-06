import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './comp2.css';


function Menumodepaiement(props) {
  const [click, setClick] = useState(false);
  const [com,setCom]=useState(true)
  const [maj,setMaj]=useState(false)
  const [acquis,setAcquis]=useState(false)

  
  const openMaj=()=>{
    setAcquis(false);
   
    setMaj(true);
    handleCommands("Ajouter Mode de paiement");
  }
  const openAcquis=()=>{
    setAcquis(true);
   
    setMaj(false);
    handleCommands("Consulter les modes de paiement");

  }
  const handleCommands=(name)=>{
    props.handleCommander(name)
  }
  return (
    <>
      <nav className='navbar'>
       
        
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          
          <li className={maj?"nav-item active":"nav-item"} onClick={()=>openMaj()} >
       Ajouter un mode de paiement
          
          </li>
           
          <li className={acquis?"nav-item active":"nav-item"} onClick={()=>openAcquis()}>
       Consulter les modes de paiement          </li>
      
        </ul>
       
      </nav>
    </>
  );
}

export default Menumodepaiement;