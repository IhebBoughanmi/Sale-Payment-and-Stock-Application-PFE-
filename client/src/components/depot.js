import React from 'react'
import jwt_decode from "jwt-decode"
import Rdepot from './responsablededepotComponents/main';

function Depot() {
  const token=localStorage.getItem('token');
  if(token===null){
    return(
      <p>Access denied</p>
    )
  }
  else{
    const decoded=jwt_decode(token);
    if(decoded.acctype==='Responsable Depot'){
      return (
        <Rdepot/>
      )
    }
    else{
      return(
        <p>Permission denied !</p>
      )
    }
  }
 
}
export default Depot;