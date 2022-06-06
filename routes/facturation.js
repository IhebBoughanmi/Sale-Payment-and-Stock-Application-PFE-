const express = require("express") 
const router=express.Router()
const facturation = require("../models/Facturation")
const Commande = require("../models/Commande")
const nodemailer=require('nodemailer')
const cmdfacturer= require("../models/cmdfacturer")
const Accounts = require("../models/Accounts")
let mailTransporter= nodemailer.createTransport(
    {
        service:"gmail",
        auth:{
            user:"responsabledureglementrna@gmail.com",
            pass:"responsabledureglement"
        }
    }
)
router.post("/ajouterfacture",(req,res)=>{
    const {Codeclient,Lieulivraison,Modelivraison,Modepaiement,Nbrfut,Vol,Datecomm,Infoarticlescommander,PrixHT,PrixTOT,Remise,
        mongoid,email,nomprenom,date}=req.body;
    const idd=req.params.id;
    facturation.findOne({_id:mongoid})
    .then((arti)=>{
        if (arti) {
            return res.sendStatus(409)}
        else  {
            const art = new  facturation({
                Codeclient,Lieulivraison,Modelivraison,Modepaiement,Nbrfut,Vol,Datecomm,Infoarticlescommander,PrixHT,PrixTOT,email,
             Remise,Numcomm:mongoid,etat:"valide",Datevalidationcomm:new Date(),Datevalidationcommformat:date,acquit:'non',
             bonsorite:'non' , nomprenom
            })
          
        art.save()
        .then ((data)=>{
         
        res.sendStatus(200);
        })
        .catch(err=>res.sendStatus(404))
    }
    })
    
})
router.delete("/delete/:id",(req,res)=>{
    const id=req.params.id;
    Commande.findByIdAndDelete({_id:id})
    .then(()=>{res.sendStatus(200)})
    .catch(err=>console.error(err))
})
router.delete("/deletefacture/:id",(req,res)=>{
    const id=req.params.id;
    facturation.findByIdAndDelete({_id:id})
    .then(()=>{res.sendStatus(200)})
    .catch(err=>console.error(err))

})
router.get("/allfactures",(req,res)=>{
    facturation.find()
    .then(data=>res.send(data))
    .catch(err=>console.error(err))
})
router.delete("/deletefacture/:id",(req,res)=>{
    const id=req.params.id;
    facturation.findByIdAndDelete({_id:id})
    .then(()=>{res.sendStatus(200)})
    .catch(err=>console.error(err))

})

router.put("/updateetat/:id",(req, res)=>{
    const {etat,Datepaiement,email}=req.body;
    const id = req.params.id;
    
    if(!req.body){
        return res.status(400)
    }
    else{
        facturation.findOneAndUpdate({_id:id}, req.body)
        .then(data => {
             res.send(data)
             
        })
        .catch(err =>{ res.sendStatus(500) })} 
        let details={
            from:"responsabledureglementrna@gmail.com",
            to:email,
            subject:"Message de validation du paiement",
            text:`Votre facture est payée avec succées .
            nous allons vous  envoyer un message contenat les details de livraison `
        }
        mailTransporter.sendMail(details,(err)=>{
            if(err){
                console.log(err)
            }
            else(console.log(envoyer))
        })
    
})


router.post("/ajouterfacturehistorique",(req,res)=>{
  
    const {Codeclient,Lieulivraison,Modelivraison,Modepaiement,Nbrfut,Vol,Datecomm,Infoarticlescommander,PrixTOT,Remise,mongoid,Numcomm,etat,acquit,bonsorite,Datevalidationcomm,Datepaiement,email,nomprenom,date,month,year,day,monthname}=req.body;
    

cmdfacturer.findOne({_id:mongoid})
    .then((arti)=>{
        if (arti) {
            return res.sendStatus(409)}
        else  {
            

            const art = new cmdfacturer({
                Codeclient,Lieulivraison,Modelivraison,Modepaiement,Nbrfut,Vol,Datecomm,Infoarticlescommander,PrixTOT,Remise,Numcomm,etat,acquit,bonsorite,Datevalidationcomm,Datepaiement,email,nomprenom
              ,datefacturehistorise: date , NumFac:mongoid,month,year,day,monthname
            })
          
         
          
           
        
        art.save()
        .then ((data)=>{
         
        res.sendStatus(200);
        })
        .catch(err=>res.sendStatus(404))
    }
    })
   
})


/* vente*/
/* nbr des commandes par moins */
router.get(
    "/alldates",  async (req, res) => {
        const month= await cmdfacturer.aggregate
 ([
    {
        $match: {"year": {"$gt": '2022'}},
    },
    {
      $sortByCount: "$monthname"
    }
])
        
     res.send(month);
    })
    
    /*reglement */
    /* revenue chaque mois */
    router.get(
        "/allprix",  async (req, res) => {
            const prix = await cmdfacturer.aggregate([{
                $group: {
                  _id: "$monthname",
                  count: { $sum: "$PrixTOT" }
                }
              }])
             
         res.send(prix);
        })

/* admin */
/* number off users every days */
        router.get(
            "/allusers",  async (req, res) => {
                admine = await Accounts.aggregate([
                  
                        {$group : {_id:"$date", count:{$sum:1}} },
                        {
                            $sort : { count: -1 }
                          }
                    
                ]).limit(7)
                 
             res.send(admine );
            })
    /* totale number of users per type */
            router.get(
                "/allusersnombres",  async (req, res) => {
                    const admin= await Accounts.aggregate
  ([
    
     {
        $sortByCount: "$acctype"
     ,
     }
 ])

                     
                 res.send(admin );
                })
        
module.exports=router;