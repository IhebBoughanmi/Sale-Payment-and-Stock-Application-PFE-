import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField,} from "@material-ui/core";
import axios from 'axios'

function Majmodedepaiementmodal(props) {
    const [Modedepaiement, setModedepaiement]=useState('');
    const [Codemodedepaiement,setCodemodedepaiement]=useState('')
    const [Submitted,setSubmitted]=useState(false);
    const [error,setError]=useState(false);
    const reset=()=>{
        setModedepaiement("");
        setCodemodedepaiement("");
  }

  useEffect(()=>{
      setModedepaiement(props.data.Modedepaiement)
      setCodemodedepaiement(props.data.Codemodedepaiement)
  },[props])

    const submit=(e)=>{
        axios.put(`http://localhost:5000/modedepaiement/updateall/${props.data._id}`,{Modedepaiement,Codemodedepaiement})
        .then(res => {
            if(res.status===200){
              reset();
              setSubmitted(true)
              props.loadarticles()
              props.handleClose()
            }
            else{
              setError(true)
              setSubmitted("")
            }
        })
        .catch(err =>  {
          setError(true)
          setSubmitted("")
     })
    }
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
        <Box sx={{ ...style, width: 550, height:350 }}>
          <h2 id="child-modal-title">Mise à jour mode de paiement</h2>
          <p id="child-modal-description">
            Vous pouvez mettre ce mode de paiement à jour
          </p>

          <TextField
            id="nomarticle"
            label="Code mode de paiement"
            variant="standard"
            placeholder="entrer le nom du mode de paiement"
            fullWidth
            margin="normal"
            value={Codemodedepaiement}
            disabled
            />

           <TextField
            id="Modedepaiement"
            label="Mode de paiement"
            variant="standard"
            placeholder="entrer le mode de paiement"
            fullWidth
            margin="normal"
            onChange={(e)=>setModedepaiement(e.target.value)} 
            value={Modedepaiement}
            />

        <Button onClick={submit}>Envoyer</Button>
        <Button onClick={props.handleClose}>Fermer</Button>
        </Box>
      </Modal>
            </React.Fragment>
      
</>
    )
}

export default Majmodedepaiementmodal
