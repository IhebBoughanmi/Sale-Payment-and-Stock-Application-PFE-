const express = require("express") 
const router=express.Router()
const facturation = require("../models/Facturation")
const acquit = require("../models/Acquits")
const bonsortie = require("../models/bonsortie")
const nodemailer=require('nodemailer')
let mailTransporter= nodemailer.createTransport(
    {
        service:"gmail",
        auth:{
            user:"responsabledureglementrna@gmail.com",
            pass:"responsabledureglement"
        }
    }
)
router.get("/allacquit",(req,res)=>{
    acquit.find()
    .then(data=>res.send(data))
    .catch(err=>console.error(err))
})
router.post("/ajouteracquit",(req,res)=>{
    const { Infoarticlescommander,Codeclient,Lieulivraison,email,Nbrfut,Vol,Modepaiement,moyentransport,datesortie,masleknakel,datefin,dateacquit,facture}=req.body;
    const paiement =Modepaiement
    acquit.findOne({Numfac:facture})
    .then((arti)=>{
        if (arti) {
            return res.sendStatus(409)}
        else  {
            const art = new acquit({
                Codeclient,lieu:Lieulivraison,Codeclient,email,Nbrfut,Vol,Modepaiement,moyentransport,datesortie,masleknakel,datefin,dateacquit,
                Numfac:facture, Infoarticlescommander,devise:'dt'  })   
        art.save()
        .then ((data)=>{   
        res.sendStatus(200); })
        .catch(err=>res.sendStatus(404)) } })
    let details={
        from:"responsableduventerna@gmail.com",
        to:email,
        subject:"Message de validation du commande",
        text:`Votre commande sous le numéro  ${facture} est vaider  veuillez payer votre facture ${paiement}  `
    }
    mailTransporter.sendMail(details,(err)=>{
        if(err){ console.log(err) }
        else(console.log(envoyer))})})
router.put("/updateacquit/:id",(req, res)=>{
    const {acquit}=req.body;
    const id = req.params.id;
    if(!req.body){  return res.status(400) }
    else{ facturation.findOneAndUpdate({_id:id}, req.body)
        .then(data => {
             res.send(data) })
        .catch(err =>{ res.sendStatus(500) })} })
router.post("/ajouterbonsortie",(req,res)=>{
    const {Infoarticlescommander,Codeclient, Nbrfut,Vol, Datecomm, Datefac,Numcomm,facture,datebonsortie}=req.body;
 

    bonsortie.findOne({Numfac:facture})
    .then((arti)=>{
        if (arti) {
            return res.sendStatus(409)}
        else  {
            const art = new bonsortie({
               Numfac:facture, datebonsortie:datebonsortie,Infoarticlescommander,Codeclient, Nbrfut,Vol, Datecomm, Datefac,Numcomm
            })
          
        art.save()
        .then ((data)=>{
         
        res.sendStatus(200);
        })
        .catch(err=>res.sendStatus(404))
    }
    })
})
router.put("/updatebonsortie/:id",(req, res)=>{
    const {bonsortie}=req.body;
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
    
})
module.exports=router;