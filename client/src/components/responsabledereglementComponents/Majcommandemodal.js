import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField,} from "@material-ui/core";
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios'
import './regler.css'
function Majarticlemodal(props) {
  const submit=(id)=>{
    axios.put(`http://localhost:5000/facturation/updateetat/${id}`,{etat:"payee",Datepaiement:datpay,email})
    .then(res => {
        if(res.status===200){
          reset();
          setSubmitted(true)
        
          const timer = setTimeout(() => {
            setSubmitted(false)
            props.handleClose()
          }, 1000);
        }
        else{
          setError(true)
          
          setSubmitted("")
        }
    })
    .catch(err =>  {setError(true)
     
      setSubmitted("")
 })
}
const maDate= new Date();
const [datpay, setdatpay]=useState(maDate.toLocaleDateString("fr"));
    const [numfacture, setnumfacture]=useState("");
    const [codeclient,setcodeclient]=useState('')
    const [nomprenom,setnomprenom]=useState('')
    const [Prixtot,setPrixtot]=useState('')
    const [modeliv,setmodeliv]=useState('')
    const [lieuliv,setlieuliv]=useState('')
    const [modepai,setmodepai]=useState('')
    const [email,setemail]=useState('')
    const [Submitted,setSubmitted]=useState(false);
    const [error,setError]=useState(false);
   const reset=()=>{
      setnumfacture('')
      setcodeclient('')
      setPrixtot('')
      setmodeliv('')
      setlieuliv('')
      setmodepai('')
      setnomprenom('')
  }

  useEffect(()=>{
    setnumfacture(props.data.Numcomm)
    setemail(props.data.email)
  
    setcodeclient(props.data.Codeclient)
    setPrixtot(props.data.PrixTOT)
    setmodeliv(props.data.Modelivraison)
    setlieuliv(props.data.Lieulivraison)
    setmodepai(props.data.Modepaiement)
    setnomprenom(props.data.nomprenom)
  },[props])

 
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 8,
        pt: 2,
        px: 4,
        pb: 3,
      };
  return (
<>
{Submitted? <Alert className='success-pop' severity="success">
    <AlertTitle>Succès</AlertTitle>
    Facture réglée
    </Alert>:null}
<React.Fragment>
        <Modal
        hideBackdrop
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 800, height:450 }}>
          <h2 id="child-modal-title">Régler facture</h2>
         
          <div className='gridreglement'>
        
          <label for="position">Numéro de factue</label>
     <input  value= {numfacture} disabled></input>

     <label for="position">codeclient</label>
     <input  value= {codeclient} disabled ></input>
     
     <label for="position">nom et prénom</label>
     <input  value= {nomprenom} disabled ></input>
     <label for="position">Prix totale</label>
     <input  value= {Prixtot} disabled></input>
     <label for="position">lieu de livraison</label>
     <input  value= {lieuliv} disabled></input>
     <label for="position">code et nom de mode de paiement</label>
     <input  value= {modepai} disabled></input></div>
     
     
        <Button  onClick={()=>submit(props.data._id)}>Régler</Button>
        <Button  onClick={props.handleClose}>Fermer</Button>
        </Box>
      </Modal>
            </React.Fragment>
            <p>{error}</p>
      <p>{Submitted}</p>
</>
    )
}

export default Majarticlemodal