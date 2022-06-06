import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField,} from "@material-ui/core";
import axios from 'axios'
import { MenuItem,FormControl,InputLabel,Select } from '@mui/material';
import "./Ajoutclient.css"
function Majcomptesmodal(props) {
   const [societe, setsociete]=useState('');
    const [nom,setnom]=useState('')
    const [Prenom,setPrenom]=useState('')
    const [mail,setmail]=useState('')
    const [Identifiant,setIdentifiant]=useState('')
    const [password,setpassword]=useState('')
    const [acctype,setacctype]=useState('')
    const [Submitted,setSubmitted]=useState(false);
    const [error,setError]=useState(false);

    const reset=()=>{
      setsociete("");
      setnom("");
      setPrenom("");
      setmail("");
      setIdentifiant("");
      setpassword("");
      setacctype("");
}

  useEffect(()=>{
      setsociete(props.data.societe)
      setnom(props.data.nom)
      setPrenom(props.data.prenom)
      setmail(props.data.mail)
      setIdentifiant(props.data.identifiant)
      setpassword(props.data.password)
      setacctype(props.data.acctype)
  },[props])
    const onSubmit=(data)=>{
        axios.put(`http://localhost:5000/user/update/${props.data._id}`,{societe:societe,nom,prenom:Prenom,mail:mail,identifiant:Identifiant,acctype:acctype,password})
        .then(res => {
          if(res.status===200){
            reset();
            setSubmitted(true)
            props.loadarticles()
            props.handleClose()
          
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
    const style = {
      position: 'absolute',
      top: '49%',
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
  return (<>   
  <React.Fragment>
    <Modal
hideBackdrop
open={props.open}
onClose={props.handleClose}
aria-labelledby="child-modal-title"
aria-describedby="child-modal-description"
>
<Box sx={{ ...style, width: 800, height:550 }}>
  <h2 id="child-modal-title">Mise à jour compte utilisateur</h2>
  <p id="child-modal-description">
    Vous pouvez mettre ce compte utilsateur à jour
  </p><form >

<div  className='accmodalcss'>
<div>
        <TextField variant="standard" id="demo-helper-text-misaligned-no-helper" 
        label="Identifiant"   value={Identifiant} onChange={(e)=>setIdentifiant(e.target.value)}  fullWidth   disabled/></div>
 
  <div> <TextField variant="standard"id="demo-helper-text-misaligned-no-helper" 
        label="Société"   value={societe} onChange={(e)=>setsociete(e.target.value)}  fullWidth/>
        </div>
         <div><TextField variant="standard" id="demo-helper-text-misaligned-no-helper" 
        label="Nom"   value={nom} onChange={(e)=>setnom(e.target.value)}  fullWidth/> </div>
      <div>  <TextField variant="standard" id="demo-helper-text-misaligned-no-helper" 
        label="Prenom"   value={Prenom} onChange={(e)=>setPrenom(e.target.value)}  fullWidth/> </div>
       <div> <TextField variant="standard" id="demo-helper-text-misaligned-no-helper" 
        label="E-mail"    value={mail} onChange={(e)=>setmail(e.target.value)}  fullWidth/> </div>
       <div> <TextField variant="standard" id="demo-helper-text-misaligned-no-helper" 
        label="Mot de passe"  onChange={(e)=>setpassword(e.target.value)}  value={password}  type="password" fullWidth/> </div>
     

   <div>
        <FormControl   fullWidth>
        <InputLabel variant="filled" id="demo-simple-select-label">Type utilisateur</InputLabel>
        <Select
        required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={acctype}
            label="acctype"
            variant="standard"
            onChange={(e)=>setacctype(e.target.value)}
        >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="vente">Service Vente</MenuItem>
            <MenuItem value="depot">Service Depot</MenuItem>
            <MenuItem value="reglement">Service Réglement</MenuItem>
        </Select>
        </FormControl></div>
        <br></br>
    
     <div>
     <Button onClick={onSubmit}>Envoyer</Button>
        <Button onClick={props.handleClose}>Fermer</Button></div></div></form>
</Box>
</Modal>
    </React.Fragment>
</>
    )
}

export default Majcomptesmodal