import  MenuArticle from './componentsArticle/menuarticle';
import React, { useState } from 'react';
import Article from './componentsArticle/consultmajarticle';
import Addarticle from './componentsArticle/addarticle';

function Apparticle() {
  const [commander, setCommander]=useState("");
const handleCommander=(comm)=>{
  setCommander(comm)
}
  return (
    
  <div className='navGC'>
      <MenuArticle handleCommander={handleCommander} />
      {commander==="Ajouter Article"? <Addarticle/>:
      commander==="Consulter Article"?<Article/>
     :null}
  </div>
     
  );
}

export default Apparticle;