import React,{useState,FC } from 'react'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { TextField,} from "@material-ui/core";
import './comp2.css';
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({

  code: yup.number().required('Veuillez entrer le code du mode de livraison').test(
    "maxDigits",
    "au minimum deux nombres",
    (number) => String(number).length >5
  ), 
  
  modelivraison: yup.string().min(4).max(20).required('Veuillez entrer le mode de livraison').matches(/^[A-Za-z ]*$/, 'Veuillez entrer un nom valide'),
  
  
 });
  
  const Ajoutmodelivraison: FC = () => {
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
  const useStyles = makeStyles(() => ({
    input1: {
      height: 5 ,
      fontSize: "15px",
      background:"white",
    
     },
    
  }));
  interface IFormInputs {
   code: number;
   modelivraison: string;
 
   
  }

  const [Submitted,setSubmitted]=useState(false);
  const [error,setError]=useState(false);
  const submit :SubmitHandler<IFormInputs> =  (data)=>{ 
  
var Codemodedelivraison=(data.code);
var Modedelivraison=(data.modelivraison);


    axios.post("http://localhost:5000/modedelivraison/ajoutermodelivraison",{Codemodedelivraison,Modedelivraison})

         
    .then(res => {
        if(res.status===200){
          reset({ modelivraison:'',code:''}) 
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



  return (
   <div className='contaddpaie'>
             <h3>Ajouter un mode de livraison</h3>
             {Submitted? <Alert className='success-pop' severity="success">
              <AlertTitle>Succès</AlertTitle>
                Mode de livraison bien ajouté
              </Alert>:null}
            {error? <Alert  className='warning-pop' severity="warning">
        <AlertTitle>Alerte</AlertTitle>
        Un mode de livraison existe déja avec le code saisie — <strong>Veuillez consulter la liste des modes de livraison!</strong>
      </Alert>:null}
      <>
    <form className='formajoutmodelivraison' onSubmit={handleSubmit(submit)}>
    <div className='iputarticle'>
    <Controller
            name="code"
            control={control}
           
            render={({ field }) => (
              <TextField    id="Codemodedelivraison"
              label="Code mode de livraison"
              variant="standard"
              placeholder="Entrer le code du mode de livraison"
              fullWidth
              margin="normal"
              
              defaultValue=""
              {...field}
                error={!!errors.code}
                helperText={errors.code? errors.code?.message : ''}
               
              />
            )}
          />
          
          <Controller
            name="modelivraison"
            control={control}
           
            render={({ field }) => (
              <TextField    id="modedelivraison"
              label="mode de livraison"
              variant="standard"
              placeholder="Entrer le mode de livraison"
              fullWidth
              margin="normal"
              
              defaultValue=""
              {...field}
                error={!!errors.modelivraison}
                helperText={errors.modelivraison? errors.modelivraison?.message : ''}
               
              />
            )}
          />
          
           <br></br>
           <br></br>
           <div className='butartt'>
            <div className='btt'>
     <Button   type='submit' variant="contained" endIcon={<SendIcon />}> Envoyer </Button>
   </div> 
     <div className='btt'> <Button type='reset'   onClick={() => { reset({ modelivraison:'',code:''})  } } variant="outlined" startIcon={<DeleteIcon />}> Annuler </Button>  </div>
      </div>  </div>
</form>
    </>
    <p>{error}</p>
      <p>{Submitted}</p>
   </div>
   
  );
}
export default Ajoutmodelivraison ; 