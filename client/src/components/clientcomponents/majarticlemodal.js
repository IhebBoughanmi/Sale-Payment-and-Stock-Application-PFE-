import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './facture.css'
import { TextField,} from "@material-ui/core";
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'
import jwt_decode from 'jwt-decode'

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

function Majarticlemodal(props) {

const onSubmit=(identifiant)=>{
  axios.put(`http://localhost:5000/user/update/${identifiant}`,{Nom:nom})
  .then(res => {
      if(res.status===200){
      
      console.log('done')
      }
      else{
       console.log('not')
      }
  })

  
}
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

  useEffect(()=>{
    var name=localStorage.getItem('token');
    var decodedname=jwt_decode(name).identifiant ;
    var mail=jwt_decode(name).mail;
    var prenom =jwt_decode(name).prenom ;
    var nom =jwt_decode(name).nom  ;
    setCodeclient(decodedname);
    setemail(mail);
    setnom(nom);
    setprenom(prenom);
   
  },[])

    const style = {
        position: 'absolute',
        top: '50%',
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
        <Box sx={{ ...style, width: 1000, height:400 }}>
        <Col md="17">
            <Card className="card-user">
        <CardHeader>
                <CardTitle tag="h5">Modifier votre profile Profile</CardTitle>
              </CardHeader>

              <CardBody>
                <Form>
                  <Row>
                    <Col className="pl-1" md="4">
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Nom</label>
                        <Input
                   
                          placeholder="Nom"
                          type="text"
                          onChange={(e)=>setnom(e.target.value)} 
                          value={nom}    
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Prénom</label>
                        <Input
                        
                          placeholder="Prénom"
                          type="text"
                          onChange={(e)=>setprenom(e.target.value)} 
                          value={prenom}    
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address Email</label>
                        <Input
                               onChange={(e)=>setemail(e.target.value)} 
                               value={mail}    
                          placeholder="Address Email"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Mot de passe</label>
                        <Input
                   
                          placeholder="Mot de passe"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                
                   
                </Form>
              </CardBody>
            </Card>
          </Col>
          <div className="update ml-auto mr-auto">
                     
                   
          <Button
                        className="btn-roundd"
                        color="primary"
                        type="submit"
                        onClick={() => onSubmit(codeclient)}
                      >
                        Modifier Profil
                      </Button>
                      <Button    className="btn-roundd"
                        color="primary" onClick={props.handleClose}>Fermer</Button>
                      </div>

        </Box>
        
      </Modal>
            </React.Fragment>
      
</>
    )
}

export default Majarticlemodal