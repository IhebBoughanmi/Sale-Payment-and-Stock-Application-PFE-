import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useTheme } from '@mui/material/styles';
import Maincardtwo  from '../responsabledeventeComponents/dashboard/Default/cards/maincardtwo';
import MainCard from '../responsabledeventeComponents/dashboard/Default/cards/MainCard';
import { styled } from '@mui/material/styles';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Avatar, Box, Button } from '@mui/material';
  import React,{useEffect,useState, useRef} from 'react';
  import { Grid, MenuItem, TextField, Typography, List, ListItem, ListItemAvatar, ListItemText,  } from '@mui/material';
  import'./acceuil.css'
  import axios from 'axios'
  import Plot from 'react-plotly.js'
  import {
    AreaChart,
   Area, LineChart,
   Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";
 
const CardWrapper = styled(Maincardtwo)(({ theme }) => ({ 
  backgroundColor: theme.palette.primary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&>div': {
      position: 'relative',
      zIndex: 5
  },
  '&:after': {
      content: '""',
      position: 'absolute',
      width: 210,
      height: 210,
      background: theme.palette.primary[800],
      borderRadius: '50%',
      zIndex: 1,
      top: -85,
      right: -95,
      [theme.breakpoints.down('sm')]: {
          top: -105,
          right: -140
      }
  },
  '&:before': {
      content: '""',
      position: 'absolute',
      zIndex: 1,
      width: 210,
      height: 210,
      background: theme.palette.primary[800],
      borderRadius: '50%',
      top: -125,
      right: -15,
      opacity: 0.5,
      [theme.breakpoints.down('sm')]: {
          top: -155,
          right: -70
      }
  }
}));
function Home( a) {
    const [revenumois,setrevenumois]=useState([])
    const theme = useTheme();
    const [cmdencours,setcmdencours]=useState([]) 
    const [reglement,setreglement]=useState([]) 
    const [prixannee,setprixannee]=useState([]) 
    const [meuilleurclients,setmeuilleurclients]=useState([]) 
    const [acquit,setacquit]=useState([]) 
    const [livraison,setlivraison]=useState([]) 
  const [usersnbr,setusersnbr]=useState([]) 
  const [timeValuebar, setTimeValuebar] = useState(false);
  const handleChangeTimebar = (event, newValue) => {
      setTimeValuebar(newValue); 
  };
  async function getusersnbr() {
    axios.get("http://localhost:5000/facturation/allusersnombres").then(function(response) {
      setusersnbr(response.data)
  
    })}
  async function getusers() {
    axios.get("http://localhost:5000/facturation/allusers").then(function(response) {
      setusers(response.data)
  
    })}
    const [users,setusers]=useState([]) 
    useEffect(()=>{
     getusers() ;getusersnbr();
     axios.get("http://localhost:5000/vente/prixannee").then(function(response) {
        setmeuilleurclients(response.data)
    })
    axios.get("http://localhost:5000/reglement/revenumois").then(function(response) {
        setrevenumois(response.data)
    });
    axios.get("http://localhost:5000/reglement/prixannee").then(function(response) {
      setprixannee(response.data)
  });
  axios.get("http://localhost:5000/vente/commandevalidesansavecacquit").then(function(response) {
    setacquit(response.data)
});
axios.get("http://localhost:5000/vente/commandesencours").then(function(response) {
    setcmdencours(response.data)
});
axios.get("http://localhost:5000/reglement/nonregleradmin").then(function(response) {
    setreglement(response.data)
})
axios.get("http://localhost:5000/depot/livraison").then(function(response) {
    setlivraison(response.data)
})
     },[])
    
  return (
    <>
     <br></br>
              <h1 className='regtitle'>Tableau de bord</h1>
              <br></br> 
      <div className="content">
       
        <div className='gridadminacceuil'>
          <Plot
               data={[{
                   values:usersnbr.map((data) => data.count),
                   labels:usersnbr.map((data) => data._id),
                   type: 'pie' ,
                   hole: .4,
                   marker: { colors: [theme.palette.secondary.main, '#1565c0',theme.palette.secondary.light,theme.palette.primary.light,theme.palette.primary.main,theme.palette.primary.dark,], },
               }]}
               layout={{width: 340,height: 170,title: "Nombre d'utilisateurs par type",
               paper_bgcolor:'rgba(255, 255, 255, .0)',  
               margin:{l: 0, r: 0, b: 0, t:30, pad: 0},}}
              config={{displayModeBar: false}}
              />
               <Plot
                data={[{
                    values:meuilleurclients.map((data) => data.count),
                    labels:meuilleurclients.map((data) => data._id),
                    type: 'pie' ,
                    marker: { colors: [theme.palette.secondary.main, '#1565c0',theme.palette.secondary.light,theme.palette.primary.light] },
                    hole: .4,
                }]}
                layout={{width: 340,height: 170,title: 'Les 5 plus actifs clients durant cette année',
                paper_bgcolor:'rgba(255, 255, 255, .0)',  
                margin:{ l: 0, r: 0, b: 0, t:30, pad: 0 }, }}
               config={{displayModeBar: false}}
               />
             <div  className='cardcmdencours'>
              <CardWrapper border={false} content={false} sx={{
                                           
                                           backgroundColor: theme.palette.primary.dark,
                                         
                                       }}>
                   <Box sx={{ p: 0.25 }}>
                       <List sx={{ py: 0 }}>
                           <ListItem alignItems="center" disableGutters sx={{ py:2}}>
                               <ListItemAvatar>
                                   <Avatar
                                       variant="rounded"
                                       sx={{
                                           ...theme.typography.commonAvatar,
                                           ...theme.typography.largeAvatar,
                                           backgroundColor: theme.palette.primary.light,
                                           color: theme.palette.primary.dark
                                       }}
                                   >
                                       <RestartAltIcon fontSize="inherit" />
                                   </Avatar>
                               </ListItemAvatar>
                               <ListItemText
                                   sx={{
                                       py: 0,
                                       mt: 0.1,
                                       mb: 0.1
                                   }}
                                   primary={
                                       <Typography
                                           variant="subtitle1"
                                           sx={{
                                               color:'#FFFFFF',
                                               
                                           }}
                                       >
                                         Les commandes en cours
                                       </Typography>
                                   }
                                   secondary={ cmdencours.map(el=> <><Typography variant="h4" sx={{
                                       color: theme.palette.grey[500],
                                       mt: 0.5
                                   }}>{el.myCount}</Typography></>)}
                                  
                               />
                           </ListItem>
                       </List>
                   </Box>
               </CardWrapper></div> 
               </div>
               <div className='gridntwo'>
                <MainCard >
                    <Grid container >
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="h5">Revenu:</Typography>
                                        </Grid>
                                        
                                    </Grid>
                                </Grid>
                                <Grid item>
                                        <Button
                                            disableElevation
                                            variant={timeValuebar ? 'contained' : 'text'}
                                            size="small"
                                            sx={{ color: 'inherit' }}
                                            onClick={(e) => handleChangeTimebar(e, true)}
                                        >
                                        par mois
                                        </Button>
                                        <Button
                                            disableElevation
                                            variant={!timeValuebar ? 'contained' : 'text'}
                                            size="small"
                                            sx={{ color: 'inherit' }}
                                            onClick={(e) => handleChangeTimebar(e, false)}
                                        >
                                          par année
                                        </Button>
                                    </Grid>
                            </Grid>
                        </Grid>
                        
                        {timeValuebar ?        
                    
                        <Grid item xs={8}>
              <LineChart
          width={700}
          height={260}
          data={revenumois}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
            
          }}
        
        >

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend  />
          <Line
           
            dataKey="count"
            name="Revenu par mois"
            stroke={theme.palette.primary.dark} 
            fill={theme.palette.primary.dark} 
            strokeWidth="5"
            dot={{fill:"rgb(21, 101, 192)",stroke:"rgb(21, 101, 192)",strokeWidth: 1,r:1}} activeDot={{fill:'#1565c0',stroke:"#8884d8",strokeWidth: 5,r:7}}
          
           
          />
         
        </LineChart>
        </Grid>
                   :
                       < Grid item xs={12}>
                          <Grid item xs={12}>
                          <LineChart
          width={700}
          height={260}
          data={prixannee}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
            
          }}
        
        >

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend  />
          <Line
           
            dataKey="count"
            name="Revenu par année"
            stroke={theme.palette.primary.dark} 
            fill={theme.palette.primary.dark} 
            strokeWidth="5"
            dot={{fill:"rgb(21, 101, 192)",stroke:"rgb(21, 101, 192)",strokeWidth: 1,r:1}} activeDot={{fill:'#1565c0',stroke:"#8884d8",strokeWidth: 5,r:7}}
          
           
          />
         
        </LineChart>
                        
                        </Grid>
                        </Grid>
                        }
                    </Grid>
                </ MainCard >
               
               
              

