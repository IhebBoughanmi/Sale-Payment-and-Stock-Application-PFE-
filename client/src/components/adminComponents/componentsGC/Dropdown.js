import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import './Dropdown.css';

function Dropdown(props) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const handleCommander=(name)=>{
    props.handleCommands(name)
  }
  return (
    <>
      <ul className='dropdown-menu'>
        {MenuItems.map((item, index) => {
          return (
            <li key={index} onClick={()=>handleCommander(item.title)} >
              
                {item.title}
            </li>
          );
        })}
      </ul>
    </>
  );
}
export default Dropdown;