const express = require("express") 
const router=express.Router()
const facturation = require("../models/Facturation")
const Commande = require("../models/Commande")
const nodemailer=require('nodemailer')
const cmdfacturer= require("../models/cmdfacturer")
const Accounts = require("../models/Accounts")
        
async function getusers(){
  const date = new Date();
  const yearnow= date.getFullYear()
  const monthnow=   ("0" + (date.getMonth() + 1)).slice(-2).toString();
  const yearsnow =yearnow.toString()
  const cmdencours = await facturation.aggregate([
   
    { $match : {etat: "payee"} },
    { $group: { _id:'$bonsorite', myCount: { $sum: 1 } } },

])

    }
    getusers()
  
    router.get(
        "/articleannee",  async (req, res) => {
          const date = new Date();
            const yearnow= date.getFullYear()
       
            const yearsnow =yearnow.toString()
            const quantite = await cmdfacturer.aggregate([
                { $match : {year:yearsnow} }
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
          
      res.send(quantite);
      })
      router.get(
        "/articleallyear",  async (req, res) => {
            const quantite = await cmdfacturer.aggregate([
  
    
                { "$unwind": "$Infoarticlescommander" },
               
              {
            $group: {
              _id:
              "$year",
            
               
            
              count: { $sum: "$Infoarticlescommander.quan" },
            
            }},
               
            ])
      res.send(quantite);
      })
      router.get(
        "/bonsortielivrer",  async (req, res) => {
            const cmdencours = await facturation.aggregate([
   
                { $match : {etat: "payee"} },
                { $group: { _id:'$bonsorite', myCount: { $sum: 1 } } },
            
            ])
      res.send(cmdencours);
      })
      router.get(
        "/livreranne",  async (req, res) => {
            const date = new Date();
            const yearnow= date.getFullYear()
       
            const yearsnow =yearnow.toString()
            const cmdencours = await cmdfacturer.aggregate([
   
                { $match : {year: yearsnow} },
                { $group: { _id: null, count: { $sum: 1 } } },
            
            ])
      res.send(cmdencours);
      })
      router.get(
        "/livraison",  async (req, res) => {
            const cmdencours = await facturation.aggregate([
   
                { $match : {etat: "payee", bonsorite:'oui'} },
                { $group: { _id:null, myCount: { $sum: 1 } } },
            
            ])
      res.send(cmdencours);
      })
   module.exports=router;