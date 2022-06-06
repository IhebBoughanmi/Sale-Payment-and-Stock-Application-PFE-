import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField,} from "@material-ui/core";import axios from 'axios'
function Majarticlemodal(props) {

    const [CodeArticle, setCodeArticle]=useState('');
    const [Designation,setDesignation]=useState('')
    const [Prix,setPrix]=useState('')
    const [image,setImage]=useState('')
    const [Description,setDescription]=useState('')
    const [Submitted,setSubmitted]=useState(false);
    const [error,setError]=useState(false);
    const reset=()=>{
      setCodeArticle("");
      setDesignation("");
      setDescription("");
      setPrix("");}
  useEffect(()=>{
      setCodeArticle(props.data.CodeArticle)
      setDesignation(props.data.Designation)
      setDescription(props.data.Description)
      setPrix(props.data.Prix)
      setImage(`/uploads/${props.data.image}`)
  },[props])

  const onSubmit=(data)=>{
    data.preventDefault();  const formData = new FormData();

    formData.append('CodeArticle',CodeArticle);
    formData.append('Designation',Designation);
    formData.append('Prix',Prix);
    formData.append('Description',Description);
    
        axios.put(`http://localhost:5000/article/update/${props.data._id}`,(formData))
        .then(res => {
            if(res.status===200){
              reset();
              setSubmitted(true)
              props.loadarticles()
              props.handleClose()
            }
            else{
              setError(true)
              console.log('fma mochkl')
              setSubmitted("")
            }
        })
        .catch(err =>  {setError(true)
         
          setSubmitted("")
     })
    }
    const style = {
        position: 'absolute',
        top: '55%',
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
<React.Fragment>
        <Modal
        hideBackdrop
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 550, height:500 }}>
          <h2 id="child-modal-title">Mise à jour article</h2>
          <p id="child-modal-description">
            Vous pouvez mettre cette article à jour
          </p>
          <form   onSubmit={onSubmit} encType='multipart/form-data'  >
          <TextField
            id="codearticle"
            label="code de l'article"
            variant="standard"
            placeholder="entrer le code de l'article"
            fullWidth
            margin="normal"
            onChange={(e)=>setCodeArticle(e.target.value)} 
            value={CodeArticle} disabled
            />
             <TextField
            id="nomarticle"
            label="nom de l'article"
            variant="standard"
            placeholder="entrer le nom de l'article"
            fullWidth
            margin="normal"
            onChange={(e)=>setDesignation(e.target.value)} 
            value={Designation} 
            />
             <TextField
            id="Prix"
            label="Prix de l'article"
            variant="standard"
            placeholder="entrer le prix de l'article"
            fullWidth
            margin="normal"
            onChange={(e)=>setPrix(e.target.value)} 
            value={Prix} 
            />
          <div style ={{display:'flex', justifyContent:'space-between'}}>
          <TextField
            id="Description"
            label="Description de l'article"
            variant="standard"
            multiline
            rows={3}
            fullWidth
            margin="normal"
            onChange={(e)=>setDescription(e.target.value)} 
            value={Description} 
            />
        
   
   
    <div> 
  <label for="img">  <img    style={{width:'50px',height:'50px'}} src={image}/></label>
  <input type="file" id="file" name="image" accept="image/*"  onChange={(e)=>setImage(e.target.files[0])}  style={{display:"none" }}/>


            </div>
</div>  <Button  type='submit'>Envoyer</Button>
        <Button onClick={props.handleClose}>Fermer</Button></form>
        
        </Box>
      </Modal>
            </React.Fragment>
      
</>
    )
}

export default Majarticlemodal