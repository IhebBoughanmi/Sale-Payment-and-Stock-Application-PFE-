import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './comp2.css';


function Menumodelivraison(props) {
  const [click, setClick] = useState(false);
  const [com,setCom]=useState(true)
  const [maj,setMaj]=useState(false)
  const [acquis,setAcquis]=useState(false)

  
  const openMaj=()=>{
    setAcquis(false);
   
    setMaj(true);
    handleCommands("Ajouter Mode de livraison");
  }
  const openAcquis=()=>{
    setAcquis(true);
   
    setMaj(false);
    handleCommands("Consulter les modes de livraison");

  }
  const handleCommands=(name)=>{
    props.handleCommander(name)
  }
  return (
    <>
      <nav className='navbar'>
       
        
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          
          <li className={maj?"nav-item active":"nav-item"} onClick={()=>openMaj()} >
       Ajouter un mode de livraison
          
          </li>
           
          <li className={acquis?"nav-item active":"nav-item"} onClick={()=>openAcquis()}>
       Consulter les modes de livraison          </li>
      
        </ul>
       
      </nav>
    </>
  );
}

export default Menumodelivraison;