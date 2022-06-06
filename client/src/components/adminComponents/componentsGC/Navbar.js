import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import './Navbar.css';
import Dropdown from './Dropdown';


function Navbar(props) {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
 
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [com,setCom]=useState(true)
  const [maj,setMaj]=useState(false)
  const [acquis,setAcquis]=useState(false)
  const openDropdown=()=>{
    setDropdown(true)
  }
  const closeDropdown=()=>{
    setDropdown(false)
  }
  const openMaj=()=>{
    setAcquis(false);
    setCom(false);
    setMaj(true);
    handleCommands("MAJ acquis a cotions");
  }
  
  const openAcquis=()=>{
    setAcquis(true);
    setCom(false);
    setMaj(false);
    handleCommands("MAJ acquis a cotions");

  }
  const handleCommands=(name)=>{
    props.handleCommander(name)
  }
  
  return (
    <>
      <nav className='navbar'>
       
        
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          
          <li
            className={com?"nav-item active":"nav-item"}
            onMouseEnter={()=>openDropdown()}
            onMouseLeave={()=>closeDropdown()}
          >
             Commandes  
             {!dropdown?<ArrowDropDownIcon />:<ArrowDropUpIcon />}
           
            {dropdown?<Dropdown handleCommands={handleCommands} />:null}
          </li>
          
          <li className={maj?"nav-item active":"nav-item"} onClick={()=>openMaj()} >
       
            Saisir acquit à caution
          </li>
           
          
          
        </ul>
       
      </nav>
    </>
  );
}

export default Navbar;