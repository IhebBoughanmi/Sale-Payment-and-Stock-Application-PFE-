const express = require("express") 
const router=express.Router()
const facturation = require("../models/Facturation")
const Commande = require("../models/Commande")
const nodemailer=require('nodemailer')
const cmdfacturer= require("../models/cmdfacturer")

    /* vente*/
    /* nbr des commandes par moins */
    router.get(
        "/nbrallyear",  async (req, res) => {
          const date = new Date();
          const yearnow= date.getFullYear()
          const yearsnow =yearnow.toString()
          const monthnow=   ("0" + (date.getMonth() + 1)).slice(-2).toString();
            const year= await cmdfacturer.aggregate
            ([
               {
                   $match: {"year": yearsnow}},
              
               {$count:'year'} 
            
           ])
           console.log('year',year)
         res.send(year);
        })
        router.get(
            "/nbrlastmonth",  async (req, res) => {
              const date = new Date();
              const yearnow= date.getFullYear()
         
              const yearsnow =yearnow.toString()
              const monthnow=   ("0" + (date.getMonth() + 1)).slice(-2).toString();
                const yearmonth= await cmdfacturer.aggregate
                ([
                   {
                       "$match":{
                         
                           "$and":[
                             {"year":{"$gte": yearsnow}},
                             {"month":{"$gte":monthnow}}
                           ]}},
                   {$count:'month'} 
                
               ])
             res.send(yearmonth);
            })
        
       
   router.get(
    "/months",  async (req, res) => {
      const date = new Date();
      const yearnow= date.getFullYear()
 
      const yearsnow =yearnow.toString()
      const monthnow=   ("0" + (date.getMonth() + 1)).slice(-2).toString();
      const month= await cmdfacturer.aggregate
     ([
      { $match : {year: yearsnow } }
       ,
        {
          $sortByCount: "$monthname"
        },
        
    
    ])
    res.send(month);
   })
   router.get(
    "/yeargraph",  async (req, res) => {
      const date = new Date();
      const yearnow= date.getFullYear()
 
      const yearsnow =yearnow.toString()
      const monthnow=   ("0" + (date.getMonth() + 1)).slice(-2).toString();
    const month= await cmdfacturer.aggregate
    ([
    {
         $sortByCount: "$year"
       },
       { $sort : { year : -1 } }
    ])
    res.send(month);
   })
   router.get(
    "/quantitearticle",  async (req, res) => {
      const date = new Date();
      const yearnow= date.getFullYear()
 
      const yearsnow =yearnow.toString()
    const monthmax= await cmdfacturer.aggregate
    ([
        
       {
           $match: {year:yearsnow }},
     
       {
         $sortByCount: "$monthname"
       },
       {$limit : 1 }
          
       
    
    ])
    const maxixi=monthmax[Object.keys(monthmax)[0]]._id;
      const quantitemaxmonth = await cmdfacturer.aggregate([
        { $match : {monthname: maxixi} }
        ,
        { "$unwind": "$Infoarticlescommander" },
       
      {
    $group: {
      _id:
      "$Infoarticlescommander.des",
       
   
      count: { $sum: "$Infoarticlescommander.quan" },
      counts:{$sum:1}
    }},
       
  ])
    res.send( quantitemaxmonth);
   })
   router.get(
    "/maxmonth",  async (req, res) => {
      const date = new Date();
      const yearnow= date.getFullYear()
 
      const yearsnow =yearnow.toString()
    const monthmax= await cmdfacturer.aggregate
    ([
        
       {
           $match: {year:yearsnow }},
     
       {
         $sortByCount: "$monthname"
       },
       {$limit : 1 }
    ])
    const maxixi=monthmax[Object.keys(monthmax)[0]]._id;
    

    res.send( maxixi);
   })
   
   router.get(
    "/commandesencours",  async (req, res) => {
      const cmdencours = await Commande.aggregate([
       
   
        { $group: { _id: null, myCount: { $sum: 1 } } },
   
    ])
    res.send(cmdencours);
   })

  router.get(
    "/commandevalidesans",  async (req, res) => {
      const cmdencours = await facturation.aggregate([
      
        { $match : {acquit: "non"} },
        { $group: { _id: null, myCount: { $sum: 1 } } },
  
    ])
    res.send(cmdencours);
   })
   router.get(
    "/commandevalideavec",  async (req, res) => {
      const cmdencours = await facturation.aggregate([
      
        { $match : {acquit: "oui"} },
        { $group: { _id: null, myCount: { $sum: 1 } } },
    
    ])
    res.send(cmdencours);
   })
   router.get(
    "/articlebarlastmonth",  async (req, res) => {
      const date = new Date();
      const yearnow= date.getFullYear()
  const monthnow=   ("0" + (date.getMonth() + 1)).slice(-2).toString();

  const quantitemaxmonth = await cmdfacturer.aggregate([
    { $match : {month: monthnow} }
    ,
    { "$unwind": "$Infoarticlescommander" },
   
  {
$group: {
  _id:
  "$Infoarticlescommander.des",
   

  count: { $sum: "$Infoarticlescommander.quan" },
  counts:{$sum:1}
}},
   
])
res.send(quantitemaxmonth);
 })
 router.get(
  "/prixannee",  async (req, res) => {
    const date = new Date();
      const yearnow= date.getFullYear()
 
      const yearsnow =yearnow.toString()
    const client= await cmdfacturer.aggregate
    ([
        
       {
           $match: {year:yearsnow }},
     
       {
         $sortByCount: "$Codeclient"
       },
       {$limit : 5},
          
       
    
    ])
    
res.send(client);
})
router.get(
  "/commandevalidesansavecacquit",  async (req, res) => {
    const cmdencours = await facturation.aggregate([
    
      { $match : {etat: "valide"} },
      { $group: {  _id: 
       "$acquit",
       
       count: { $sum: 1 } } },

  ])
  res.send(cmdencours);
 })

   module.exports=router;