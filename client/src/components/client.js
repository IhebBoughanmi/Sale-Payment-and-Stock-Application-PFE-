import React from 'react'
import jwt_decode from "jwt-decode"
import Clients from  './clientcomponents/clients';

function Client() {
  const token=localStorage.getItem('token');
  if(token===null){
    return(
      <p>Access denied</p>
    )
  }
  else{
    const decoded=jwt_decode(token);
    if(decoded.acctype==='client'){
      return (
        <Clients/>
      )
    }
    else{
      return(
        <p>Permission denied !</p>
      )
    }
  }
 
}

export default Client