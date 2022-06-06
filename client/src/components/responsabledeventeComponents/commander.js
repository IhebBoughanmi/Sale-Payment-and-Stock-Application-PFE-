import React, { useEffect,useState } from "react";
import './comm.css'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Checkbox from '@mui/material/Checkbox';
import 'react-datepicker/dist/react-datepicker.css' ;
import DatePicker from 'react-datepicker';
import Button from '@mui/material/Button';

 export  default function Commander(props){
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

  if (Codeclient === '___choisir le code client___'||Codeclient === '' ) 
  { setCodeclienterror('choisir un client');}
else{
  setCodeclienterror('vrai');}

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
      
      if (Codeclient!='___choisir le code client___' && Codeclient!='' && click!='clicked')
      {setcharger('veuillez charger les données du client')}
     
      else {setcharger('vrai')}
      if (Volerror=='vrai' && Nbrfuterror=='vrai' && Lieulivraisonerror=='vrai' && Codeclienterror=='vrai' && Modelivraisonerror=='vrai' && Modepaiementerror=='vrai'&& charger=='vrai'){
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
  
  const [codesplit,setcodesplit]=useState('');
  const [nomsplit,setnomsplit]=useState('');
  const [Numcomm, setNumcomm]=useState();
  const [Modepaiement,setModepaiement]=useState('');
  const [Codeclient,setCodeclient]=useState('');
  const [Modelivraison,setModelivraison]=useState('');
  const [Lieulivraison,setLieulivraison]=useState('');
  const [Nbrfut,setNbrfut]=useState('');
  const [Vol,setVol]=useState('');
  const [Modepaiementerror,setModepaiementerror]=useState('');
  const [Codeclienterror,setCodeclienterror]=useState('');
  const [Modelivraisonerror,setModelivraisonerror]=useState('');
  const [Lieulivraisonerror,setLieulivraisonerror]=useState('');
  const [Nbrfuterror,setNbrfuterror]=useState('');
  const [Volerror,setVolerror]=useState('');
  const [check,setcheck]=useState('');
  const [charger,setcharger]=useState('');
  const [click,setclick]=useState('');
  const [Datecomm,setDatecomm]=useState(new Date());
  const [Infoarticlescommander,setInfoarticlescommander]=useState([]);
  const [PrixHT,setPrixHT]=useState("");
  const [Remise,setRemise]=useState(0);
  const [PrixTOT,setPrixTOT]=useState();
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
    setRemise('');
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



  const submit=(mail,nom,prenom)=>{
  
    axios.post("http://localhost:5000/commande/ajoutercommande",{mail,nom,prenom,Numcomm,Codeclient,Modepaiement,Modelivraison,Lieulivraison,Nbrfut,Vol,Datecomm,Infoarticlescommander:checked,PrixHT:sum,Remise,PrixTOT:sum+(sum*20/100)+(sum*5/100)+0.600-(Remise)})
    .then(res => {
        if(res.status===200){
          checked.map(el =>{
            let quan=-el.quan;
            axios.put(`http://localhost:5000/article/updatequantite/${el.id}`,{Quantite:quan})
            .then(res=>{
              if(res.status===200){
                console.log("article updated");
              }
            })
            .catch(err=>console.error(err))
          })
          reset();
          setSubmitted(true)
          const timer = setTimeout(() => {
            setSubmitted(false)
            props.handleCallback("Saisit acquit à caution");
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
const [affiche4,setAffiche4]=useState([]) 


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
  
  },[])


  const [open, setOpen] = React.useState(false);
  const handleOpen = (el) => {
    setOpen(true);
   
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [affichenew,setAffichenew]=useState([]) ;
  const afficheracquis=(id)=>{
     
    const newaffiche= affiche2.filter(el=>el.identifiant==id)
    setAffichenew(newaffiche)


  }
   return(
   <div>
     {Submitted? <Alert className='success-pop' severity="success">
    <AlertTitle>Succès</AlertTitle>
      Commande enregistrée
    </Alert>:null}
  <br></br>
  <br></br> <br></br>
  <form class="formadminvente">
 <h1 className="text-center">Commander</h1>
 
 <div class="progressbar">
   <div class="progress" id="progress"></div>
   
   <div
     class="progress-step progress-step-active"
     data-title="Informations générales"
   ></div>
   <div class="progress-step" data-title="Informations des articles"></div>
   <div class="progress-step" data-title="Articles details"></div>
   <div class="progress-step" data-title="Montant details"></div>
 </div>
 
 <div class="form-step form-step-active">
 <div className="gridcommander">

     <div class="input-group">
 <label for="modelivraison">Code client</label>

 <select  name="code" id="code" onChange={(e)=>setCodeclient(e.target.value)} value={Codeclient} style={{height:'50px' , width:'299px'}}>
<option >___choisir le code client___</option>
    {affiche2.map((el)=>{
                  return (
                    <>
                    <option>
                      {el.identifiant}
                    </option>
                    </>
                  )
                })}
  
</select> 
<p style={{color:'red'}}>{Codeclienterror!='vrai'?Codeclienterror:''} </p>
</div>
<div class="input-group">

     <input  type="button"
       value="charger"  id='charger'  onClick={()=>{{afficheracquis(Codeclient); setclick("clicked") }}}  className="butt"  style={{height:'50px', marginTop:"30px"}}/>
      <p style={{color:'red'}}> {charger!='vrai'?charger:''}</p>
</div>
{affichenew.map(el=>{  return ( <>
       
  <div class="input-group">
  <label for="Modepaiement">Nom</label>
     <input   id='nom'  value={el.nom} disabled></input> </div>
     <div class="input-group">
     <label for="Modepaiement">Prénom</label>
     <input    value= {el.prenom} disabled></input> </div>
     <div class="input-group">
     <label for="Modepaiement">email</label>
     <input     value={el.mail} disabled></input> </div>
     
 
     
     
   
       </>
      )
    })}
   <div class="input-group">
     <label for="Modepaiement">Mode de paiement</label>

     <select  name="pay" id="pay"  onChange={(e)=>setModepaiement(e.target.value)} value={Modepaiement} style={{height:'50px' , width:'299px'}} >
      <option>___choisir le mode de paiement ___</option>
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

     <select  name="liv" id="liv"  onChange={(e)=>setModelivraison(e.target.value)} value={Modelivraison} style={{height:'50px' , width:'299px'}}>
     <option>___choisir le mode de livraison ___</option>
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
     <input onChange={(e)=>setLieulivraison(e.target.value)} value={Lieulivraison} type="text"></input>
     <p style={{color:'red'}}> {Lieulivraisonerror!='vrai'?Lieulivraisonerror:''}</p>
     </div>

     <div class="input-group">
     <label for="position">Nombre de fut</label>
     <input onChange={(e)=>setNbrfut(e.target.value)} value={Nbrfut} type="number"></input>
     <p style={{color:'red'}}> {Nbrfuterror!='vrai'?Nbrfuterror:''}</p>
     </div>

     <div class="input-group">
     <label for="position">Volume en Litre</label>
     <input onChange={(e)=>setVol(e.target.value)} value={Vol} type="number"></input>
     <p style={{color:'red'}}>{Volerror!='vrai'?Volerror:''}</p>
     </div>

   <div class="input-group">
     <label for="position">Date commande</label>
    <DatePicker 
    selected={Datecomm} 
    dateFormat='yyyy/MM/dd kk:mm:ss'
    minDate={new Date()}
    maxDate={new Date()}

    onChange={(e)=>setDatecomm(e)} 
    value={Datecomm} 
    />   
    </div>
    </div>
   <div class="">
 
       
     <a href="#" class="btnn btn-next  ml-auto" onClick={(e)=>e.preventDefault()}>Suivant</a>
   
   </div>
 </div>
 
 <div class="form-step">
 <p style={{color:'red'}}>{check!='vrai'?check:''} </p>
 <form>
        <table class="table table-commander">
             <thead className="text-primary">
                <tr>
                <th>Code article</th>
                    <th>Désignation</th>
                    <th>Prix(Par litre)</th>
                    <th>Quantité disponible</th>
                    <th>Quantité demandée</th>
                    
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
     <a href="#" class="btnn btn-prev">Précédent</a>
     <a href="#" class="btnn btn-nextarticle ml-auto"   onClick={(e)=>{montanttotale();e.preventDefault();}} >Suivant</a>
   </div>
 </div>


 {/* étape 3 */}
 <div class="form-step">
 <form>
        <table class="table">
        <thead className="text-primary">
               
    <tr>
        
        <th>Code article</th>
        <th>Désignation</th>
        <th>Quantité demandée</th>
        <th>Prix (Par Litre)</th>
        <th>Prix quantité  demandée</th>
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
     <a href="#" class="btnn btn-prev">Précédent</a>
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
     <label for="username">Remise</label>
     <input type="text" name="lieulivraison" id="lieulivraison"  onChange={(e)=>setRemise(e.target.value)} value={Remise} />
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
     <input type="text" name="lieulivraison" id="lieulivraison"  value={sum+(sum*20/100)+(sum*5/100)+0.600-(Remise)} disabled/>
   </div>
   </div>
   <div class="btns-group">
     <a href="#" class="btnn btn-prev">Précédent</a>
     {/* <a href="#" class="btnn btn-submit" onClick={()=>submit()} >Envoyer</a> */}
     {affichenew.map(el=>{  return ( <>
       
      
    
     <input value="Envoyer" class="btn ml-auto " onClick={(e)=>{submit(el.mail,el.nom,el.prenom)}}  style={{background:'rgb(11, 78, 179)',color:'white',width:'150px'}}/> </>
                    )
                  })}


   </div>
 </div>
</form>
      <p>{error}</p>
      <p>{Submitted}</p>
 
</div>
)

}