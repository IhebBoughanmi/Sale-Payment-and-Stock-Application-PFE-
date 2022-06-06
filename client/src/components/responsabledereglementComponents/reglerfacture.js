import Dialog from "./dialog";
import { FcDeleteRow} from 'react-icons/fc';
import React,{useEffect,useState, useRef} from 'react';
import axios from 'axios'
import './regler.css'
import Majarticlemodal from './Majcommandemodal';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

export default function Reglfcture() {
 
 
  
  const [data,setData]=useState();

  const [id,setId]=useState('') 
  const [open, setOpen] = React.useState(false);

  const handleOpen = (el) => {
    setOpen(true);
    setId(el)
  };
  const handleClose = () => {

    setOpen(false);
  };
  const [affichecommandeclientvalider,setAffichecommandeclientvalider]=useState([]) 
  const toutcommandesvalider=[];
  const loadcommandevalider=()=>{
    axios.get(`http://localhost:5000/facturation/allfactures`)
    .then(res=>{ setAffichecommandeclientvalider(res.data)
   
    })
    .catch(err=>{
      console.log("data not found")
    })
  }
    ;
    useEffect(()=>{
      loadcommandevalider();
     

     },[]);
  return (
    <>
   
      
      <form action="/" method="POST"  >
      <div className="tablesizeregler">
        <br></br> <br></br> <br></br> <br></br>
        <div class="cadre-table-scrollregler">
        <Card>
              <CardHeader>
                <CardTitle tag="h4">Liste de factures à régler</CardTitle>
              </CardHeader>
            
    <CardBody>
                <Table responsive>
                <thead className="text-primary">
                <tr>
               
                <th scope="col"   style={{ width: 500,  }}>Numéro de la facture</th >
                <th scope="col"   style={{ width: 500,  }}>Identifiant</th >
                <th scope="col"   style={{ width: 500,  }}>Nom et prénom</th >
                <th scope="col"   style={{ width: 500,  }}>Date de validation de la commande</th >
                <th scope="col"   style={{ width: 500,  }}>Date de passation de la commande</th >
                <th scope="col"   style={{ width: 500,  }}>Mode de paiement</th >
                  
                    <th scope="col"  style={{ width: 100,  }}>Prix en(dt)</th>
                    <th scope="col"  style={{ width: 100,  }}>Régler</th>
                 
              
                  
                    
                    
                 
                </tr>
                </thead>
            <tbody>
          
            {affichecommandeclientvalider.filter( el=>el.Modepaiement!="enligne" && el.etat==="valide" && el.acquit==='oui').map(el=>{
      return ( <><tr>
      
         <td   scope="row">{el.Numcomm}</td>
         <td   scope="row">{el.Codeclient}</td>
         <td   scope="row">{el.nomprenom}</td>
         <td   scope="row">{el.Datevalidationcomm}</td>
         <td   scope="row">{el.Datecomm}</td>
  
        <td  scope="row">{el.Modepaiement}</td>
        <td  scope="row">{el. PrixTOT}</td>
        <td >  <a class="btndetails border-shadowdetails ">
            <span  onClick={()=>{handleOpen(el)}} ><i class="fas fa-pencil-alt"> </i></span> </a></td>
           

      </tr>
      <Majarticlemodal   loadcommandevalider={loadcommandevalider} open={open} data={id}handleClose={handleClose}/>
     
     
       
      </>
      )
    })}
       
   </tbody>
   
               
   </Table>
              </CardBody>
              </Card>
        </div> </div>
    </form>

      </>
) }