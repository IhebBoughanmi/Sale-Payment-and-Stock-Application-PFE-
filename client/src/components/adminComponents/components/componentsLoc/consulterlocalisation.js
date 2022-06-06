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
    
    <form >
    <Card>
              <CardHeader>
                <CardTitle tag="h4">Échantillonnage des articles</CardTitle>
              </CardHeader>
            
    <CardBody>
                <Table responsive>
                <thead className="text-primary">
                <tr>
                    <th>Code Article</th>
                    <th>Désignation</th>
                    <th>VC</th>
                    <th>D. d'enfencement</th>
                    <th>Température</th>
                    <th>TAV</th>
                    <th>Densité</th>
                    <th>Coef</th>
                    <th>Dernière mise à jour</th>
                </tr>
            </thead>
            <tbody>
            {affiche.map(el=>{
      return ( <><tr>
       
        <td>{el.CodeArticle}</td>
        <td>{el.Designation}</td>
        <td>{el.VC}</td>
        <td>{el.DegreEnfencement}</td>
        <td>{el.Temperature}</td>
        <td>{el.TAV}</td>
        <td>{el.Densite}</td>
        <td>{el.Coef}</td>
        <td>{el.Date}</td>
      </tr>
      
      </>
      )
    })}
              {dialog.isLoading && (
        <Dialog
          //Update
          nameProduct={dialog.nameProduct}
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