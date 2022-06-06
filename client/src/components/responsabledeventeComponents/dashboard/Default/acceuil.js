import PropTypes from 'prop-types';
import TotalIncomeCard from './cards/Skeleton/TotalIncomeCard';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemText,  } from '@mui/material';
import SkeletonTotalGrowthBarChart from './cards/Skeleton/TotalGrowthBarChart';
import Maincardtwo from './cards/maincardtwo';
import MainCard from './cards/MainCard';
import { gridSpacing } from './store/constant';
import React,{useEffect,useState} from 'react';
import './acceuil.css'
import axios from 'axios'
import { styled } from '@mui/material/styles';
import { Avatar, Box, Button } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {Bar, BarChart,LineChart, Line,XAxis,YAxis, CartesianGrid,Tooltip,Legend,} from "recharts";
import Plot from 'react-plotly.js'
const CardWrapper = styled( Maincardtwo)(({ theme }) => ({ 
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


const Home = ({ isLoading }) => {
    const data = [
        {name: 'Geeksforgeeks', students: 400},
        {name: 'Technical scripter', students: 700},
        {name: 'Geek-i-knack', students: 200},
        {name: 'Geek-o-mania', students: 1000}
      ];
    const [value, setValue] = useState('today');
    const theme = useTheme();
    const [users,setusers]=useState([]) 
    const [lastm,setlastm]=useState([]) 
    const [months,setmonths]=useState([]) 
    const [yeargraph,setyeargraph]=useState([]) 
    const [qttarticle,setqttarticle]=useState([]) 
    const [maxm,setmaxm]=useState([]) 
    const [cmdencours,setcmdencours]=useState([]) 
    const [cmdvalidesansa,setcmdvalidesansa]=useState([])  
    const [cmdvalideraveca,setcmdvalideraveca]=useState([]) 
    const [articlelastm,setarticlelastm]=useState([]) 
    const [prixannee,setprixannee]=useState([]) 

    async function getyearall() {
        axios.get("http://localhost:5000/vente/nbrallyear").then(function(response) {
          setusers(response.data)
      console.log(response.data)
        })}
      
        useEffect(()=>{
            getyearall() ;
            axios.get("http://localhost:5000/vente/nbrlastmonth").then(function(response) {
                setlastm(response.data)
            });
            axios.get("http://localhost:5000/vente/months").then(function(response) {
                setmonths(response.data)
            })
            axios.get("http://localhost:5000/vente/yeargraph").then(function(response) {
                setyeargraph(response.data)
            })
         
            axios.get("http://localhost:5000/vente/quantitearticle").then(function(response) {
                setqttarticle(response.data)
            })
            
            axios.get("http://localhost:5000/vente/maxmonth").then(function(response) {
                setmaxm(response.data)
            })
            axios.get("http://localhost:5000/vente/commandesencours").then(function(response) {
                setcmdencours(response.data)
            })
            axios.get("http://localhost:5000/vente/commandevalidesans").then(function(response) {
                setcmdvalidesansa(response.data)
            })
            axios.get("http://localhost:5000/vente/commandevalideavec").then(function(response) {
                setcmdvalideraveca(response.data)
            })
            axios.get("http://localhost:5000/vente/articlebarlastmonth").then(function(response) {
                setarticlelastm(response.data)
            })
            axios.get("http://localhost:5000/vente/prixannee").then(function(response) {
                setprixannee(response.data)
            })
            },[])
  
            const [timeValuebar, setTimeValuebar] = useState(false);
            const handleChangeTimebar = (event, newValue) => {
                setTimeValuebar(newValue);
              
        
               
              
            };
    const [timeValue, setTimeValue] = useState(false);
    const handleChangeTime = (event, newValue) => {
        setTimeValue(newValue);
      

       
      
    };

    return (
        <>
     <div className='inlinechart'>
     <br></br>
              <h1 className='regtitle'>Tableau de bord</h1>
              
        <div className='cardone'>
        <br></br>
           
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 0.5 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                backgroundColor: theme.palette.primary[800],
                                                color: '#fff',
                                                mt: 1
                                            }}
                                        >
                                            <LocalMallOutlinedIcon fontSize="inherit" />
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            disableElevation
                                            variant={timeValue ? 'contained' : 'text'}
                                            size="small"
                                            sx={{ color: 'inherit' }}
                                            onClick={(e) => handleChangeTime(e, true)}
                                        >
                                          Dernier mois
                                        </Button>
                                        <Button
                                            disableElevation
                                            variant={!timeValue ? 'contained' : 'text'}
                                            size="small"
                                            sx={{ color: 'inherit' }}
                                            onClick={(e) => handleChangeTime(e, false)}
                                        >
                                            Dernière Année
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {users.map(el =>
                            <Grid item sx={{ mb: 0.75 }}> {lastm.map(e=>
                                <Grid container alignItems="center">
                                    <Grid item xs={6}>
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                {timeValue ? (
                                                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                       {e.month}
                                                    </Typography>
                                                ) : (
                                                   
                                                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                   {el.year}
                                                    </Typography>)}
                                                
                                            </Grid>
                                            <Grid item>
                                                <Avatar
                                                    sx={{
                                                        ...theme.typography.smallAvatar,
                                                        cursor: 'pointer',
                                                        backgroundColor: theme.palette.primary[200],
                                                        color: theme.palette.primary.dark
                                                    }}
                                                >
                                                    <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                                                </Avatar>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        color: theme.palette.primary[200]
                                                    }}
                                                >
                                                   Nombre total des commandes
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        {timeValue ?  <LineChart
          width={240}
          height={120}
          data={months}
          dataLabels= {{
            enabled: false
        }}
        
        >

<CartesianGrid  horizontal="true" vertical="" stroke='#1565c0' />
          <XAxis  tick={{fill:"#FFFFFF"}}  dataKey="_id" />
          <YAxis tick={{fill:'#1565c0'}} />
          <Tooltip contentStyle={{ backgroundColor: '#1565c0', color: "#fff" }} itemStyle={{ color: "#fff" }} cursor={false}/>
          <Legend  />
          <Line
            type="monotone"
            dataKey="count"
           
            stroke="#FFFFFF"strokeWidth="5" dot={{fill:"#FFFFFF",stroke:"#FFFFFF",strokeWidth: 1,r:1}} activeDot={{fill:'#1565c0',stroke:"#8884d8",strokeWidth: 5,r:7}}
            name="Vente"
            fill="#FFFFFF"
          
           
          />
         
        </LineChart>
               
        
    : <LineChart
    width={240}
    height={120}
    data={yeargraph}
    dataLabels= {{
      enabled: false
  }}
  
  >

<CartesianGrid  horizontal="true" vertical="" stroke='#1565c0' />
    <XAxis  tick={{fill:"#FFFFFF"}}  dataKey="_id" />
    <YAxis tick={{fill:'#1565c0'}} />
    <Tooltip contentStyle={{ backgroundColor: '#1565c0', color: "#fff" }} itemStyle={{ color: "#fff" }} cursor={false}/>
    <Legend  />
    <Line
      type="monotone"
      dataKey="count"
     
      stroke="#FFFFFF"strokeWidth="5" dot={{fill:"#FFFFFF",stroke:"#FFFFFF",strokeWidth: 1,r:1}} activeDot={{fill:'#1565c0',stroke:"#8884d8",strokeWidth: 5,r:7}}
      name="vente"
      fill="#FFFFFF"
    
     
    />
   
  </LineChart>}
                                    </Grid>
                                </Grid>
                          )}  </Grid>)}
                        </Grid>
                    </Box>
                </CardWrapper>
                <div className='pie'>
                        
          <Plot
                
                 data={[{
                     values:prixannee.map((data) => data.count),
                     labels:prixannee.map((data) => data._id),
                     type: 'pie' ,
                     marker: { colors: [theme.palette.secondary.main, '#1565c0',theme.palette.secondary.light,theme.palette.primary.light] },
                     
                 }]}
                 layout={{width: 340,height: 230,title: 'Les 5 plus actifs clients durant cette année',
                
               
              
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
                
                </div>
            </div >
           
           </div>
          
              
           <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>  
           <div className='thridbar'>
          
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Le record de cette année par mois:</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3">{maxm}</Typography>
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
                                          Meilleur mois
                                        </Button>
                                        <Button
                                            disableElevation
                                            variant={!timeValuebar ? 'contained' : 'text'}
                                            size="small"
                                            sx={{ color: 'inherit' }}
                                            onClick={(e) => handleChangeTimebar(e, false)}
                                        >
                                            Dernier mois
                                        </Button>
                                    </Grid>
                            </Grid>
                        </Grid>
                        {timeValuebar ?      <Grid item xs={12}>
                        <BarChart width={730} height={160} data={qttarticle}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="_id" />
  <YAxis />
  <Tooltip />
  <Legend />

  <Bar dataKey="count" fill={theme.palette.secondary.main}  name ="Quantité commandée"/>
  <Bar dataKey="counts" fill="#598bff"  name ="Nombre de fois commandées"/>

</BarChart>
                        </Grid>:
                       < Grid item xs={12}>
                        <BarChart width={730} height={160} data={articlelastm}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="_id" />
  <YAxis />
  <Tooltip />
  <Legend />

  <Bar dataKey="count" fill={theme.palette.secondary.main}  name ="Quantité commandée"/>
  <Bar dataKey="counts" fill="#598bff"  name ="Nombre de fois commandées"/>

</BarChart>
                        </Grid>
                        }
                    </Grid>
                </ MainCard >
            )}
           </div>
           <div >
           {isLoading ? (
                <TotalIncomeCard />
            ) : (<div className='minigraph'>
                <CardWrapper border={false} content={false} sx={{
                                           
                                            backgroundColor: theme.palette.secondary.light,
                                          
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
                                        <HourglassEmptyIcon fontSize="inherit" />
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
                                            variant="subtitle1"
                                            sx={{
                                                color:'#FFFFFF',
                                                
                                            }}
                                        >
                                           Nombre des commandes en cours
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
                </CardWrapper>
                <br></br>
                <CardWrapper border={false} content={false}   sx={{
                                           
                                           backgroundColor: theme.palette.secondary.main
                                         
                                       }}>
                    <Box sx={{ p: 0.25 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 2}}>
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
                                        <HourglassTopIcon fontSize="inherit" />
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
                                            variant="subtitle1"
                                            sx={{
                                                color:'#FFFFFF',
                                                
                                            }}
                                        >
                                           Nombre des commandes validées sans acquit
                                        </Typography>
                                    }
                                    secondary={ cmdvalidesansa.map(el=> <><Typography variant="h4" sx={{
                                        color: theme.palette.grey[500],
                                        mt: 0.5
                                    }}>{el.myCount}</Typography></>)}
                                   
                                />
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
               <br></br>
               <CardWrapper border={false} content={false}     sx={{
                                           
                                           backgroundColor: theme.palette.secondary.dark
                                         
                                       }}>
                    <Box sx={{ p: 0.25 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 2 }}>
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
                                        <HourglassBottomIcon fontSize="inherit" />
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
                                            variant="subtitle1"
                                            sx={{
                                                color:'#FFFFFF',
                                                
                                            }}
                                        >
                                          Nombre des commandes validées avec acquit
                                        </Typography>
                                    }
                                    secondary={ cmdvalideraveca.map(el=> <><Typography variant="h4" sx={{
                                        color: theme.palette.grey[500],
                                        mt: 0.5
                                    }}>{el.myCount}</Typography></>)}
                                   
                                />
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
               
                
           </div> )}
          
           </div>
        </>
    );
};

Home.propTypes = {
    isLoading: PropTypes.bool
};


export default Home;
