
import React,{useEffect,useState} from 'react';
import axios from 'axios'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

export default function Facture() {
 
  const [affichecommandeclientvalider,setAffichecommandeclientvalider]=useState([]) 
 
  const loadcommandevalider=()=>{
    axios.get(`http://localhost:5000/cmdpayer/allfacturespayer`)
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
    <form action="/" method="POST"  >*
    <br></br> <br></br> <br></br> <br></br>
        <div class="cadre-table-scrollregler">
        
        <Card>
              <CardHeader>
                <CardTitle tag="h4">Historique des factures</CardTitle>
              </CardHeader>
            
    <CardBody>
                <Table responsive>
                <thead className="text-primary">
                <tr>
               
                <th scope="col"   style={{ width: 500,  }}>Numéro de la facture</th >
                <th scope="col"   style={{ width: 500,  }}>Identifiant </th >
                <th scope="col"   style={{ width: 500,  }}> Nom et prénom </th >
                <th scope="col"   style={{ width: 500,  }}>Date de validation de la commande</th >
                <th scope="col"   style={{ width: 500,  }}>Date de passation de la commande</th >
                <th scope="col"   style={{ width: 500,  }}>Mode de paiement</th >
                  <th scope="col"  style={{ width: 100,  }}>Mode de livraison</th>

                    <th scope="col"  style={{ width: 100,  }}>Prix en(dt)</th>
              
                  
                    
                    
                 
                </tr>
                </thead>
            <tbody>
          
            {affichecommandeclientvalider.map(el=>{
      return ( <><tr>
        
         <td   scope="row">{el.Numcomm}</td>
         <td   scope="row">{el.Codeclient}</td>
         <td   scope="row">{el.nomprenom}</td>
         <td   scope="row">{el.Datevalidationcomm}</td>
         <td   scope="row">{el.Datecomm}</td>
  
        <td  scope="row">{el.Modepaiement}</td>
        <td  scope="row">{el. Modelivraison}</td>
        <td  scope="row">{el. PrixTOT}</td>
      

      </tr>
   
       
      </>
      )
    })}
             
   </tbody>
   
               
   </Table>
              </CardBody>
              </Card>
        </div>
    </form>

      </>
) }