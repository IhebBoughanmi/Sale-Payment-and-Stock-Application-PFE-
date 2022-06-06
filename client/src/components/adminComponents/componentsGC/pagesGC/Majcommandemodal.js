import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField,} from "@material-ui/core";

function Majcommandemodal(props) {
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
  const [Remise,setRemise]=useState(0);
  const [PrixTOT,setPrixTOT]=useState();
  const [error,setError]=useState(false);

    const reset=()=>{
      setInfoarticlescommander(null);
   
  }

  useEffect(()=>{
      setInfoarticlescommander(props.data)
  },[props])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 8,
        pt: 2,
        px: 4,
        pb: 3,
      };
  if(Infoarticlescommander===null || Infoarticlescommander===undefined){
    return null;
  }
  else{
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
              <Box sx={{ ...style, width: 1000, height:400 }}>
                <h2 id="child-modal-title">Consulter commande</h2>
              
                <table class="table">
                <thead className="text-primary">
                      <tr>
                          <th>Code Article</th>
                          <th>Désignation</th>
                          <th>Quantite Demander</th>
                          <th>Quantite Disponible</th>
                      </tr>
                  </thead>
                  <tbody>
                      {Infoarticlescommander.map((el,i)=>{
                        return(
                          <tr key={i}>
                            <td>{el.des}</td>
                            <td>{el.cd}</td>
                            <td>{el.quan}</td>
                            <td>{el.quan1}</td>
                          </tr>
                        )
                      })}
                  </tbody>
         
         </table>
                
              <Button onClick={props.handleClose}>Fermer</Button>
              </Box>
            </Modal>
                  </React.Fragment>
            
      </>
          )
  }
}

export default Majcommandemodal;