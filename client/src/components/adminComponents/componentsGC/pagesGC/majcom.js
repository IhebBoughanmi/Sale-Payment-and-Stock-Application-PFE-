import React from 'react';
import './comm.css';
export default function MAJCOM() {
  return (
   
      <div>
              <div className='containercomm'>
                      <div className='title'>MAJ commande</div>
                      <form action='#'>
                              <div className='grid-container'>
                              <div className="grid-item">
                <div className='boxinput'>
                 <span className='details  '>N° Cmd</span> 
              <input type='text'></input>
             </div></div>
                <div className="grid-item">
                <div className='boxinput '>
                 <span className='details'>Date</span> 
                 <input type='date'></input>
                </div></div>
               
                <div className="grid-item">
                <div className='select'>
              <span className='details'>  Mode de paiement</span>
             
              <select name="classe" >
  
                     <option value="1">cheque</option>
                      <option value="2">espece</option>
                      <option value="3">enligne</option>
              </select></div></div> 
               
                <div className="grid-item">
                <div className='boxinput'>
                 <span className='details  '>Etat Cmd</span> 
              <input type='text'></input>
             </div></div><div className="grid-item">
                <div className='boxinput '>
                 <span className='details'>N°Client</span> 
                 <input type='text'></input>
                </div ></div>
            
              <div className="grid-item">
              <div className='select'>
              <span className='details'>  Mode de livraison</span>
              <select name="classe" >
  
                     <option value="1">propre moyen</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
              </select>
              </div></div><div className="grid-item">
                <div className='boxinput'>
                 <span className='details '>Matricule fiscale</span> 
                  <input type='text'></input>
                </div></div>
              <div className="grid-item">
              <div className='select'>
              <span className='details'>Délai de paiement </span>
            
              <select name="classe" >
  
                     <option value="1">imadiate</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
              </select></div></div>
              <div className="grid-item">
              <div className='select'>
              <span className='details'>Délai de livraison</span>
              
              <select name="classe" >
  
                     <option value="1">imadiate</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
              </select></div></div> <div className="grid-item">
                <div className='boxinput '>
                 <span className='details'>Devise</span> 
                  <input type='text'></input>
                </div></div>
              </div></form>
              </div>
             <div className='container-2'>
             <table className='tablecomm'>
<tr>
  <th>article</th>
  <th>désignation</th>
  <th>unité de vente</th>
  <th>quantité</th>
</tr>
<tr>
  <td>
    <select>
    <option>select option</option>
    <option>alcool absolue</option>
    <option>alcool mauvais gout</option>
    <option>alcool bon gout</option>
    </select>
    </td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td>  <select>
    <option>select option</option>
    <option>alcool absolue</option>
    <option>alcool mauvais gout</option>
    <option>alcool bon gout</option>
    </select></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
</table>
                     </div> 
              

      </div>
                  )}