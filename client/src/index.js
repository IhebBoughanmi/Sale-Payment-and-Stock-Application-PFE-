import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Login from "./components/login";
import './styles/index.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Client from './components/client.js'
import Vente from './components/vente.js'
import Admin from './components/admin.js'
import Depot from './components/depot.js'
import Reglement from './components/reglement.js'
import Redirecter from './components/redirecter.js';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/client" element={<Client />}  /> 
        <Route path="/vente" element={<Vente />}  />
        <Route path="/redirecter" element={<Redirecter />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/reglement" element={<Reglement />} />
        <Route path="/depot" element={<Depot />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
