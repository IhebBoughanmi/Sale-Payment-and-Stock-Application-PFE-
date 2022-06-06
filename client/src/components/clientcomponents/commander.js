import jwt_decode from 'jwt-decode'
import React, { useEffect,useState } from "react";
import './comm.css'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import 'react-datepicker/dist/react-datepicker.css' ;
import DatePicker from 'react-datepicker';

 export  default function Commander(){
  const prevBtns = document.querySelectorAll(".btn-prev");
  const charge = document.getElementById("charger")
  const nextBtns = document.querySelectorAll(".btn-next");
  const nextBtnsarticle = document.querySelectorAll(".btn-nextarticle");
  const progress = document.getElementById("progress");
  const formSteps = document.querySelectorAll(".form-step");
  const progressSteps = document.querySelectorAll(".progress-step");
  let formStepsNum = 0;
  var comm_id =Date.now();
  
  
  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (Vol=='' )
      {setVolerror('veuiller entrer le volume')}
      else {setVolerror('vrai')}
      if(Nbrfut=='')
      {setNbrfuterror('veuiller entrer le nombre de fut')}
      else {setNbrfuterror('vrai')}
     
      if(Lieulivraison=='')
      {setLieulivraisonerror('veuiller entrer le nombre de fut')}
      else {setLieulivraisonerror('vrai')}


  

  if (('#pay option:selected').length > 0) {
    
    if (Modepaiement=== '___choisir le mode de paiement ___'||Modepaiement === '' ) 
    { setModepaiementerror('choisir un mode de paiement');}
  else{
    setModepaiementerror('vrai');}}
    if (('#liv option:selected').length > 0) {
      if (Modelivraison=== '___choisir le mode de livraison ___'||Modelivraison=== '' ) 
      { setModelivraisonerror('choisir un mode de livraison');}
    else{
      setModelivraisonerror('vrai');}}
      
     
     
    
      if (Volerror=='vrai' && Nbrfuterror=='vrai' && Lieulivraisonerror=='vrai' &&  Modelivraisonerror=='vrai' && Modepaiementerror=='vrai'){
      formStepsNum++;
      updateFormSteps();
      updateProgressbar();}
    });}
  );
  nextBtnsarticle.forEach((btn) => {
    btn.addEventListener("click", () => {
      
      if (document.querySelectorAll('input[type="checkbox"]:checked').length > 0 ){
      formStepsNum++;
      updateFormSteps();
      setcheck('vrai')
      updateProgressbar();} else {setcheck('Veuillez choisir au moins un article')}
    });}
  );
  
  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      formStepsNum--;
      updateFormSteps();
      updateProgressbar();
    });
  });

  function updateFormSteps() {
    formSteps.forEach((formStep) => {
      formStep.classList.contains("form-step-active") &&
        formStep.classList.remove("form-step-active");
    });
  
    formSteps[formStepsNum].classList.add("form-step-active");
  }
  
  function updateProgressbar() {
    progressSteps.forEach((progressStep, idx) => {
      if (idx < formStepsNum + 1) {
        progressStep.classList.add("progress-step-active");
      } else {
        progressStep.classList.remove("progress-step-active");
      }
    });
  
    const progressActive = document.querySelectorAll(".progress-step-active");
  
    progress.style.width =
      ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
  }

  const [Numcomm, setNumcomm]=useState();
  const [Modepaiement,setModepaiement]=useState('');
  const [Codeclient,setCodeclient]=useState('');
  const [Modelivraison,setModelivraison]=useState('');
  const [Lieulivraison,setLieulivraison]=useState('');
  const [Nbrfut,setNbrfut]=useState('');
  const [Vol,setVol]=useState('');
  const [Datecomm,setDatecomm]=useState(null);
  const [Infoarticlescommander,setInfoarticlescommander]=useState([]);
  const [PrixHT,setPrixHT]=useState("");

  const [PrixTOT,setPrixTOT]=useState();
  const [Modepaiementerror,setModepaiementerror]=useState('');
  const [Codeclienterror,setCodeclienterror]=useState('');
  const [Modelivraisonerror,setModelivraisonerror]=useState('');
  const [Lieulivraisonerror,setLieulivraisonerror]=useState('');
  const [Nbrfuterror,setNbrfuterror]=useState('');
  const [Volerror,setVolerror]=useState('');
  const [check,setcheck]=useState('');
  const [mail,setemail]=useState('');
  const [nom,setnom]=useState('');
  const [prenom,setprenom]=useState('');
  const [quantite,setquantite]=useState("");
  const [montant,setmontant]=useState(0);
  const [Submitted,setSubmitted]=useState(false);
  const [error,setError]=useState(false);
  const [prixarticle,setprixarticle]=useState();
  const [prixarticles,setprixarticles]=useState();
  const [post,setpost]=useState({})
  const [checked, setChecked] = useState([]);
  
  const reset=()=>{
    setNumcomm("");
    setModepaiement("");
    setCodeclient('');
    setModelivraison('');
    setNbrfut('');
    setVol('');
    setDatecomm('');
    setInfoarticlescommander('');
    setPrixHT('');
 
    setPrixTOT('');
    setPrixHT('');
}

