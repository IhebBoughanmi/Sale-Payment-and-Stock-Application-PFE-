import Plot from 'react-plotly.js'
import {Bar, BarChart,} from "recharts";
import { Avatar, Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MainCard from '../responsabledeventeComponents/dashboard/Default/cards/MainCard';
import Maincardtwo  from '../responsabledeventeComponents/dashboard/Default/cards/maincardtwo';
import { styled } from '@mui/material/styles';

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
  import React,{useEffect,useState, useRef} from 'react';
  import { Grid, MenuItem, TextField, Typography, List, ListItem, ListItemAvatar, ListItemText,  } from '@mui/material';
import './depot.css'
  import axios from 'axios'
// react plugin used to create charts
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
      width: 100,
      height: 100,
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
function Home() {
  const [revenumois,setrevenumois]=useState([])
  const theme = useTheme();
  const [prixannee,setprixannee]=useState([]) 
  const [nonregler,setnonregler]=useState([]) 
  const [facturemode,setfacturemode]=useState([])
    useEffect(()=>{
         
            axios.get("http://localhost:5000/depot/articleallyear").then(function(response) {
                setrevenumois(response.data)
            });
            axios.get("http://localhost:5000/depot/articleannee").then(function(response) {
              setprixannee(response.data)
          });
          axios.get("http://localhost:5000/depot/bonsortielivrer").then(function(response) {
            setnonregler(response.data)
        });
        axios.get("http://localhost:5000/depot/livreranne").then(function(response) {
          setfacturemode(response.data)
      })
       
         
            },[])
  
  return (
    <div className='tbreg'>
      
               <br></br>
              <h1 className='regtitle'>Tableau de bord</h1>
              <br></br>
              <div className='reglfirst'>
                <div  className='carddepot'>
              <CardWrapper border={false} content={false}     sx={{
                                           
                                           backgroundColor: theme.palette.primary.main
                                         
                                       }}>
                    <Box sx={{ p: 0.25 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette.primary.main,
                                            color: theme.palette.secondary.main,
                                        }}
                                    >
                                        <LocalShippingOutlinedIcon fontSize="inherit" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                color:'white',
                                                
                                            }}
                                        >
                                          Nombre des factures livrées durant cette année
                                        </Typography>
                                    }
                                    secondary={facturemode.map((data) =>    <><Typography variant="h4" sx={{
                                        color: 'white',
                                        mt: 0.5
                                    }}>{data.count}</Typography></>)}
                                   
                                />
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
        </div>
               
     
          
               <Plot
               
              data={[{
                  values:nonregler.map((data) => data. myCount),
                  labels:nonregler.map((data) => data._id ),
                  type: 'pie' ,
                  hole: .4,
                  marker: { colors: [theme.palette.secondary.main, '#1565c0',theme.palette.secondary.light,theme.palette.primary.light] },
                  
              }]}
             
              layout={{width: 550,height: 210,title: 'Factures sans bon sortie (NON) / avec bon sortie et non livrées (OUI) ',
              
              paper_bgcolor:'rgba(255, 255, 255, .0)',  
            
           
              margin:{
                 l: 0,
                 r: 0,
                 b: 0,
                 t:30,
                 pad: 0
             },
             }}
             config={{displayModeBar: false}}
             />
            
            
            <MainCard>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Quantité commandée de chaque article durant cette année:</Typography>
                                        </Grid>
                                       
                                    </Grid>
                                </Grid>
                               
                            </Grid>
                        </Grid>
                         <Grid item xs={12}>
                        <BarChart width={530} height={180} data={prixannee}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="_id" />
  <YAxis />
  <Tooltip />
  <Legend />

  <Bar dataKey="count" fill={theme.palette.secondary.main}  name ="Quantité commandée d'article"/>
  
  <Bar dataKey="counts" fill={theme.palette.primary.main}  name ="Nombre de fois commandé"/>
 

</BarChart>
                        </Grid>
                    </Grid>
                </MainCard>
               
    
                <MainCard >
                    <Grid container >
                        <Grid item xs={8}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Entrée totale du stock par année (En Litre):</Typography>
                                        </Grid>
                                      
                                    </Grid>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
              <LineChart
          width={500}
          height={180}
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
            stroke={theme.palette.secondary.main} 
            fill={theme.palette.secondary.main} 
            strokeWidth="5"
            dot={{fill:"rgb(21, 101, 192)",stroke:"rgb(21, 101, 192)",strokeWidth: 1,r:1}} activeDot={{fill:'#1565c0',stroke:"#8884d8",strokeWidth: 5,r:7}}
          
           
          />
         
        </LineChart>
        </Grid>
                    </Grid>
                </MainCard>
                </div>
              
                <br></br>
               
                <div>
                               
         
                </div>
    </div>
  );
}

export default Home;
