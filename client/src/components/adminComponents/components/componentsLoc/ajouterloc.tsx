import React,{useState,FC,useEffect } from 'react'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { TextField,} from "@material-ui/core";
import './comp1.css';
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { yupResolver } from '@hookform/resolvers/yup';


const useStyles = makeStyles(() => ({
  input1: {
    height: 5 ,
    fontSize: "15px",
    background:"white",
   },
}));

interface IFormInputs {
VC :number;
DegreEnfencement:number;
Temperature:number;
TAV:number;
Densite:number;
Coef:number;
}
const schema = yup.object().shape({
  VC: yup.number().required('Veuillez entrer la VC'),
  DegreEnfencement: yup.number().required('Veuillez entrer la degré de enfencement'),
  Temperature: yup.number().required('Veuillez entrer la température'),
  TAV: yup.number().required('Veuillez entrer le TAV'),
  Densite: yup.number().required('Veuillez entrer la densité'),
  Coef: yup.number().required('Veuillez entrer la Coef')

});
 
  const AddEch: FC = () => {
    const {
      register,
      control,
      handleSubmit,
      watch,
      formState: { errors ,isSubmitSuccessful},
      reset,  resetField, setValue
    
    } = useForm<IFormInputs>({
      resolver: yupResolver(schema),
     
     });
   
  const classes = useStyles();
  const [CodeArticle,setCodeArticle]=useState('')
  const [Designation,setDesignation]=useState('')
  const [id,setdata]=useState('')
  const [Submitted,setSubmitted]=useState(false);
  const [error,setError]=useState(false);
  const [valide,setvalide]=useState(false);
  const [formsubmit,setfprmsubmit]=useState(true);

const submit :SubmitHandler<IFormInputs> =  (data)=>{
var vc=(data.VC);
var deg=(data.DegreEnfencement);
var temp=(data.Temperature);
var tav=(data.TAV);
var dens=(data.Densite);
var coef=(data.Coef);
var codeart=(CodeArticle);


let str=`http://localhost:5000/article/updateechent/${Designation}`;
axios.put(str,{VC:vc,DegreEnfencement:deg,Temperature:temp,TAV:tav,Densite:dens,Coef:coef,Date:new Date(),})
.then(res => {
    if(res.status===200){
     reset({VC:'',DegreEnfencement:'',Temperature:'',TAV:'',Densite:'',Coef:''})
     setCodeArticle('')
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
      setSubmitted(null)
    }
})
.catch(err =>  {setError(true)
  const timer = setTimeout(() => {
    setError(false)
  }, 3000);
  setSubmitted(null)
})
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

  return (
  
    <div className='body'>
  
             <h3>Mise à jour échantillon</h3>

     {Submitted? <Alert className='success-pop' severity="success">
              <AlertTitle>Succès</AlertTitle>
                Article bien ajouter
              </Alert>:null}

            {error? <Alert  className='warning-pop' severity="warning">
        <AlertTitle>Alerte</AlertTitle>
        Un article existe déja avec le code article saisie — <strong>Veuillez consulter la liste des articles!</strong>
      </Alert>:null}

      <>
    <form className='formaddarticle' onSubmit={handleSubmit(submit)} >
<div className='iputarticle'>

<FormControl variant="standard" sx={{ m: 1, minWidth: 120,width:310 }}>
        <InputLabel id="demo-simple-select-filled-label">Désignation de l'article</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={(e)=>setDesignation(e.target.value)} 
          value={Designation}
        >
          {affiche.map((el) => (
            <MenuItem value={el._id}> {el.Designation} </MenuItem>
          ))}
        </Select>
      </FormControl>
            
      <Controller
            name="VC"
            control={control}
           
            render={({ field }) => (
              <TextField     
              id="vc"
              fullWidth
              margin="normal"
              variant="filled"
              defaultValue=""
              label="VC"
              InputProps={{ classes: { input: classes.input1 } }}
              placeholder="entrer le VC"
              {...field}
                error={!!errors.VC}
                helperText={errors.VC? errors.VC?.message : ''}
               
              />
            )}
          />
           <Controller
            name="DegreEnfencement"
            control={control}
           
            render={({ field }) => (
              <TextField    
              id="denf"
              label="Degré d'enfencement"
              variant="filled"
              placeholder="entrer la Degré d'enfencement"
              fullWidth
              margin="normal"
              InputProps={{ classes: { input: classes.input1 } }}
              {...field}
                error={!!errors.DegreEnfencement}
                helperText={errors.DegreEnfencement? errors.DegreEnfencement?.message : ''}
               
              />
            )}
           
          />
          <Controller
          name="Temperature"
          control={control}
         
          render={({ field }) => (
              <TextField   
              id="temp"
              label="Température"
              variant="filled"
              placeholder="entrer la Température"
              fullWidth
              margin="normal"
              InputProps={{ classes: { input: classes.input1 } }}
              {...field}
                error={!!errors.Temperature}
                helperText={errors.Temperature? errors.Temperature?.message : ''}
               
              />
            )}
              
               
              />
          
              <Controller
              name="TAV"
              control={control}
             
              render={({ field }) => (
              <TextField    
              id="tav"
              label="TAV"
              variant="filled"
              placeholder="entrer le TAV"
              fullWidth
              margin="normal"
              InputProps={{ classes: { input: classes.input1 } }}
              {...field}
                error={!!errors.TAV}
                helperText={errors.TAV? errors.TAV?.message : ''}
               
              />
            )}
           
          />
          <Controller
          name="Densite"
          control={control}
         
          render={({ field }) => (
              <TextField    
              id="dens"
              label="Densité"
              variant="filled"
              placeholder="entrer la Densité"
              fullWidth
              margin="normal"
              InputProps={{ classes: { input: classes.input1 } }}
              {...field}
                error={!!errors.Densite}
                helperText={errors.Densite? errors.Densite?.message : ''}
               
              />
            )}
           
          />
          <Controller
          name="Coef"
          control={control}
         
          render={({ field }) => (
              <TextField    
              id="coef"
              label="Coef.C"
              variant="filled"
              placeholder="entrer la Coef.C"
              fullWidth
              margin="normal"
              InputProps={{ classes: { input: classes.input1 } }}
              {...field}
              error={!!errors.Coef}
              helperText={errors.Coef? errors.Coef?.message : ''}
             
            />
          )}
            />
          
       
         </div>
          <div className='butart'>
            <div className='bt'>
              <br></br>
<Button  type='submit' variant="contained" endIcon={<SendIcon />}> Envoyer </Button></div>
<div className='bt'>
 <Button type='reset' onClick={() => { reset({VC:null,DegreEnfencement:null,Temperature:null,TAV:null,Densite:null,Coef:null})  } }variant="outlined" startIcon={<DeleteIcon />}> Annuler </Button>  </div>
 </div>
</form>


    </>
    <p>{error}</p>
      <p>{Submitted}</p>
  </div>
   
  );
  }
export default  AddEch;