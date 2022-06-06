import React from 'react'
import jwt_decode from "jwt-decode"
import Admine from  './adminComponents/Admine';

function Admin() {
  const token=localStorage.getItem('token');
  if(token===null){
    return(
      <p>Access denied</p>
    )
  }
  else{
    const decoded=jwt_decode(token);
    if(decoded.acctype==='admin'){
      return (
        <Admine/>
      )
    }
    else{
      return(
        <p>Permission denied !</p>
      )
    }
  }
 
}
export default Admin