import axios from 'axios'
import React,{useEffect,useState, useRef} from 'react';
import './article.css'
import Majarticlemodal from './majarticlemodal';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import Dialog from "./dialog";
  const Article=()=> { 
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
      handleDialog("voulez vous vraiment supprimer cet article", true, id,);
      idProductRef.current = id;
   
    }

;
    const areUSureDelete = (choose) => {
      if (choose) {
        axios.delete(`http://localhost:5000/article/delete/${idProductRef.current}`)
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
   
const loadarticles=()=>{
  axios.get("http://localhost:5000/article/all")
  .then(res=>{ setAffiche(res.data)
  })
  .catch(err=>{
    console.log("data not found")
  })
}

  useEffect(()=>{
   loadarticles()
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
    
    <form   >

    <Card >
              <CardHeader>
                <CardTitle tag="h4">Liste des articles</CardTitle>
              </CardHeader>
            
    <CardBody>
                <Table responsive>
                <thead className="text-primary">
                <tr>
                    <th>Code Article</th>
                    <th>Désignation</th>
                    <th>Prix (dt)</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
            {affiche.map(el=>{
      return ( <><tr>
       
        <td>{el.CodeArticle}</td>
        <td>{el.Designation}</td>
        <td>{el.Prix}</td>
        <td> <a class="btn border-shadowmodif update">
            <span  onClick={()=>handleOpen(el)} class="text-gradient"><i class="fas fa-pencil-alt"></i></span> </a></td>
        <td> <a class="btn border-shadowdelete delete" >
            <span class="text-gradient"><i class="fas fa-times"  onClick={()=>handleDelete(el._id)}></i></span> </a></td>
      </tr>
      <Majarticlemodal loadarticles={loadarticles} open={open} data={id} handleClose={handleClose}/>
      
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
 export default Article ;