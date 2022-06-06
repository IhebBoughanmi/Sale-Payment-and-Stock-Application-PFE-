import React,{useState,FC } from 'react'
import "./Ajoutclient.css"
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios' ;
import { makeStyles } from "@material-ui/core/styles";

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

const useStyles = makeStyles(() => ({
  input1: {
    height: 5 ,
    fontSize: "15px",
    background:"white",
    
   },
  
}));

interface IFormInputs {
  email: string;
  password: string;
 nom: string;
  prenom: string;
  identifiant:string;
  societe:string;
}

const schema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().min(8).max(12).required('Veuillez entrer le mot de passe '),
  nom: yup.string().min(4).max(15).required('Veuillez entrer le nom ').matches(/^[A-Za-z ]*$/, 'Veuillez entrer un nom valide'),
  prenom: yup.string().min(4).max(15).required('Veuillez entrer le prénom ').matches(/^[A-Za-z ]*$/, 'Veuillez entrer un prénom valide'),
  societe: yup.string().min(4).max(15).required('Veuillez entrer le prénom ').matches(/^[A-Za-z ]*$/, 'Veuillez entrer une societe valide'),
  identifiant: yup.string().min(13).max(13).required('Veuillez entrer la matricule fiscale ').test(
    "maxDigits",
    "au minimum deux nombres",
    (number) => String(number).length >7
  ), 
  
});
const Ajoutclient: FC = () => {
  const { control, handleSubmit,formState: { errors },reset, } = useForm<IFormInputs>({resolver: yupResolver(schema),});
    const [societe, setSociete]=useState('');
    const [Nom,setNom]=useState('')
    const [Prenom,setPrenom]=useState("")
    const [mail,setMail]=useState("");
    const [acctype, setAcctype]=useState('');
    const [error,setError]=useState(false);
    const [signed,setSigned]=useState(false);
    const maDate= new Date();
    const [date,setdate]=useState(maDate.toLocaleDateString("fr"));
    var elem = date.split('/');
    const [month,setmonth]=useState((elem[1]));
    const [year,setyear]=useState(elem[2]);
    const [day,setday]=useState(elem[0]);
    const [monthname,setmonthname]=useState(maDate.toLocaleString('en-us', { month: 'long' }));
    const submit :SubmitHandler<IFormInputs> =  (data)=>{
  var prenom=(data.prenom);
  var email=(data.email);
  var nom=(data.nom);
  var password=(data.password);
  var identifiant=(data.identifiant) ; 
  var societe=(data.societe) ; 
        axios.post("http://localhost:5000/user/sign-up",{societe,nom,prenom,email,identifiant,acctype, password,date,month,year,day,monthname})
        .then(res => {
            if(res.status===200){
              reset({prenom:'',nom:'', email: '',password: '',identifiant:'',societe:''}) ; setAcctype('') ; setSociete('') ;
              setSigned(true)
              const timer = setTimeout(() => {
                setSigned(false)
              }, 3000);}
            else{
              setError(true)
              const timer = setTimeout(() => {
                setError(false)
              }, 3000);
                setSigned(null); }
          })
        .catch(err =>  {setError(true)
        const timer = setTimeout(() => {
          setError(false)
        }, 3000); setSigned(null);}) }

  return (
    <>
    <br></br>  <br></br> 
    <div className='ajclientt'>
        <h3>Ajouter un compte utilisateur</h3>
       {signed? <Alert className='success-pop' severity="success">
              <AlertTitle>Succès</AlertTitle>
              Le Compte utilisateur est bien crée
            </Alert>:null}
            {error? <Alert  className='warning-pop' severity="warning">
        <AlertTitle>Alerte</AlertTitle>
        Un compte utilsateur est déja crée avec ce identifiant— <strong>Veuillez consulter la liste des utilsateur!</strong>
      </Alert>:null}  <form onSubmit={handleSubmit(submit)}>
        <div className='ajclientcontentt'>
      
        <div className='ajclientcontentt1'>
        <Controller
            name="societe"
            control={control}
           
            render={({ field }) => (
              <TextField variant="standard" id="demo-helper-text-misaligned-no-helper" 
          
                {...field}
                label="Société"
              
                error={!!errors.societe}
                helperText={errors.societe? errors.societe?.message : ''}
               
              />
            )}
          />
       
        <br></br>
        <Controller
            name="nom"
            control={control}
           
            render={({ field }) => (
              <TextField variant="standard" id="demo-helper-text-misaligned-no-helper" 
              onChange={(e)=>setNom(e.target.value)} value={Nom}  
                {...field}
                label="Nom"
              
                error={!!errors.nom}
                helperText={errors.nom ? errors.nom?.message : ''}
               
              />
            )}
          />
       <br></br>
       <Controller
            name="prenom"
            control={control}
     
            render={({ field }) => (
              <TextField variant="standard" id="demo-helper-text-misaligned-no-helper" 
              onChange={(e)=>setPrenom(e.target.value)} value={Prenom}  
                {...field}
                label="Prénom"  
                
                error={!!errors.prenom}
                helperText={errors.prenom ? errors.prenom?.message : ''}
               
              />
            )}
          />
        <br></br>
   <Controller
            name="email"
            control={control}
             defaultValue='Entrer un email valide'
            render={({ field }) => (
              <TextField variant="standard" id="demo-helper-text-misaligned-no-helper" 
              onChange={(e)=>setMail(e.target.value)} value={mail}  
                {...field}
                label="Email"
                
                error={!!errors.email}
                helperText={errors.email ? errors.email?.message : ''}
               
              />
            )}
          />
        
       
       
      
        
        <br></br>
        
        <Controller
            name="identifiant"
            control={control}
           
            render={({ field }) => (
              <TextField variant="standard" id="demo-helper-text-misaligned-no-helper" 
              label="Identifiant" 
                {...field}
                
                
                error={!!errors.identifiant}
                helperText={errors.identifiant ? errors.identifiant?.message : ''}
               
              />
            )}
          />
      
        </div>
        <div className='ajclientcontent1'>
         <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
               
                {...field}
                type="password"
                label="Mot de passe"
                variant="standard" id="demo-helper-text-misaligned-no-helper"
                error={!!errors.password}
                helperText={errors.password ? errors.password?.message : ''}
               
               
              />
            )}
          />
        <br></br>
     
        <FormControl variant="standard" fullWidth>
        <InputLabel variant="standard" id="demo-simple-select-label">Type utilisateur</InputLabel>
        <Select
        required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={acctype}
            label="acctype"
            onChange={(event)=>setAcctype(event.target.value)}
        >
            <MenuItem value="admin">Administrateur</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="Responsable Ventes">Responsable Ventes</MenuItem>
            <MenuItem value="Responsable Depot">Responsable Depot</MenuItem>
            <MenuItem value="Responsable Réglement">Responsable Réglement</MenuItem>
        </Select>
        </FormControl>
        <br></br>
        <div className='clearfix'>
        
        <Button type='submit'  variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>

      <Button  type='reset'   onClick={() => {  reset({prenom:'',nom:'', email: '',   password: '',
            identifiant:'',societe:''}) ,setAcctype('') ,setSociete('') } } variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
        </div>
       
        </div>   <p>{error}</p>
        <p>{signed}</p>
        </div></form>
    </div> </>
  )
};
export default Ajoutclient;
