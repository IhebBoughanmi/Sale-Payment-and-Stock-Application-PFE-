
import React,{useState,FC } from 'react'
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
import { yupResolver } from '@hookform/resolvers/yup';
const useStyles = makeStyles(() => ({
  input1: {
    height: 5 ,
    fontSize: "15px",
    background:"white" },
}));

const schema = yup.object().shape({
 code: yup.string().required('Veuillez entrer le code de l"article').min(6).max(6),
  nom: yup.string().min(4).max(30).required("Veuillez entrer le nom  de l'eharticle").matches(/^[A-Za-z é à û]*$/, 'Veuillez entrer un nom valide'),
 prix: yup.number().required('Veuillez entrer le prix'),
 Description:yup.string().min(50).max(200).required('Veuillez entrer la description'),
 
});
 
  const Addarticle= () => {
    const { control, handleSubmit, formState: { errors ,isSubmitSuccessful}, reset} = useForm({
      resolver: yupResolver(schema),
     
     });
   
  const classes = useStyles();
  const [CodeArticle, setCodeArticle]=useState('');
  const [image, setImage]=useState('');
  const [Submitted,setSubmitted]=useState(false);
  const [error,setError]=useState(false);

  const submit  =  (data)=>{
    const formData = new FormData();
formData.append('image',image);

formData.append('CodeArticle',data.code);
formData.append('Designation',data.nom);
formData.append('Prix',data.prix);
formData.append('Description',data.Description);


    axios.post("http://localhost:5000/article/ajouter",(formData))
    .then(res => {
        if(res.status===200){
          reset({ prix:'',nom:'',code:'',Description:''}) 
          setImage('')
         
          setSubmitted(true)
          const timer = setTimeout(() => {
            setSubmitted(null)
          }, 3000);
        }
        else{
          setError(true)
          const timer = setTimeout(() => {
            setError(false)
          }, 3000);
          setSubmitted(false);
        }
    })
    .catch(err =>  {setError(true)
      const timer = setTimeout(() => {
        setError(false)
      }, 3000);
      setSubmitted(null);
 })}
 const inputChangeHandler = e => {
  const value = e.target.value
  setCodeArticle(e.target.value)
  console.log(CodeArticle)
  
}

  return (
  
    <div className='body'>
  
             <h3>Ajouter un article</h3>

     {Submitted? <Alert className='success-pop' severity="success">
              <AlertTitle>Succès</AlertTitle>
                Article bien ajouté
              </Alert>:null}
            {error? <Alert  className='warning-pop' severity="warning">
        <AlertTitle>Alerte</AlertTitle>
        Un article existe déja avec le code article saisie — <strong>Veuillez consulter la liste des articles!</strong>
      </Alert>:null}
      <>
    <form className='formaddarticle' onSubmit={handleSubmit(submit)} encType='multipart/form-data' >
<div className='iputarticle'>
<Controller
            name="code"
            control={control}
           
            render={({ field }) => (
              <TextField       fullWidth
              margin="normal"
              variant="filled"
                id="Code de l'article"
              label="Code de l'article"
              InputProps={{ classes: { input: classes.input1 } }}
              placeholder="Entrer le code de l'article"
              
              defaultValue=""
              {...field}
                error={!!errors.code}
                helperText={errors.code? errors.code?.message : ''}
               
              />
            )}
          />
          <Controller
            name="nom"
            control={control}
           
            render={({ field }) => (
              <TextField     id="codearticle"
              fullWidth
              margin="normal"
              variant="filled"
              defaultValue=""
              label="Nom de l'article"
              InputProps={{ classes: { input: classes.input1 } }}
              placeholder="entrer le nom de l'article"
             
                {...field}
                
    
                error={!!errors.nom}
                helperText={errors.nom ? errors.nom?.message : ''}
               
              />
            )}
          />
          <Controller
            name="prix"
            control={control}
           
            render={({ field }) => (
              <TextField    id="prixarticle"
              label="Prix de l'article"
              variant="filled"
              placeholder="entrer le prix de l'article"
              fullWidth
              margin="normal"
              InputProps={{ classes: { input: classes.input1 } }}
              defaultValue=""
           
                {...field}
                
    
                error={!!errors.prix}
                helperText={errors.prix ? errors.prix?.message : ''}
               
              />
            )}
          />
          <div className='inlineaerticle'>
          <Controller
            name="Description"
            control={control}
           
            render={({ field }) => (
              <TextField   
              label="Description de l'article"
              variant="standard"
              placeholder="entrer la Description de l'article"
            
              multiline
              rows={3}
        
              defaultValue=""
           
                {...field}
                
    
                error={!!errors.Description}
                helperText={errors.Description ? errors.Description?.message : ''}
               
              />
            )}
          />
           
            
              <div> 
 

  {image ?  <label  htmlFor="file" style={{cursor: 'pointer'}} >
      <img   style={{width:'50px',height:'50px'}} src={URL.createObjectURL(image)} alt=""/></label> 
:
       <label  htmlFor="file" style={{cursor: 'pointer'}} ><img src="https://img.icons8.com/office/80/000000/add-image.png"/></label> }           
    
     
      
      <input type="file" id="file"  name="image" accept="image/*" style={{ display: "none" }} onChange={(e)=>setImage(e.target.files[0])} />
            </div>
  </div>
          </div>
          <div className='butart'>
            <div className='bt'>
              <br></br>
<Button   type='submit' variant="contained" endIcon={<SendIcon />}> Envoyer </Button></div>
<div className='bt'>
 <Button   type='reset'     onClick={() => { reset({ prix:'',nom:'',code:'',Description:''}) ; setImage('') } }variant="outlined" startIcon={<DeleteIcon />}> Annuler </Button>  </div>
 </div>
</form>


    </>
    <p>{error}</p>
      <p>{Submitted}</p>
  </div>
   
  );
}
export default  Addarticle;