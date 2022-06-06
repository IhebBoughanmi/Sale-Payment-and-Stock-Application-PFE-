import React,{useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { TextField,} from "@material-ui/core";
import './comp2.css';
import axios from 'axios'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';


export default function Ajouterstock() {

  const [Designation, setDesignation]=useState('');
  const [Quantite,setQuantite]=useState(0);
  const [newQuantite,setnewQuantite]=useState('');
  const [Submitted,setSubmitted]=useState(false);
  const [error,setError]=useState(false);
  const [id, setid]=useState();

  const reset=()=>{
      setDesignation("");
      setQuantite("");
  }
  

  const [affiche,setAffiche]=useState([]) 

  useEffect(()=>{
    axios.get("http://localhost:5000/article/all")
    .then(res=>{
    setAffiche(res.data)    })
    .catch(err=>{
      console.log("data not found")
    })  
  },[])
   const handleStock=(e)=>{
     setQuantite(e.target.value);
   }



  const submit=(id)=>{
    axios.put(`http://localhost:5000/article/updatequantite/${id}`,{Quantite})
    .then(res => {
        if(res.status===200){
          setnewQuantite(res.data);
          let old=[...affiche];
          let i = affiche.findIndex((obj => obj._id === res.data._id));
          old[i].Quantite=res.data.Quantite+parseInt(Quantite);
          setAffiche(old);
          reset();
          setSubmitted(true)
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

  return (
    <>
    <br></br>
    <br></br>
    <br></br>
    <div className='bodysstock'>
      
   <div className='contaddart'>
             <h3 >Ajouter au stock</h3>

     {Submitted? <Alert className='success-pop' severity="success">
              <AlertTitle>Succès</AlertTitle>
                quantité modifiée
              </Alert>:null}
            {error? <Alert  className='warning-pop' severity="warning">
        <AlertTitle>Alerte</AlertTitle>
        champs invalides — <strong>Veuillez verifier les champs!</strong>
      </Alert>:null}
      <>
    <form className='formaddarticle'>
   
     <FormControl variant="standard" sx={{ m: 1, minWidth: 120,width:310 }}>
        <InputLabel id="demo-simple-select-filled-label"> Nom et quantité de l' Article</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={(e)=>setDesignation(e.target.value)} 
          value={Designation}
        >
          {affiche.map((el) => (
            <MenuItem onClick={()=>setnewQuantite(el.Quantite)} value={el._id}> {el.Designation} | Quantite : {el.Quantite} </MenuItem>
          ))}
        </Select>
      </FormControl>
  
           <TextField
            id="Ajout Quantité"
            label="Ajout Quantité"
            variant="standard"
            placeholder="Ajouter la quantité"
            fullWidth
            margin="normal"
            type='number'
            onChange={(e)=>handleStock(e)} value={Quantite}
          />
          <br></br><br></br>
     <div className='butstock'>
       
     <Button  onClick={()=>submit(Designation)}  variant="contained" endIcon={<SendIcon />}> Envoyer </Button></div>
     <div className='butstock'>
      <Button onClick={()=>reset()}  type='reset' variant="outlined" startIcon={<DeleteIcon />}> Annuler </Button>  </div>
</form>
    </>
    <p>{error}</p>
      <p>{Submitted}</p>
   </div>
   </div>
 </> );
}