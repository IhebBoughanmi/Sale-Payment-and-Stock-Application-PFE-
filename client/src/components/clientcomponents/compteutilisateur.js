
import { TextField,} from "@material-ui/core";
import React,{useEffect,useState, useRef} from 'react';
import jwt_decode from 'jwt-decode'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import user from "./profile.png";
import axios from 'axios'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import Majarticlemodal from './majarticlemodal';
import './facture.css'
import { set } from 'react-hook-form';
function User() {
 const verifier=(identifiant)=>{
    console.log(entercodemail)
    console.log(codemail)
    if(parseInt(entercodemail)===parseInt(codemail)){
      setmsgverif(
    
       'email verifier'
        
      )
  
      axios.put(`http://localhost:5000/user/updateverif/${identifiant}`,{isverified:"true"})
      .then(res => {
          if(res.status===200){
          
          console.log('ok')
          }
          else{
           console.log('non')
          }
      })
  
  
  
    }
  else {
    setmsgverif(
  
     'code invalide'
      
    )}}
      
    const [users,setusers]=useState([]) 
  
  const [id,setId]=useState('')
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
   
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [mail,setemail]=useState('');
  const [nom,setnom]=useState('');
  const [prenom,setprenom]=useState('');
  const [codeclient,setCodeclient]=useState("");
  const [verif,setverif]=useState('');
  const [codemail,setcodemail]=useState(0);
  const [entercodemail,setentercodemail]=useState(0);
  const [ msgverif, setmsgverif]=useState("");
  useEffect(()=>{
  

    var name=localStorage.getItem('token');
    var decodedname=jwt_decode(name).identifiant ;
    var mail=jwt_decode(name).mail;
    var prenom =jwt_decode(name).prenom ;
    var nom =jwt_decode(name).nom  ;
    var verif=jwt_decode(name).isverified ;
    var codemail=jwt_decode(name).codemail ;
    setCodeclient(decodedname)
    setemail(mail);
    setnom(nom);
    setprenom(prenom);
    setverif(verif);
    setcodemail(codemail)
    if (verif==='false')
{
  setmsgverif(
  
 
  'veuillez verifier votre mail  pour bien suivre  vos commandes'
  )
}
else {
  setmsgverif(
  
    'email verifier'
  
  )
}
  },[])
  return (
    <>
    <div className={verif=='false'?'verr':"alll"}>
       
      <div className="content">
        
      <div className='alertwidthcompteclient'>
{verif=='false'?
 <Alert severity="info">{msgverif}!</Alert>:null}</div>
 <br></br>
        <Row>
          <Col md="7">
            <Card className="card-user" >

              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img src={user} alt="user" width="100" height="100" />
                    <h5 className="title">{codeclient}</h5>
                  </a>
                  <p className="description">{nom}     {prenom}</p>
                </div>
              
                <p className="description text-center">
                  Adress email : {users} {mail}
                </p>
              </CardBody>
              <CardFooter>
                <hr />
                <div >
                  
     
      { verif==='false'? 
        <TextField
        id="entrer le code de validation"
        label="entrer le code de validation"
        variant="standard"
        placeholder="entrer le code de validation"
        fullWidth
        margin="normal"
        onChange={(e)=>{setentercodemail(e.target.value)}} value={entercodemail}
        type='number'
      />
     
  
      :''}
      { verif==='false'? 
   <br></br>

      :''}
       { verif==='false'? 
        <Button 
        color="primary"
       variant="outlined" onClick={() => verifier(codeclient)}>valider</Button>
    

      :''}
     { verif==='false'? 
   <br></br>

      :''}

             </div>
                  <div className="alignbut">
                  <Button
                  style={{textAlign:'center'}}
                        className="btn-round"
                        color="primary"
                       variant="outlined"
                        onClick={()=>handleOpen()}
                      >
                        Modifier Profil
                      </Button>
                
                 
                </div>
              </CardFooter>
            </Card>
           
          </Col>
        
        </Row>
        <Majarticlemodal open={open} data={id} handleClose={handleClose}/>
        
      </div>
    
 
      </div>
    </>
  );
}

export default User;

  