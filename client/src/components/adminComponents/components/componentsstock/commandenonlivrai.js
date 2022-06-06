import React,{useEffect,useState, useRef} from 'react';
import axios from 'axios'
import Alert from '@mui/material/Alert';
import { BsCheckLg} from 'react-icons/bs';
import AlertTitle from '@mui/material/AlertTitle';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
export default function Livraison() {
  const maDate= new Date();
  const[numcmd,setnumcmd]=useState('');
  const [date,setdate]=useState(maDate.toLocaleDateString("fr"));
  var elem = date.split('/');
  const [Submitted,setSubmitted]=useState(false);
  const [month,setmonth]=useState((elem[1]));
  const [year,setyear]=useState(elem[2]);
  const [day,setday]=useState(elem[0]);
  const [monthname,setmonthname]=useState(maDate.toLocaleString('en-us', { month: 'long' }));
 
  
 

  const [error,setError]=useState(false);
  const handlevalider=(Codeclient,Lieulivraison,Modelivraison,Modepaiement,Nbrfut,Vol,Datecomm,Infoarticlescommander,PrixTOT,Remise,mongoid,Numcomm,etat,acquit,bonsorite,Datevalidationcomm,Datepaiement,email,nomprenom)=>{
    if (numcmd ==''){
      axios.post(`http://localhost:5000/facturation/ajouterfacturehistorique`,{Codeclient,Lieulivraison,Modelivraison,Modepaiement,Nbrfut,Vol,Datecomm,Infoarticlescommander,PrixTOT,Remise,mongoid,Numcomm,etat,acquit,bonsorite,Datevalidationcomm,Datepaiement,email,nomprenom,date,month,year,day,monthname})
      .then(res => {
       if(res.status===200){
       
         setSubmitted(true);
        
 setnumcmd(mongoid);
         const timer = setTimeout(() => {
           setSubmitted(false)
         }, 3000);
       }
 
       else{
         setError(true)
         const timer = setTimeout(() => {
           setError(false)
         }, 3000);
         setSubmitted("")
       }
   })
   .catch(err =>  {setError(true)
     const timer = setTimeout(() => {
       setError(false)
     }, 3000);
     setSubmitted("")
 })
 }
 }
 const handleDeletecommandevalider=(id)=>{
   if(id == numcmd){
   axios.delete(`http://localhost:5000/facturation/deletefacture/${id}`)
   .then(res=>{if(res.status===200){
   const newaffiche=affichecommandeclientvalider.filter(el=>el._id!==id)
   setAffichecommandeclientvalider(newaffiche);
   setnumcmd('');
   }})
    .catch(err=>{console.log("not great")
  })}
 } 
 ;
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
  return (<>
  {Submitted? <Alert className='success-pop' severity="success">
    <AlertTitle>Succès</AlertTitle>
     facture livrée
    </Alert>:null}
  {error? <Alert  className='warning-pop' severity="warning">
<AlertTitle>Alerte</AlertTitle>
erreur — <strong>erreur!</strong>
</Alert>:null}
 
      <form action="/" method="POST"  >
      <br></br> <br></br> <br></br> <br></br>
        <div class="cadre-table-scrollregler">
         
        <Card>   <CardHeader>
                <CardTitle tag="h4">Liste de factures à livrer</CardTitle>
              </CardHeader>
            
    <CardBody>
                <Table responsive>
                <thead className="text-primary">
                <tr>
                
                    <th scope="col"   style={{ width: 500,  }}>Numéro de facture</th>
                    <th scope="col"   style={{ width: 500,  }}>Identifiant</th>
                    <th scope="col"   style={{ width: 500,  }}>Nom et pténom</th>
                    <th scope="col"   style={{ width: 500,  }}>Mode de livraison</th>
                    <th scope="col"   style={{ width: 100,  }}>Prix</th>
                    <th scope="col"   style={{ width: 100,  }}>Acquit</th>
                    <th scope="col"   style={{ width: 100,  }}>Bonsortie</th>
                    <th scope="col"   style={{ width: 100,  }}>Livrer</th>

                </tr>
                </thead>
            <tbody>
          
            {affichecommandeclientvalider.filter( el=> el.etat==="payee" &&  el.bonsorite==="oui").map(el=>{
      return ( <>
      <tr>
       
         <td   scope="row">{el.Numcomm}</td>
         <td   scope="row">{el.Codeclient}</td>
         <td   scope="row">{el.nomprenom}</td>
         <td  scope="row">{el. Modelivraison}</td>
         <td  scope="row">{el. PrixTOT}</td>
         <td   scope="row">{el.acquit}</td>
         <td   scope="row">{el.  bonsorite}</td>
         <td >  <a class="btndetails border-shadowdetails ">
            <span  ><i  onMouseMove={()=>handleDeletecommandevalider(el._id)} 
            onClick={()=>handlevalider(el.Codeclient,el.Lieulivraison,el.Modelivraison,el.Modepaiement,
            el.Nbrfut,el.Vol,el.Datecomm,el.Infoarticlescommander,el.PrixTOT,el.Remise,el._id ,el.Numcomm,
            el.etat,el.acquit,el.bonsorite,el.Datevalidationcomm,el.Datepaiement,el.email,el.nomprenom) } >  
            <BsCheckLg/></i></span> </a></td>
           
      </tr>
    
     
     
       
      </>
      )
    })}
       
   </tbody>
           
   </Table>
              </CardBody>
              </Card>
        </div>
        
        <p>{error}</p>
      <p>{Submitted}</p>
    </form>
  </>
  )
}
