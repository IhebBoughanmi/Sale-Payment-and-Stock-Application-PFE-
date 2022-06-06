import Dialog from "./dialog";
import React,{useEffect,useState, useRef} from 'react';
import './majetatcom.css'
import Majcommandemodal from './Majcommandemodal';
import axios from 'axios'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { FcApproval} from 'react-icons/fc';

import { BsInfoLg} from 'react-icons/bs';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
  const  MAJEC =()=> { 
    const idProductRef = useRef();
    const [dataarr,setDataarr]=useState();
    const [dialog, setDialog] = useState({
      message: "",
      isLoading: false,
      //Update
      nameProduct: ""
    });
   const handleDialog = (message, isLoading, nameProduct) => {
      setDialog({
        message,
        isLoading,
        //Update
        nameProduct
      });
    };
  
   const [Submitted,setSubmitted]=useState(false);
  const [error,setError]=useState(false);
    const handleDelete=(id)=>{
      handleDialog("voulez vous vraiment réfuser la commande numero", true, id,);
      idProductRef.current = id; };
const areUSureDelete = (choose) => {
  if (choose) {
    axios.delete(`http://localhost:5000/facturation/delete/${idProductRef.current}`)
    .then(res=>{if(res.status===200){
    const newaffiche= affiche.filter(el=>el._id!==idProductRef.current)
    setAffiche(newaffiche)
    }})
     .catch(err=>{console.log("not great")
   })
    handleDialog("", false);
  } else {
    handleDialog("", false);
  }
};
    const [des,setDes]=useState();
    const [id,setId]=useState('');
    const [date,setdate]=useState(new Date(), 'yyyy/MM/dd');
    const[numcmd,setnumcmd]=useState('');
   const handlevalider=(Codeclient,Lieulivraison,Modelivraison,Modepaiement,Nbrfut,Vol,Datecomm,Infoarticlescommander,PrixHT,PrixTOT,Remise,mongoid,email,nomprenom)=>{
   if (numcmd ==''){
     axios.post(`http://localhost:5000/facturation/ajouterfacture`,{Codeclient,Lieulivraison,Modelivraison,Modepaiement,Nbrfut,Vol,Datecomm,Infoarticlescommander,
     PrixHT,PrixTOT,Remise,mongoid,email,nomprenom,date})
     .then(res => {
      if(res.status===200){
        setSubmitted(true);
setnumcmd(mongoid);
        const timer = setTimeout(() => {
          setSubmitted(false)
        }, 3000);  }
      else{
        setError(true)
        const timer = setTimeout(() => {
          setError(false)
        }, 3000);
        setSubmitted("")
      } })
  .catch(err =>  {setError(true)
    const timer = setTimeout(() => {
      setError(false)
    }, 3000);
    setSubmitted("")
})}}
const handleDeletecommandevalider=(id)=>{
  if(id == numcmd){
  axios.delete(`http://localhost:5000/facturation/delete/${id}`)
  .then(res=>{if(res.status===200){
  const newaffiche= affiche.filter(el=>el._id!==id)
  setAffiche(newaffiche);
  setnumcmd('');
  }})
   .catch(err=>{console.log("not great")
 })}
} ;

   const [affiche,setAffiche]=useState([]) 
const loadarticles=()=>{
  axios.get("http://localhost:5000/commande/all")
  .then(res=>{ setAffiche(res.data)
    
  })
  .catch(err=>{
    console.log("data not found")
  })
};
  useEffect(()=>{
   loadarticles()
  },[]);
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = (el) => {
    setOpen(true);
    setDataarr(el)
  };
  const handleClose = () => {
    setOpen(false);
  };

    return (
<main id="site-mainn">
{Submitted? <Alert className='success-pop' severity="success">
    <AlertTitle>Succès</AlertTitle>
     commande valider
    </Alert>:null}
  {error? <Alert  className='warning-pop' severity="warning">
<AlertTitle>Alerte</AlertTitle>
erreur — <strong>erreur!</strong>
</Alert>:null}
<div class="containerrvente">
    
<br></br>
<br></br><br></br>


    <form  className="tablemajetatvente" >
    <Card>
              <CardHeader>
                <CardTitle tag="h4">Liste des commandes</CardTitle>
              </CardHeader>
            
    <CardBody>
                <Table responsive>
                <thead className="text-primary">
                <tr>
                <th>Numéro de commande</th > 
                    <th>Code client </th>
                    <th>Mode de paiement</th>
                    <th>Prix totale(Dt)</th>
                    <th>Valider</th>
                    <th>Détails</th>
                </tr>
            </thead>
            <tbody>
            {affiche.map(el=>{
      return ( <><tr>
         <td>{el._id}</td>
        <td>{el.Codeclient}</td>
        <td>{el.Modepaiement}</td>
        <td>{el.PrixTOT}</td>
       

         
            <td> <a class="btnvalider border-shadowvalide " >
            <span ><i   onMouseMove={()=>handleDeletecommandevalider(el._id)} onClick={()=>handlevalider(el.Codeclient,el.Lieulivraison,el.Modelivraison,el.Modepaiement,el.Nbrfut,el.Vol,el.Datecomm,el.Infoarticlescommander,el.PrixHT,el.PrixTOT,el.Remise,el._id,el.email,el.nomprenom) }    class="fa fa-check"></i></span> </a></td>
     
            
        <td >  <a class="btndetails border-shadowdetails ">
            <span  onClick={()=>{handleOpen(el.Infoarticlescommander)}} ><i>< BsInfoLg/> </i></span> </a></td>
      </tr>
      <Majcommandemodal open={open} data={dataarr} handleClose={handleClose}/>
     
       
      </>
      )
    })}
            {dialog.isLoading && (
        <Dialog
          //Update
          nameProduct={dialog.nameProduct}
          onDialog={areUSureDelete}
          message={dialog.message}
        />
      )}
   </tbody>
   </Table>
              </CardBody>
              </Card>
    </form>
 
</div>
<p>{error}</p>
      <p>{Submitted}</p>
</main>)}
 export default  MAJEC ;