<div  className='cardcmdencours'>
<CardWrapper border={false} content={false} sx={{
                                           
                                           backgroundColor: theme.palette.primary.main,
                                         
                                       }}>
                   <Box sx={{ p: 0.25 }}>
                       <List sx={{ py: 0 }}>
                           <ListItem alignItems="center" disableGutters sx={{ py:2}}>
                               <ListItemAvatar>
                                   <Avatar
                                       variant="rounded"
                                       sx={{
                                           ...theme.typography.commonAvatar,
                                           ...theme.typography.largeAvatar,
                                           backgroundColor: theme.palette.primary.light,
                                           color: theme.palette.primary.dark
                                       }}
                                   >
                                       <AttachMoneyIcon  fontSize="inherit" />
                                   </Avatar>
                               </ListItemAvatar>
                               <ListItemText
                                   sx={{
                                       py: 0,
                                       mt: 0.1,
                                       mb: 0.1
                                   }}
                                   primary={
                                       <Typography
                                           variant="subtitle1"
                                           sx={{
                                               color:'#FFFFFF',
                                               
                                           }}
                                       >
                                        Les factures impayées
                                       </Typography>
                                   }
                                   secondary={ reglement.map(el=> <><Typography variant="h4" sx={{
                                       color: theme.palette.grey[500],
                                       mt: 0.5
                                   }}>{el.myCount}</Typography></>)}
                                  
                               />
                           </ListItem>
                       </List>
                   </Box>
               </CardWrapper></div></div>
             
               <div  className='livadmin'>
