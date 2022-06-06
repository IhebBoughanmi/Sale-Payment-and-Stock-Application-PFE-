import React,{useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import '../styles/login.css';
import logo from '../assets/arablogo.png';
import axios from 'axios'
import {Navigate} from 'react-router-dom'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { styled } from '@material-ui/styles';
const MyButton = styled(Button)({
  
  borderRadius: 3,
  background: 'white',
 
 
});
function Login() {
  useEffect(()=>{localStorage.clear()
  setLog(false)
  },[])
// const [societe,setSociete]=useState('')
// const [usine,setUsine]=useState('')
const [identifiant,setIdentifiant]=useState("")
const [password,setPassword]=useState("");
// const [compagne,setCompagne]=useState("");
const [error,setError]=useState(false);
const [log,setLog]=useState(false);
const reset=()=>{
    // setSociete("");
    // setUsine("");
    setIdentifiant("");
    setPassword("");
    // setCompagne("");
    setError("");
}
const submit=()=>{
    axios.post("http://localhost:5000/user/login",{identifiant,password})
    .then(res => {
        if(res.status===200){
            localStorage.setItem('token',res.data.token);
            setLog(true);
        }
        else{
          const timer = setTimeout(() => {
            setError(false)
          }, 3000);
        }
    })
    .catch(err =>  {setError(true)
      const timer = setTimeout(() => {
        setError(false)
      }, 3000);
    })
}
  return (
    <div className='login-section'>
        <div className='banner'>
        <img src={logo} alt="arabsoft-logo" />
        </div>
        <div className='login-content'>
        <h3>Bienvenue dans la plateforme de la  Régie Nationale des Alcools</h3>
        
        {error? <Alert  className='warning-pop' severity="warning">
        <AlertTitle>Alerte</AlertTitle>
        Compte inexistant— <strong>Veuillez vérifier vos coordonnées!</strong>
      </Alert>:null}

        <form autoComplete='false'>
        {/* <TextField id="societe" onChange={(e)=>setSociete(e.target.value)} value={societe} fullWidth className='textfield' label="Societe" variant="outlined" color="primary" />
        <TextField id="usine" onChange={(e)=>setUsine(e.target.value)} value={usine} fullWidth className='textfield' label="Usine" variant="outlined" color="primary" /> */}
        <TextField id="ident" onChange={(e)=>setIdentifiant(e.target.value)} value={identifiant} fullWidth className='textfield' label="Identifiant" variant="outlined" color="primary" />
        <TextField id="password" onChange={(e)=>setPassword(e.target.value)} value={password} type="password" fullWidth className='textfield' label="Mot de passe" variant="outlined" color="primary" />
        {/* <TextField id="compagne" onChange={(e)=>setCompagne(e.target.value)} value={compagne} fullWidth className='textfield' label="Compagne" variant="outlined" color="primary" /> */}
        <div className='clearfix'>
        
        <Button onClick={()=>submit()} variant="contained"  endIcon={<SendIcon />}>
        Entrer
      </Button>


      <MyButton onClick={()=>reset()}  startIcon={<DeleteIcon />}>effacer</MyButton>
      
        </div>
        <p className='errorLogin'>{error}</p>
        </form>
        </div>
        {log && (<Navigate to="/redirecter" replace={true} />)}
    </div>
    
  )
}

export default Login;