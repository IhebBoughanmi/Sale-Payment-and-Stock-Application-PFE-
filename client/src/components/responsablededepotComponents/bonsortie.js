import Button from '@mui/material/Button';
import {Table} from "reactstrap";
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect,useState } from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios' ;
import { format } from 'date-fns';
import './bonsortie.css';
export default function Bonsortie() {
  const [Submitted,setSubmitted]=useState(false);
  const [facture,setfacture]=useState('') ;
  const [acquit,setacquit]=useState([]) ;
  const [newacquit,setnewacquit]=useState([]) ;
  const [error,setError]=useState(false);
  const [affichenew,setAffichenew]=useState([]) ;
  const [affiche,setAffiche]=useState([]) ;
  const [datebonsortie,setdatebonsortie]=useState(format(new Date(), 'yyyy/MM/dd kk:mm:ss')) ;
  const update=(id)=>{
    axios.put(`http://localhost:5000/acquit/updatebonsortie/${id}`,{ bonsorite:'oui'})}
  const submit =(Infoarticlescommander,Codeclient, Nbrfut,Vol, Datecomm, Datefac,Numcomm)=>{
  
   console.log(affichenew)
    axios.post("http://localhost:5000/acquit/ajouterbonsortie",{Infoarticlescommander,Codeclient, Nbrfut,Vol, Datecomm, Datefac,Numcomm,facture,datebonsortie})
    .then(res => {
        if(res.status===200){
          setSubmitted(true)
          const timer = setTimeout(() => {
            setSubmitted('')
          }, 3000);
        }
        else{
          setError(true)
          const timer = setTimeout(() => {
            setError(false)
          }, 3000);
          setSubmitted('');
        }
    })
    .catch(err =>  {setError(true)
      const timer = setTimeout(() => {
        setError(false)
      }, 3000);
      setSubmitted('');
 })}
  

  const loadacquis=()=>{
    axios.get(`http://localhost:5000/facturation/allfactures`)
    .then(res=>{ setAffiche(res.data)
      
    })
    .catch(err=>{
      console.log("data not found")
    })
  }
    ;
    useEffect(()=>{
      loadacquis(); allacquit();
   
     },[])
     ;
     const allacquit=()=>{
      axios.get("http://localhost:5000/acquit/allacquit")
      .then(res=>{ setacquit(res.data)
        
      })
      .catch(err=>{
        console.log("data not found")
      })
    };
     const afficheracquis=(id)=>{
      
       const newaffiche= affiche.filter(el=>el._id==id)
       setAffichenew(newaffiche)
       const newacquit= acquit.filter(el=>el.Numfac==id)
       setnewacquit(newacquit)
   

     }
     
  return (
    <>
   
   {Submitted? <Alert className='success-pop' severity="success">
              <AlertTitle>Succès</AlertTitle>
                Bon sortie bien ajouté
              </Alert>:null}
            {error? <Alert  className='warning-pop' severity="warning">
        <AlertTitle>Alerte</AlertTitle>
        Une bon de sortie existe déja
      </Alert>:null}
      <br></br><br></br>
     <div className ="marignaqcuisformdepot">
       <h1 className='acquistitle'>Bon sortie</h1>
      <div className='containermajacquis' >
        <div  className="grid_majacquis">
     
      
        <label for="position"> N° Facture </label>
      
        <select
    
            labelId="demo-simple-select-label"
            id="demo-simple-select"
           
            label="acctype"
            onChange={(e)=>setfacture(e.target.value)} value={facture} 
        >
           <option  selected >--Choisir le code facture --</option>
           {affiche.filter( el=>el.bonsorite==='non' && el.etat==="payee").map(el=>{
      
  return(<>
  
            <option value ={el._id}>{el._id}</option></> )
          })}
           
        </select>
     
       </div>
      
       <div  className="grid_majacquis">
       {affichenew.map(el=>{  return ( <>
        <label for="position"> Code client</label>
     <input  value={el. Codeclient}disabled ></input>
     
      
     
       </>
      )
    })}
        
       </div>
       <div  className="grid_majacquis">
       {affichenew.map(el=>{  return ( <>
        <label for="position"> Date </label>
     <input   
       value={format(new Date(), 'yyyy/MM/dd kk:mm:ss')} disabled  ></input>
     
       </>
      )
    })}
       </div>
       <div  className="grid_majacquis">
         <br></br>  
         <label for="position">  </label>
       <Button variant="contained" endIcon={<SendIcon />}  onClick={()=>{afficheracquis(facture)}} > 
        charger
      </Button></div>
       </div>
       <div >
       </div>
       <br></br>
       <form className='acquiform'>
       <div className='acquiformdetail'>
       <div className='acquiformdetail1'>
       {affichenew.map(el=>{  return ( <>
       <label for="position"> Nom et prénom du Client </label>
     <input      value= {el.nomprenom} disabled></input>
  
     <label for="position">Num commande </label>
     <input         value ={el. Numcomm}disabled></input>     
     <label for="position">Num facture </label>
     <input         value ={el._id}disabled ></input>   
        
     <label for="position">Vol </label>
     <input           value ={el.Vol}disabled ></input> 
   
     </>
      )
    })}
    {newacquit.map(el=>{ return (  <>
     <label for="position">Num acquit </label>
     <input      value={el._id}   disabled ></input>  </>  
     )
  })}
         {affichenew.map(el=>{  return ( <>
          <label for="position">Nom de l'article</label>
 {el.Infoarticlescommander.map(m=>{return(<>   
  <input value={m.des} disabled></input></>)})} </>)})}
 
        </div>
        <div className='acquiformdetail1'>
        {affichenew.map(el=>{  return ( <>
        <label for="position">Code Client </label>
     <input      value= {el.Codeclient} disabled></input>
     <label for="position">Date commande </label>
     <input       value={el.Datecomm} disabled ></input> 
     <label for="position">Date facture </label>
     <input         value={el.Datepaiement} disabled ></input> 
     <label for="position">Fut </label>
     <input         value ={el.Nbrfut}disabled ></input>   
      </>

      )
    })}
     {newacquit.map(el=>{ return (
     <>
      
     <label for="position">Véhicule </label>
     <input   value={el.moyentransport}  disabled ></input> 
  
     </>
    )
  })}
  
  {affichenew.map(el=>{  return ( <>
          <label for="position">Quantité demandée</label>
 {el.Infoarticlescommander.map(m=>{return(<>   
  <input value={m.quan} disabled></input></>)})} </>)})}
       
        </div>
        </div>
       
           
     
      
        <div className='clearfix'>
             
      <br></br>
      <br></br> <br></br>
      {affichenew.map(el=>{  return ( <>
             <Button variant="contained" endIcon={<SendIcon />}    onMouseMove={()=>update(facture)} onClick={()=>submit(el.Infoarticlescommander,el.Codeclient,el.Nbrfut,el.Vol,el.Datecomm,el.Datepaiement,el. Numcomm,el._id)}>
             Enregistrer
           </Button>  </>
    )
  })}
  
           </div>
       
       </form>
       <p>{error}</p>
      <p>{Submitted}</p></div>
    </>)}