<CardWrapper border={false} content={false} sx={{
                                           
                                           backgroundColor: theme.palette.primary.light,
                                         
                                       }}>
                   <Box sx={{ p: 0.25 }}>
                       <List sx={{ py: 0 }}>
                           <ListItem alignItems="center" disableGutters sx={{ py:2}}>
                               <ListItemAvatar>
                                   <Avatar
                                       variant="rounded"
                                       sx={{
                                           ...theme.typography.commonAvatar,
                                           ...theme.typography.largeAvatar,
                                           backgroundColor: theme.palette.primary.main,
                                           color: theme.palette.primary.light
                                       }}
                                   >
                                       <LocalShippingOutlinedIcon  fontSize="inherit" />
                                   </Avatar>
                               </ListItemAvatar>
                               <ListItemText
                                   sx={{
                                       py: 0,
                                       mt: 0.1,
                                       mb: 0.1
                                   }}
                                   primary={
                                       <Typography
                                           variant="subtitle1"
                                           sx={{
                                               color:'#FFFFFF',
                                               
                                           }}
                                       >
                                        Les factures non livrées
                                       </Typography>
                                   }
                                   secondary={ livraison.map(el=> <><Typography variant="h4" sx={{
                                       color: theme.palette.grey[500],
                                       mt: 0.5
                                   }}>{el.myCount}</Typography></>)}
                                  
                               />
                           </ListItem>
                       </List>
                   </Box>
               </CardWrapper></div>
           </div>
                
               

    </>
  );
}

export default Home;
