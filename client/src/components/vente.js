import React from 'react'
import jwt_decode from "jwt-decode"
import Rventes from  './responsabledeventeComponents/hi';

function Vente() {
  const token=localStorage.getItem('token');
  if(token===null){
    return(
      <p>Access denied</p>
    )
  }
  else{
    const decoded=jwt_decode(token);
    if(decoded.acctype==='Responsable Ventes'){
      return (
        <Rventes/>
      )
    }
    else{
      return(
        <p>Permission denied !</p>
      )
    }
  }
 
}
export default Vente;