import React from 'react'
import jwt_decode from "jwt-decode"
import Rreglement from './responsabledereglementComponents/regl';

function Reglement() {
  const token=localStorage.getItem('token');
  if(token===null){
    return(
      <p>Access denied</p>
    )
  }
  else{
    const decoded=jwt_decode(token);
    if(decoded.acctype==="Responsable Réglement"){
      return (
        <Rreglement/>
      )
    }
    else{
      return(
        <p>Permission denied !</p>
      )
    }
  }
 
}
export default Reglement;