  import PropTypes from 'prop-types';
  import Tabs from '@mui/material/Tabs';
  import Tab from '@mui/material/Tab';
  import Typography from '@mui/material/Typography';
  import Box from '@mui/material/Box';
  import React,{useEffect,useState, useRef} from 'react';
  import Dialog from "./dialog";

  import axios from 'axios'
  import jwt_decode from 'jwt-decode'

  import { toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import CreditCardForm from './paiement/CreditCardForm';
  import Button from '@mui/material/Button';
import './clientnavbar.css'
  import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";
  toast.configure();

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
   
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  
  export default function Fac() {
    const [affiche,setAffiche]=useState([]) 
    const idProductRef = useRef();
    const [dataarr,setDataarr]=useState();
      
    const [dialog, setDialog] = useState({
      message: "",
      isLoading: false,
      nameProduct: ""
    });
    const handleDialog = (message, isLoading, nameProduct) => {
      setDialog({
        message,
        isLoading,
        nameProduct  }); };
    const handleDelete=(id)=>{
      handleDialog("Voulez-vous vraiment annuler la commande numéro", true, id,);
      idProductRef.current = id; };
const areUSureDelete = (choose) => {
  if (choose) {
    axios.delete(`http://localhost:5000/facturation/delete/${idProductRef.current}`)
    .then(res=>{if(res.status===200){
    const newaffiche= affichecommandeclient.filter(el=>el._id!==idProductRef.current)
    setAffichecommandeclient(newaffiche)
    }})
     .catch(err=>{console.log("not great")
   })
    handleDialog("", false);
  } else {
    handleDialog("", false);
  }
};
  
    const [value, setValue] = React.useState(0);
    const [iduser, setiduser] = React.useState('');
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const [affichecommandeclient,setAffichecommandeclient]=useState([]) 
    const loadcommande=()=>{
      axios.get("http://localhost:5000/commande/all")
      .then(res=>{ setAffichecommandeclient(res.data)
        
      })
      .catch(err=>{
        console.log("data not found")
      })
    };
     
  const [affichefactures,setaffichefactures]=useState([]) 
 
  const loadfactures=()=>{
    axios.get(`http://localhost:5000/cmdpayer/allfacturespayer`)
    .then(res=>{ setaffichefactures(res.data)
   
    })
    .catch(err=>{
      console.log("data not found")
    })
  }
    ;
    const [affichecommandeclientvalider,setAffichecommandeclientvalider]=useState([]) 
    const toutcommandesvalider=[];
    const loadcommandevalider=()=>{
      axios.get(`http://localhost:5000/facturation/allfactures`)
      .then(res=>{ setAffichecommandeclientvalider(res.data)
       
      
       
        
      })
      .catch(err=>{
        console.log("data not found")
      })
    }
      ;
      useEffect(()=>{
       loadcommande();loadcommandevalider(); loadfactures();
       var token=localStorage.getItem('token');
      ;
       var decodedidentifiant=jwt_decode(token).identifiant ;
       setiduser(decodedidentifiant)

      },[]);
      const [paiement,setpaiement]=useState("");

      
      const [open, setOpen] = React.useState(false);
      const handleOpen = (el) => {
        setOpen(true);
        setpaiement(el);
      };
      const handleClose = () => {
        setOpen(false);
      };
    return (
      <>
      <br></br>
      <br></br>
      <div className='bodysuivre'>
      <div><h1> <center>Mes factures</center></h1></div>
      <br></br>
      <br></br>
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 300 , }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' , width:300 }}
        >
          <Tab label="Commandes en cours" {...a11yProps(0)} sx={{ marginBottom:4, fontSize:17  }}  />
          <Tab label="Commandes validées" {...a11yProps(1)}  sx={{ marginBottom:4, fontSize:17 }}/>
          <Tab label="Factures payées" {...a11yProps(2)} sx={{  fontSize:17 }} />
        
        </Tabs>
        <TabPanel value={value} index={0} >
  

        <form action="/" method="POST"  >
        <div class="cadre-table-scroll">
        <Card>
              <CardHeader>
                <CardTitle tag="h4">Commandes encours</CardTitle>
              </CardHeader>
            
    <CardBody>
                <Table responsive>
                <thead className="text-primary">
                <tr>
                <th scope="col"   style={{ width: 500, }}>Numéro commande</th >
                <th scope="col"   style={{ width: 450, }}>Mode de livraison</th >
                <th scope="col"   style={{ width: 450, }}>Mode de paiement</th >
                <th scope="col"  style={{ width: 200, }}>Prix totale (Dt)</th>
                <th scope="col"  style={{ width: 100, }}>Annuler</th>
                 </tr>
                </thead>
            <tbody>
            {affichecommandeclient.filter(el=>el.Codeclient===iduser ).map(el=>{
      return ( <><tr>
         <td   scope="row">{el._id}</td>
         <td   scope="row">{el.Modelivraison}</td>
         <td   scope="row">{el.Modepaiement}</td>
         <td  scope="row">{el.PrixTOT}</td>
         <td> <a class="btndelete border-shadowrefuse " >
            <span ><i   onClick={()=>handleDelete(el._id)}  class="fas fa-times" >  </i></span> </a></td>
            </tr>
      </>
      )
    })}
       {dialog.isLoading && (
        <Dialog
          nameProduct={dialog.nameProduct}
          onDialog={areUSureDelete}
          message={dialog.message}
        />
      )}        
   </tbody> 
   </Table>
              </CardBody>
              </Card>
        </div>
    </form>
        </TabPanel>
        <TabPanel value={value} index={1} style={{ height: 20, }}>
        <div class="cadre-table-scroll">
        <Card>
              <CardHeader>
                <CardTitle tag="h4">commandes validées</CardTitle>
              </CardHeader>
            
    <CardBody>
                <Table responsive>
                <thead className="text-primary">
                <tr>
                
                <th scope="col"   style={{ width: 500,  }}>Numéro commande</th >
                <th scope="col"   style={{ width: 500,  }}>Mode de livraison</th >
                <th scope="col"   style={{ width: 500,  }}>Date de la validation de commande</th >
                <th scope="col"   style={{ width: 500,  }}>Date de l'enregistrement de la commande</th >
                    <th scope="col"  style={{ width: 100,  }}>Prix</th>
                    <th scope="col"  style={{ width: 100,  }}>Payée</th>

                </tr>
                </thead>
                <tbody>
          
          {affichecommandeclientvalider.filter(el=>el.Codeclient===iduser && el.Modepaiement==="enligne" && el.etat==="valide"&& el.acquit==='oui' ).map(el=>{
    return ( 
    <>
    <tr>
     
       <td scope="row">{el._id}</td>
       <td scope="row">{el. Modelivraison}</td>
       <td scope="row">{el.Datevalidationcomm}</td>
       <td scope="row">{el.Datecomm}</td>
       <td scope="row">{el. PrixTOT}</td>
       <td><Button variant="contained" onClick={()=>handleOpen(el)} >Payer</Button></td>
    </tr> 
    <CreditCardForm data={paiement} open={open} handleClose={handleClose} />

    </>
    )
  })}
         
 </tbody>
 </Table>
              </CardBody>
              </Card>
      </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <div class="cadre-table-scroll">
      <Card>
              <CardHeader>
                <CardTitle tag="h4">Factures payées</CardTitle>
              </CardHeader>
            
    <CardBody>
                <Table responsive>
                <thead className="text-primary">
            <tr>
             
              <th scope="col"   style={{ width: 500,  }}>Numéro de commande</th >
              <th scope="col"   style={{ width: 500,  }}>Mode de livraison</th >
              <th scope="col"   style={{ width: 500,  }}>Date de validation</th >
              <th scope="col"   style={{ width: 500,  }}>Date de commande</th >
              <th scope="col"  style={{ width: 100,  }}>Prix TOT</th>
            </tr>
      </thead>

          <tbody>
        
          {affichefactures.filter(el=>el.Codeclient===iduser ).map(el=>{
    return ( 
    <>
    <tr>
     
       <td scope="row">{el._id}</td>
       <td scope="row">{el. Modelivraison}</td>
       <td scope="row">{el.Datevalidationcomm}</td>
       <td scope="row">{el.Datecomm}</td>
       <td scope="row">{el. PrixTOT}</td>
    </tr> 

    </>
    )
  })}
         
 </tbody>
 
 </Table>
              </CardBody>
              </Card>
      </div>        </TabPanel>
      
   
    </Box>
 <br></br>
 <br></br>
 <br></br>


   <div class="footer" >

<p><b>Siège: </b> Zone industrielle rades II, 1125 rades saline  Tunis ,Tunisie</p>

<p><b>Tel: </b> +216 79 457 155/<b>Fax:</b>216 79 457 184  </p>
<p>Copyright © 2022 Arab Soft.</p>

 
</div>
<div></div></div>
    </>
  );
}
