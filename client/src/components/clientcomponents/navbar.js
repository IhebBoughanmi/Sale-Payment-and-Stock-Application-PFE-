import React,{useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios' ;
import{GrUserSettings} from 'react-icons/gr';
import {AiOutlineLogout}from 'react-icons/ai';
import user from "./profile.png";
 export const pages = [
  { 
    name: 'Acceuil',
    exact: true,
    to: "/",}, 
     { 
      name: 'Commander',
      exact: true,
      to: "/",}, 
      { 
        name: 'Mes factures',
        exact: true,
        to: "/",}, 
       ];
const settings = [ 'Account','Logout'];
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(1, 0, 58)',
    },
  },
});


export default function ResponsiveAppBar  (props)  {
  


  const [currentUser, setCurrentUser] = useState(undefined);

  
  const logout=()=>{
    axios.get("http://localhost:5000//user/logout")
    .then(res=>{ localStorage.removeItem(res.data.token);
      ;
    })
    .catch(err=>{
      console.log("data not found")
    })
  }
;
  const [click, setClick] = useState(false);
  const [com,setCom]=useState(false)
  const [maj,setMaj]=useState(false)
  const [acquis,setAcquis]=useState(false)
  const [compteuti,setcompteuti]=useState(false)


  const opencompteuti=()=>{
    setAcquis(false);
    setCom(false);
    setMaj(false);
    setcompteuti(true);
    handleCommands('Account');
  }
  const openMaj=()=>{
    setAcquis(false);
    setCom(false);
    setcompteuti(false);
    setMaj(true);
    handleCommands("Acceuil");
  }
  const openAcquis=()=>{
    setAcquis(true);
    setCom(false);
    setMaj(false);
    setcompteuti(false);
    handleCommands("Mes factures");

  }
  const opencommander=()=>{
    setAcquis(false);
    setcompteuti(false);
    setMaj(false);
    setCom(true);
    handleCommands('Commander');

  }
  const handleCommands=(name)=>{
   props.handleclient(name)
  }
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
const [activefacture,setactivefacture] = useState(false);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setactivefacture(true);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
    <AppBar position="static"  >
      <Container maxWidth="xl" >
        <Toolbar disableGutters >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <img src='http://www.arabsoft.com.tn/smart/themes/default/assets/img/logo_svg.svg?fbclid=IwAR2GyFat_PStujaT-1UEXgAvGxcEa7e2DFgNeAcPwvkZ-8NY48yKt67liEo' alt="webscript" width='200' />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            
               <MenuItem  key='Acceuil'
                onClick={()=>openMaj()}>
                  <Typography textAlign="center"> Acceuil</Typography>
                </MenuItem>
                  
               <MenuItem    key='Commander'
                onClick={()=>opencommander()}>
                  <Typography textAlign="center"> Commander</Typography>
                </MenuItem>
                  
               <MenuItem  key='Mes factures'
                onClick={()=>openAcquis()}>
                  <Typography textAlign="center">Mes factures</Typography>
                </MenuItem>
            
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img src='http://www.arabsoft.com.tn/smart/themes/default/assets/img/logo_svg.svg?fbclid=IwAR2GyFat_PStujaT-1UEXgAvGxcEa7e2DFgNeAcPwvkZ-8NY48yKt67liEo' alt="webscript" width='200' />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft:20}}>
          <Button
                key='Acceuil'
                onClick={()=>openMaj()}
                sx={{ my: 2, color: 'white', display: 'block', marginLeft:10 }}
               
              >
             Acceuil
              </Button>
              <Button
                key='Commander'
                onClick={()=>opencommander()}
                sx={{ my: 2, color: 'white', display: 'block', marginLeft:10 }}
               
              >
                Commander
              </Button>
              <Button
                key='Mes factures'
                onClick={()=>openAcquis()}
                sx={{ my: 2, color: 'white', display: 'block', marginLeft:10 }}
               
              >
              Mes factures
              </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
               <MenuItem  key='Account' onClick={opencompteuti}
               >
                  <Typography textAlign="center"> <GrUserSettings/> Compte</Typography>
                </MenuItem>
                  
               <MenuItem    key='Logout'   
                >
                  <Typography >  <a href="/"   onClick={logout}>
                    <AiOutlineLogout/>
                Déconnexion
              </a></Typography>
                </MenuItem>
                  
            
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    
     </>
  );
};

