import './majacquis.css';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';
import React, { useEffect,useState } from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import SendIcon from '@mui/icons-material/Send';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
const useStyles = makeStyles((theme) => ({
  formControl: {
  
    minWidth: 120,
  },
}));
export default function Acqui() {
  const [moyentransport,setmoyentransport]=useState('') ;
  const [datesortie,setdatesortie]=useState(new Date()) ;
  const [masleknakel,setmasleknakel]=useState('') ;
  const [datefin,setdatefin]=useState(datesortie) ;
  const [dateacquit,setdateacquit]=useState(format(new Date(), 'yyyy/MM/dd kk:mm:ss')) ;
  const [devise,setdevise]=useState('') ;
  const [nomprenom,setnomprenom]=useState('') ;
  const [lieu,setlieu]=useState('') ;
    const [Nbrfut,setNbrfut]=useState('') ;
    const [Vol,setVol]=useState('') ;
  const classes = useStyles();
  const [facture,setfacture]=useState('') ;
  const [affichenew,setAffichenew]=useState([]) ;
  const [affiche,setAffiche]=useState([]) ;
  const [affichedate,setAffichedate]=useState([]) 
  const [Submitted,setSubmitted]=useState(false);
  const [error,setError]=useState(false);
  const update=(id)=>{
    
    axios.put(`http://localhost:5000/acquit/updateacquit/${id}`,{acquit:'oui'})}
   

   
  const submit =(  Infoarticlescommander,Codeclient,Lieulivraison,email,Nbrfut,Vol,Modepaiement)=>{
  
   console.log(affichenew)
    axios.post("http://localhost:5000/acquit/ajouteracquit",{ Infoarticlescommander,Codeclient,Lieulivraison,email,Nbrfut,Vol,Modepaiement,moyentransport,datesortie,masleknakel,datefin,dateacquit,facture})
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
    const quan=0;
    const afficheracquis=(id)=>{
     
      const newaffiche= affiche.filter(el=>el._id==id)
      setAffichenew(newaffiche)
     
  
    }
    
 
    
    useEffect(()=>{
      loadacquis(); 
     },[])
  return (
    <> 
    <body >
  
      {Submitted? <Alert className='success-pop' severity="success">
              <AlertTitle>Succès</AlertTitle>
                Acquit à caution bien ajouté
              </Alert>:null}
            {error? <Alert  className='warning-pop' severity="warning">
        <AlertTitle>Alerte</AlertTitle>
        Un acquit existe déja 
      </Alert>:null}
      <br></br>  <br></br>
      <div className ="marignaqcuisformvente" >
       <h1 className='acquistitle'>Acquit à caution</h1>
      <div className='containermajacquis' >
        <div  className="grid_majacquis">
     
      
        <label for="position"> N° Facture </label>
      
        <select
    
            labelId="demo-simple-select-label"
            id="demo-simple-select"
           
            label="acctype"
            onChange={(e)=>setfacture(e.target.value)} value={facture} 
        >
           <option  selected >--choisir le code facture --</option>
          
           {affiche.filter( el=>el.acquit==="non").map(el=>{
         
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
     <input   onChange={(e)=>setdateacquit(e.target.value)}
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
         
         <table className='tableacquis'>
         <tr>
  <th>نوع البضاعة</th>
  <th >ارقام وعدد الاوعية</th>
  <th  > الحجم باللتر
  </th>
  <th >درجة الكحول</th>

 
</tr>

{affichenew.map(el=>{  return ( <>
 <td>{el.Infoarticlescommander.map(m=>{return(<>
     <TextField variant="standard"  id="demo-helper-text-misaligned-no-helper"
  value={m.des}
  fullWidth  disabled/> 
 
   
 </>)})} </td> 

 </>)
    })}
    
     
{affichenew.map(el=>{  return ( <>
<td> <TextField variant="standard" id="demo-helper-text-misaligned-no-helper"
 onChange={(e)=>setNbrfut(e.target.value)}  value={el.Nbrfut} fullWidth disabled /></td>
  <td >  <TextField variant="standard" id="demo-helper-text-misaligned-no-helper"
  onChange={(e)=>setVol(e.target.value)}
   value={el.Vol} fullWidth  disabled/></td>
 
  <td> <TextField variant="standard" id="demo-helper-text-misaligned-no-helper" value="96.99" fullWidth disabled /></td>
  </>
      )
    })}
         </table>
       </div>
       <form className='acquiform'>
       <div className='acquiformdetail'>
            
        <div className='acquiformdetail1'>
        {affichenew.map(el=>{  return ( <>
          <label for="position">تاريخ و ساعة خروج البضاعة</label>
    <DatePicker 
    selected={datesortie} 
    dateFormat='yyyy/MM/dd kk:mm:ss'
    minDate={new Date()}
    
   
    onChange={(e)=>{setdatesortie(e); setdatefin(e)}} value={datesortie}
    />   
      
      <label for="position"> تاريخ وصول البضاعة </label>
    <DatePicker 
    selected={datefin} 
    dateFormat='yyyy/MM/dd '
    minDate={datesortie}
    
    
    onChange={(e)=>setdatefin(e)} value={datefin}
    />   
       <label for="position">وسيلة النقل و رقم ترسيمها </label>
     <input  onChange={(e)=>setmoyentransport(e.target.value)} value={moyentransport} required></input>
     <label for="position">مسلك نقل البضاعة </label>
     <input   onChange={(e)=>setmasleknakel(e.target.value)} value={masleknakel} required></input>
       
        
         <br></br>
      </>
      )
    })}
       </div>
        <div className='acquiformdetail1'>
        {affichenew.map(el=>{  return ( <>
          <label for="position">الكمية</label>
     <input   type="text" disabled></input>
     <label for="position">الاسم و اللقب</label>
     <input       onChange={(e)=>setnomprenom(e.target.value)} value= {el.nomprenom} disabled></input>
     
      
     <label for="position">العنوان</label>
     <input   onChange={(e)=>setlieu(e.target.value)}  value={el.Lieulivraison } disabled></input>
     
          
     <label for="position">المعرف الجبائي</label>
     <input    onChange={(e)=>setdevise(e.target.value)} value= {el.Codeclient} disabled></input>
     
     
   
       </>
      )
    })}
        </div>   
       
        </div>
        <div className='clearfix'>
        {affichenew.map(el=>{  return ( <>
        <Button  onMouseMove={()=>update(facture)} onClick={()=>submit(el.Infoarticlescommander,el.Codeclient,el.Lieulivraison,el.email,el.Nbrfut,el.Vol,el.Modepaiement
    
   )} variant="contained" endIcon={<SendIcon />}>
        enregistrer
      </Button>
      </>
      )
    })}
    
        </div>
        <div className='clearfix'>
     

    
        </div>
        
       </form>
      
       <p>{error}</p>
      <p>{Submitted}</p>
      
     
  </div>
</body>
    </>
  );
}