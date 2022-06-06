import axios from 'axios'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import './Consultercomptes.css'
import Majcomptesmodal from './majcomptesmodal';
import React,{useEffect,useState, useRef} from 'react';
import Dialog from "./dialog";

  const Comptes=()=> { 
    const idProductRef = useRef();
    const [dialog, setDialog] = useState({
      message: "",
      isLoading: false,
      //Update
      nameProduct: ""
    });
    const handleDialog = (message, isLoading, nameProduct) => {
      setDialog({
        message,
        isLoading,
        //Update
        nameProduct
      });
    };
    const handleDelete=(id)=>{
      handleDialog("voulez-vous vraiment supprimer le compte:", true, id,);
      idProductRef.current = id;
   
    }

;
    const areUSureDelete = (choose) => {
      if (choose) {
        axios.delete(`http://localhost:5000/user/delete/${idProductRef.current}`)
        .then(res=>{if(res.status===200){
        const newaffiche= affiche.filter(el=>el._id!==idProductRef.current)
        setAffiche(newaffiche)
        }})
         .catch(err=>{console.log("not great")
       })
        handleDialog("", false);
      } else {
        handleDialog("", false);
      }
    };
    const [id,setId]=useState('')


   const [affiche,setAffiche]=useState([]) 

   const loadclients=()=>{
    axios.get("http://localhost:5000/user/tt")
    .then(res=>{ setAffiche(res.data)
    })
    .catch(err=>{
      console.log("data not found")
    })
  }
    useEffect(()=>{
     loadclients()
    },[])
  
    const [open, setOpen] = React.useState(false);
    const handleOpen = (el) => {
      setOpen(true);
      setId(el)
    };
    const handleClose = () => {
      setOpen(false);
    };
    
  
      return (
<  main id="site-main" className='site-main'>
<div class="containerrs">
    
    <form action="/" method="POST" className='tablecompte'>
    <div class="cadre-table-scrollregler">
    <Card>
              <CardHeader>
                <CardTitle tag="h4">Liste des comptes utilisateurs</CardTitle>
              </CardHeader>
            
    <CardBody>
                <Table responsive>
                <thead className="text-primary">
                <tr>
                    <th>Identifiant</th>
                    <th>Nom et Prénom</th>
                    <th>Email</th>
                    <th>Type utilsateur</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
            {affiche.map(el=>{
      return ( <><tr>
        <td>{el.identifiant}</td>
        <td>{el.nom}{' '}{el.prenom}</td>
        <td>{el.mail}</td>
        <td>{el.acctype}</td>
        <td> <a class="btn border-shadowupdate update">
            <span  onClick={()=>handleOpen(el)} class="text-gradient"><i class="fas fa-pencil-alt"></i></span> </a></td>
        <td> <a class="btn border-shadowdelete delete" >
            <span class="text-gradient"><i class="fas fa-times"  onClick={()=>handleDelete(el._id)}></i></span> </a></td>
      </tr>
      <Majcomptesmodal loadclients={loadclients} open={open} data={id} handleClose={handleClose}/>
       
        </>
      )
    })}     {dialog.isLoading && (
      <Dialog
        //Update
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
</div>
</main>)
}
 export default Comptes ;