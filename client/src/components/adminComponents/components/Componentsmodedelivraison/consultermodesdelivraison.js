import axios from 'axios'
import React,{useEffect,useState, useRef} from 'react';
import './ech.css'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import './article.css'
import Dialog from "./dialog";
import Majmodedelivrasionmodal from './majmodedelivraisonmodal'

  const Modedelivraison=()=> { 
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
      handleDialog("voulez-vous vraiment supprimer ce mode de livraison?", true, );
      idProductRef.current = id;
   
    }
  
  ;
    const areUSureDelete = (choose) => {
      if (choose) {
        axios.delete(`http://localhost:5000/modedelivraison/deleteModedelivraison/${idProductRef.current}`)
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
const loadmodesdelivraison=()=>{
  axios.get("http://localhost:5000/modedelivraison/all")
  .then(res=>{ setAffiche(res.data)
  })
  .catch(err=>{
    console.log("data not found")
  })
}
  useEffect(()=>{
   loadmodesdelivraison()
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
<main id="site-main">
<div class="containerarticle">
    
    <form action="/" method="POST">
    <Card>
              <CardHeader>
                <CardTitle tag="h4">Modes de livraison</CardTitle>
              </CardHeader>
            
    <CardBody>
                <Table responsive>
                <thead className="text-primary">
                <tr>
                    <th>Code Mode de livraison</th>
                    <th>Mode de livraison</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
            {affiche.map(el=>{
      return ( <><tr>
       
        <td>{el.Codemodedelivraison}</td>
        <td>{el.Modedelivraison}</td>
        <td><a class="btn border-shadowmodif update">
            <span  onClick={()=>handleOpen(el)} class="text-gradient"><i class="fas fa-pencil-alt"></i></span> </a></td>
        <td> <a class="btn border-shadowdelete delete" >
            <span class="text-gradient"><i class="fas fa-times" onClick={()=>handleDelete(el._id)}></i></span> </a></td>
      
      </tr>
      <Majmodedelivrasionmodal loadmodesdelivraison={loadmodesdelivraison} open={open} data={id} handleClose={handleClose}/>

      </>
      )
    })}
                  {dialog.isLoading && (
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
    </form>
</div>
</main>)}
 export default Modedelivraison ;