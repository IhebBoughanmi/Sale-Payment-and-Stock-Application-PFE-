import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import  React ,{useState, useRef,useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import DatePicker from 'react-datepicker';

function CreditCardForm(props) {

  const [number, setnumber]=useState('');
  const [numbererror, setnumbererror]=useState('');
  const [dateerror, setdateerror]=useState('');
  const [name, setname]=useState('');
  const[lastname,setlastname]=useState('');
  const [expiry, setexpiry]=useState('');
  const [cvc, setcvc]=useState('');
  const [cvcerror, setcvcerror]=useState('');
  const [focus, setfocus]=useState('');
  const [email,setemail]=useState('');
  const [Submitted,setSubmitted]=useState(false);
  const [error,setError]=useState(false);
  const [Numcomm,setNumcomm]=useState('');
  const [Codeclient,setCodeclient]=useState('');
  const [Modepaiement,setModepaiement]=useState('');
  const [Modelivraison,setModelivraison]=useState('');
  const [Lieulivraison,setLieulivraison]=useState('');
  const [Nbrfut,setNbrfut]=useState('');
  const [Vol,setVol]=useState('');
  const [Datecomm,setDatecomm]=useState('');
  const[Infoarticlescommander,setInfoarticlescommander]=useState('');
  const[PrixTOT,setPrixTOT]=useState('');
  const[Datevalidationcomm,setDatevalidationcomm]=useState('');
  const[Datepaiement,setDatepaiement]=useState('');
  const [id,setid]=useState('');
  const[affichecommandeclientvalider,setaffichecommandeclientvalider]=useState('');
  const [etat,setetat]=useState('');
  const maDate= new Date();
  const [datpay, setdatpay]=useState(maDate.toLocaleDateString("fr"));
  const reset=()=>{
    setnumber('');
    setname('');
    setlastname('');
    setexpiry('');
    setcvc('');
    setfocus('');
    setemail('');
  }
  
  useEffect(()=>{
    setNumcomm(props.data.Numcomm);
    setCodeclient(props.data.Codeclient);
    setModepaiement(props.data.Modepaiement);
    setModelivraison(props.data.Modelivraison);
    setLieulivraison(props.data.Lieulivraison);
    setNbrfut(props.data.Nbrfut);
    setVol(props.data.Vol);
    setDatecomm(props.data.Datecomm);
    setInfoarticlescommander(props.data.Infoarticlescommander);
    setPrixTOT(props.data.PrixTOT);
    setetat(props.data.etat);

    var token=localStorage.getItem('token');
     var decodednom=jwt_decode(token).nom ;
     setname(decodednom)
     var decodedprenom=jwt_decode(token).prenom ;
     setlastname(decodedprenom)
     var decodedemail=jwt_decode(token).mail ;
     setemail(decodedemail)
    
},[props])


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const submit=(id)=>{
    if (number[0]!=4  && number[0]!=5 ||number.length!=16)
    {setnumbererror("verifier votre carte")}
    else{setnumbererror("vrai")}
    if (cvc.length!=3 ||isNaN(cvc))
    {setcvcerror("verifier le code cvc")}
    else{setcvcerror("vrai")}
    if(expiry==='')
    {setdateerror("veuillez entrer la date d'expiration")}
    else{setdateerror("vrai")}
    if(numbererror=="vrai" && dateerror=='vrai'&& cvcerror=='vrai')
    {
    axios.put(`http://localhost:5000/facturation/updateetat/${id}`,{etat:"payee",Datepaiement:datpay,email})
    .then(res => {
        if(res.status===200){
          reset();
          setSubmitted(true)
          props.handleClose()
        }
        else{
          setError(true)
          
          setSubmitted("")
        }
    })
    .catch(err =>  {setError(true)
     
      setSubmitted("")
 })}
}
  
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
        <Box sx={{ ...style, width: 650 }}>
     <h5 id="child-modal-title">Paiement du Commande N° {Numcomm} </h5>
     <div className="card">
      <Cards
      number={number}
      name={name}
      expiry={expiry.toString()}
      cvc={cvc}
      focused={focus}
      />
      <form>
        <input
        type="tel"
        name="number"
        placeholder="Numéro de carte"
        value={number}
        required
        onChange={(e)=>{setnumber(e.target.value)}}
        onFocus={(e)=>{setfocus(e.target.name)}} 
        
        minLength={16}
        maxLength={16} />
          <p style={{color:'red'}}>{numbererror!='vrai'?numbererror:''}</p>

          <input
        type="text"
        name="name"
        placeholder="Nom et prénom"
        value={name+' '+lastname}
        onFocus={(e)=>{setfocus(e.target.name)}} 
        />

        <input
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>{setemail(e.target.value)}} />
  
 <DatePicker 
    selected={expiry} 
    dateFormat='MM/dd '
    name="expiry"
    minDate={new Date()}
    onChange={(e)=>setexpiry(e)}  value={expiry} 
    onFocus={(e)=>{setfocus(e.target.name)}} 
    />   
       <p style={{color:'red'}}>{dateerror!='vrai'?dateerror:''}</p>
       

           <input
        type="tel"
        name="cvc"
        placeholder="CVC"
        value={cvc}
        onChange={(e)=>{setcvc(e.target.value)}}
        onFocus={(e)=>{setfocus(e.target.name)}} 
        maxLength={3}
        minLength={3}
        required
        />
         <p style={{color:'red'}}>{cvcerror!='vrai'?cvcerror:''}</p>
       
      </form>
    </div>
          <Button  onClick={()=>submit(props.data._id)} >Payer {""}{props.data.PrixTOT}{"DT"}</Button>
          <Button onClick={props.handleClose}>Annuler</Button>
        </Box>
      </Modal>
    </React.Fragment>

      </>
  );
}
export default CreditCardForm;