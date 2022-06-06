const express = require("express") 
const router=express.Router()
const Commande = require("../models/Commande")
const nodemailer=require('nodemailer')
let mailTransporter= nodemailer.createTransport(
    {
        service:"gmail",
        auth:{
            user:"responsableduventerna@gmail.com",
            pass:"responsableduvente"
        }
    }
)
router.post("/ajoutercommande",(req,res)=>{

    const {mail,nom,prenom,Numcomm,Codeclient,Modepaiement,Modelivraison,Lieulivraison,Nbrfut,Vol,Datecomm,Infoarticlescommander,PrixHT,Remise,PrixTOT}=req.body;
    const newString = nom.concat(" ").concat(prenom)
    const com = new  Commande({
                email:mail,nomprenom: newString, Numcomm,Codeclient,Modepaiement,Modelivraison,Lieulivraison,Nbrfut,Vol,Datecomm,Infoarticlescommander,PrixHT,Remise,PrixTOT
            })
        com.save()
        .then ((data)=>{
         
        res.send(data)}
        )
        .catch(err=>console.error(err))
        let details={
            from:"responsableduventerna@gmail.com",
            to:mail,
            subject:"Message d'enregistrement de commande",
            text:`Votre commande a éte enregistée! veuillez attendre la confirmation .
            un message   vous sera envoyé  lors de la confirmation.
            Vous pouvez aussi  suivre votre commande  dans "mes factures"`
        }
        mailTransporter.sendMail(details,(err)=>{
            if(err){
                console.log(err)
            }
            else(console.log(envoyer))
        })
    
})

router.get("/allcomandes",(req,res)=>{
    Commande.find()
    .then(data=>res.send(data))
    .catch(err=>console.error(err))
})

router.get("/all",(req,res)=>{
    Commande.find()
    .then(data=>res.send(data))
    .catch(err=>console.error(err))
})

router.delete("/refusecommande/:id",(req,res)=>{
    const id=req.params.id;
    Commande.findByIdAndDelete({_id:id})
    .then(()=>{res.sendStatus(200)})
    .catch(err=>console.error(err))

})

async function getusers(){
 
    const ff= await Commande.find( { Codeclient:"nourrr"} ).count()
    console.log(ff)
  



}
getusers()

router.get(
    "/allcommandes/:codeclient",  async (req, res) => {
        const id=req.params.codeclient;
        const ff= await Commande.find( { Codeclient:'nourrr'} ).count()

        console.log(ff)
     res.send(ff);
    })
module.exports=router;