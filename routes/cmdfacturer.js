if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  console.log(process.env)
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
  const fs = require('fs')
  const stripe = require('stripe')(stripeSecretKey)
const express = require("express") 
const uuid = require("uuid");
const router=express.Router()

const cmdfacturer= require("../models/cmdfacturer")
/*
router.post('/payer', cors(), async (req, res) => {
    const {  token } = req.body;
    const idempotency_key = uuid();
 
	try {
        const charge = await stripe.charges.create(
            {
              amount: 10 ,
              currency: "dt",
              receipt_email: token.email,
            },
            {
              idempotency_key
            }
          );
		  console.log("Charge:", { charge });
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})*/


  
  router.post('/payer', function(req, res) {
    const {Codeclient,Lieulivraison,Modelivraison,Modepaiement,Nbrfut,Vol,Datecomm,Infoarticlescommander,PrixHT,PrixTOT,mongoid,Datevalidationcomm}=req.body;
         

   
                    const art = new  cmdfacturer({
                        Codeclient,Lieulivraison,Modelivraison,Modepaiement,Nbrfut,Vol,Datecomm,Infoarticlescommander,PrixHT,PrixTOT,Numcomm:mongoid,etat:"payé",Datevalidationcomm
                    })
              
          
                art.save()
                .then ((data)=>{
                 
                res.sendStatus(200);
                })
               
      
        })
        router.get("/allfacturespayer",(req,res)=>{
          cmdfacturer.find()
          .then(data=>res.send(data))
          .catch(err=>console.error(err))
      })

module.exports=router;