let k ;
  const handleToggle = (value) => () => {
    const currentIndex = checked.findIndex(v=>v.des === value.des);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(newChecked.findIndex(v=>v.des === value.des),1);
    }
    setChecked(newChecked);
  };

   const handleChange=(id,event)=>{
    const newChecked =checked.map(i=>{
      if( id === i.id){
        i[event.target.name]=event.target.value;
      }
      return i
    })    
    setChecked(newChecked);
   }

const montanttotale=()=>{
let i=quantite* prixarticle
setmontant(i)
}

const montantarticles=()=>{
let l=montanttotale()
setprixarticles(l)
}



  const submit=()=>{
    axios.post("http://localhost:5000/commande/ajoutercommande",{mail,nom,prenom,Numcomm,Codeclient,Modepaiement,Modelivraison,Lieulivraison,Nbrfut,Vol,Datecomm,Infoarticlescommander:checked,PrixHT:sum,PrixTOT:sum+(sum*20/100)+(sum*5/100)+0.600})
    .then(res => {
        if(res.status===200){
          reset();
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
          setSubmitted("")
        }
    })
    .catch(err =>  {setError(true)
      const timer = setTimeout(() => {
        setError(false)
      }, 3000);
      setSubmitted("")
 })
}
var sum=0;

const [affiche1,setAffiche1]=useState([]) 
const [affiche2,setAffiche2]=useState([]) 
const [affiche3,setAffiche3]=useState([]) 
const [affiche4,setAffiche4]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/article/all")
    .then(res=>{ setAffiche1(res.data);
      
    })
    .catch(err=>{
      console.log("data not found")
    }) 

    axios.get("http://localhost:5000/user/tt")
    .then(res=>{ setAffiche2(res.data)
    })
    .catch(err=>{
      console.log("data not found")
    })

    axios.get("http://localhost:5000/modedepaiement/allModepaiement")
    .then(res=>{ setAffiche3(res.data);
    })
    .catch(err=>{
      console.log("data not found")
    })  

    axios.get("http://localhost:5000/modedelivraison/all")
    .then(res=>{ setAffiche4(res.data);
    })
    .catch(err=>{
      console.log("data not found")
    })  

    var name=localStorage.getItem('token');
    var decodedname=jwt_decode(name).identifiant ;
    var mail=jwt_decode(name).mail;
    var prenom =jwt_decode(name).prenom ;
    var nom =jwt_decode(name).nom  ;
    setCodeclient(decodedname)
    setemail(mail);
    setnom(nom);
    setprenom(prenom)
  },[])

  const [open, setOpen] = React.useState(false);
  const handleOpen = (el) => {
    setOpen(true);
   
  };
  const handleClose = () => {
    setOpen(false);
  };
   return(
   <div>
     {Submitted? <Alert className='success-pop' severity="success">
    <AlertTitle>Succès</AlertTitle>
     Commande enregistrée
    </Alert>:null}
  
 <form className="form">
 <h1 class="text-center">Commander</h1>
 
 <div class="progressbar">
   <div class="progress" id="progress"></div>
  
   <div
     class="progress-step progress-step-active"
     data-title="informations générales"
   ></div>
   <div class="progress-step" data-title="informations articles"></div>
   <div class="progress-step" data-title="articles details"></div>
   <div class="progress-step" data-title="montant details"></div>
 </div>
 
 <div class="form-step form-step-active">
 <div className="gridcommander">
 
     <div class="input-group">
     <label for="position">Identifiant</label>
     <input value={Codeclient} disabled ></input>
     </div>

   <div class="input-group">
     <label for="Modepaiement">Mode paiement</label>

     <select  name="pay" id="pay"  onChange={(e)=>setModepaiement(e.target.value)} value={Modepaiement} >
    <option selected > -- Choisir le mode de paiement-- </option>
    {affiche3.map((el)=>{
                  return (
                    <>
                    <option>
                     {el.Modedepaiement}
                    </option>
                    </>
                  )
                })}
</select> 
<p style={{color:'red'}}> {Modepaiementerror!='vrai'?Modepaiementerror:''}</p>
   </div>

   <div class="input-group">
     <label for="Modepaiement">Mode de livraison</label>

     <select  name="liv" id="liv"  onChange={(e)=>setModelivraison(e.target.value)} value={Modelivraison} >
    <option selected > -- Choisir le mode de livraison -- </option>
    {affiche4.map((el)=>{
                  return (
                    <>
                    <option>
                     {el.Modedelivraison}
                    </option>
                    </>
                  )
                })}
</select> 
<p style={{color:'red'}}> {Modelivraisonerror!='vrai'?Modelivraisonerror:''}</p>
   </div>
   <div class="input-group">
     <label for="position">Lieu de livraison</label>
     <input onChange={(e)=>setLieulivraison(e.target.value)} value={Lieulivraison}></input>
     <p style={{color:'red'}}> {Lieulivraisonerror!='vrai'?Lieulivraisonerror:''}</p>
     </div>

     <div class="input-group">
     <label for="position">Nombre de fut</label>
     <input onChange={(e)=>setNbrfut(e.target.value)} value={Nbrfut}></input>
     <p style={{color:'red'}}> {Nbrfuterror!='vrai'?Nbrfuterror:''}</p>
     </div>

     <div class="input-group">
     <label for="position">Volume en Litre</label>
     <input onChange={(e)=>setVol(e.target.value)} value={Vol}></input>
     <p style={{color:'red'}}>{Volerror!='vrai'?Volerror:''}</p>
     </div>

   <div class="input-group">
     <label for="position">Date commande</label>
    <DatePicker 
    selected={new Date()} 
    dateFormat='dd/MM/yyyy'
    minDate={new Date()}
    maxDate={new Date()}
  
    onChange={(e)=>setDatecomm(e)} 
    value={new Date()} 
    />   
    </div>
    </div>
   <div class="">
   <a href="#" class="btnn btn-next  ml-auto" onClick={(e)=>e.preventDefault()}>Suivant</a>
   </div>
 </div>
 
 <div class="form-step">
 <p style={{color:'red'}}>{check!='vrai'?check:''} </p>
 <form action="/" method="POST">
        <table class="table table-commander">
        <thead className="text-primary">
                <tr>
                    <th>Code Article</th>
                    <th>Désignation</th>
                    <th>Prix(Par Litre)</th>
                    <th>Quantite disponible</th>
                    <th>Quantite demander</th>
                    
                </tr>
            </thead>
            <tbody>
              
                {affiche1.map((el,i)=>{
                  return (
                    <tr key={i}>
                  <td className="first-td-checkbox-commander">
                  <input type = "checkbox"  style={{  zoom: 1.8}} onClick={handleToggle({id:el._id,des:el.Designation,cd:el.CodeArticle,quan:el.quantite,pr:el.Prix})}
                  id="article"
                    edge="end"
                    class="article"/>
                  <label for="article">{el.Designation}</label>
                  </td>
                  <td>{el.CodeArticle}</td>
                  <td>{el.Prix}</td>
                  <td>{el.Quantite}</td>
                  <td><input value={checked.quan} onChange={event=>handleChange(el._id,event)} name="quan" /></td>
                  </tr>
                  )
                })}
   </tbody>
   
        </table>
    </form>
   <div class="btns-group">
     <a href="#" class="btnn btn-prev">Précident</a>
     <a href="#" class="btnn btn-nextarticle ml-auto"   onClick={(e)=>{montanttotale();e.preventDefault();}} >Suivant</a>
   </div>
 </div>


 {/* étape 3 */}
 <div class="form-step">
 <form action="/" method="POST">
        <table class="table">
        <thead className="text-primary">
    <tr>
        <th>Désignation</th>
        <th>Code Article</th>
        <th>Quantite demander</th>
        <th>Prix (Par Litre)</th>
        <th>Prix quantité demander</th>
    </tr>
            </thead>
            <tbody>
            {checked.map(el=>{
      return ( <><tr>
        <td>{el.cd}</td>
        <td>{el.des}</td>
        <td>{el.quan}L</td>
        <td>{el.pr}DT</td>
        <td>{el.pr*el.quan}DT</td>
      </tr>
      </>
      )
    })}   
   </tbody>
  </table>
    </form> 
   <div class="btns-group">
     <a href="#" class="btnn btn-prev">Previous</a>
     <a href="#" class="btnn btn-next ml-auto" >Suivant</a>
   </div>
 </div>

 
 <div class="form-step">
 <div className="gridcommander">
 <div class="input-group">
     <label for="username">TOT HT</label>
     {checked.map(el=>{
       {sum+=el.pr*el.quan} })}  
     <input type="text" name="lieulivraison" id="lieulivraison" onChange={(e)=>setPrixHT(e.target.value)} value={sum} disabled/>
   </div>
   <div class="input-group">
     <label for="username">TOT TVA</label>
     <input type="text" name="lieulivraison" id="lieulivraison" value={sum*20/100} disabled/>
   </div>
 
   <div class="input-group">
     <label for="username">TOT TAXE</label>
     <input type="text" name="lieulivraison" id="lieulivraison" value={sum*5/100} disabled/>
   </div>
   <div class="input-group">
     <label for="username">TOT TTC</label>
     <input type="text" name="lieulivraison" id="lieulivraison" value={sum+(sum*20/100)+(sum*5/100)} disabled/>
   </div>
   <div class="input-group">
     <label for="username">Timbre</label>
     <input type="text" name="lieulivraison" id="lieulivraison" value={0.600} disabled/>
   </div>
   <div class="input-group">
     <label for="username">Totale en Dinar Tunisian</label>
     <input type="text" name="lieulivraison" id="lieulivraison"  value={sum+(sum*20/100)+(sum*5/100)+0.600} disabled/>
   </div>
   </div>
   <div class="btns-group">
     <a href="#" class="btnn btn-prev">Précident</a>
   
     <input value="Envoyer" type="submit" class="btn ml-auto " onClick={()=>submit()}  style={{background:'rgb(11, 78, 179)',color:'white',width:'150px'}}/> 


   </div>
 </div>
</form>

      <p>{error}</p>
      <p>{Submitted}</p>
      <div class="footer">
<p><b>Siège: </b> Zone industrielle rades II, 1125 rades saline  Tunis ,Tunisie</p>
<p><b>Tel: </b> +216 79 457 155/<b>Fax:</b>216 79 457 184  </p>
<p>Copyright © 2022 Arab Soft.</p>
</div>
 
</div>
)

}