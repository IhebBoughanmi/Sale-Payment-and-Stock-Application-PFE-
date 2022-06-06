import React from 'react'
import jwt_decode from "jwt-decode"
import {Navigate} from 'react-router-dom'



function Redirecter() {
    const token=localStorage.getItem('token');
    if(token!==null){
       const decoded=jwt_decode(token);
       if(decoded.acctype==="admin"){
           return <Navigate to="/admin" replace={true} />
       }
       else if(decoded.acctype==="Responsable Depot"){
           return <Navigate to="/depot" replace={true} />
       }
       else if(decoded.acctype==="client"){
       return <Navigate to="/client" replace={true} />
       }
       else if(decoded.acctype==="Responsable Réglement"){
       return <Navigate to="/reglement" replace={true} />
       }
       else if(decoded.acctype==="Responsable Ventes"){
        return <Navigate to="/vente" replace={true} />
       }
    }
}

export default Redirecter