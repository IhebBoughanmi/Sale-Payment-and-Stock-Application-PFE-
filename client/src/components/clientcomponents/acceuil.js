import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './clientnavbar.css';
import { styled } from '@mui/material/styles';
import axios from 'axios'
import React,{useEffect,useState} from 'react';
import Stack from '@mui/material/Stack';
import { orange } from '@mui/material/colors';
import jwt_decode from 'jwt-decode'

export default function Acceuil() {
  
  const [affiche,setAffiche]=useState([]) 
  const loadarticles=()=>{
    axios.get("http://localhost:5000/article/all")
    .then(res=>{ setAffiche(res.data)
    })
    .catch(err=>{
      console.log("data not found")
    })
  }
  const [verif,setverif]=useState('');
    useEffect(()=>{
     loadarticles();
     var name=localStorage.getItem('token');
    
     var verif=jwt_decode(name).isverified ;
     setverif(verif);
    },[])
  
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  }));
  
  return (<div className='all' >
  <div  className='topacceuil' >
    <div className='alertwidth'>

 
  {verif=='false'?
   <Alert severity="warning">
   <AlertTitle>Warning</AlertTitle>
  Valider votre mail — <strong>vérifier!</strong>
 </Alert>:null}</div>
    <h1 className='acceuiltitle'>Régie Nationale Des Alcools</h1>
    
  </div>
 <br></br> 
 <br></br> 
 <br></br> 
  <h1 className='articletitle'>Les articles disponibles</h1>
  <div className="grid-container">
   {affiche.map(el=>{
      return ( <>
      <div className='cards'>
       <Card sx={{ maxWidth: 345 }}bgcolor="primary.main">
         <br></br>
      <CardMedia
        component="img"
       
        height="140"
        
       image={`/uploads/${el.image}`}
      />
      <CardContent bgcolor="primary.main">
        <Typography gutterBottom variant="h5" component="div">
        {el.Designation}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {el.Description}
        </Typography>
      </CardContent>
      <CardActions>
        
        <Button size="small" style={{marginLeft:'140px'}}>{el.Prix}dt</Button>
      </CardActions>
    </Card></div>
      </>
      )
    })}
   
    </div>
    <br></br> 
    <br></br> 
   
    <div class="footer" >
 
<p><b>Siège: </b> Zone industrielle rades II, 1125 rades saline  Tunis ,Tunisie</p>

<p><b>Tel: </b> +216 79 457 155/<b>Fax:</b>216 79 457 184  </p>
<p>Copyright © 2022 Arab Soft.</p>

 
</div>
    </div>
  );
}



