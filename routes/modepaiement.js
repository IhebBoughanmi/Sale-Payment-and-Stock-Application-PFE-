const express = require("express") //setting up an express serveur 
const router=express.Router()
const Modepaiement = require("../models/Modepaiement")

router.post("/ajoutermodepaiement",(req,res)=>{

    const {Codemodedepaiement,Modedepaiement}=req.body;
    Modepaiement.findOne({Codemodedepaiement})
    .then((modep)=>{
        if (modep) {return res.sendStatus(409)}
        else {
            const mode = new Modepaiement({
                Codemodedepaiement,Modedepaiement
            })
        mode.save()
        .then ((data)=>{
         
        res.sendStatus(200);
        })
        .catch(err=>res.sendStatus(404))
    }
    })
})

router.get("/allmodepaiement",(req,res)=>{
    Modepaiement.find()
    .then(data=>res.send(data))
    .catch(err=>console.error(err))
})

router.delete("/deletemodedepaiement/:id",(req,res)=>{
    const id=req.params.id;
    Modepaiement.findByIdAndDelete({_id:id})
    .then(()=>{res.sendStatus(200)})
    .catch(err=>console.error(err))

})
router.put("/updateall/:id",(req, res)=>{
    const {Codemodedepaiement,Modedepaiement}=req.body;

    if(!req.body){
        return res.status(400)
    }
    const id = req.params.id;
    Modepaiement.findOne({Codemodedepaiement,Modedepaiement})
    .then((mode)=>{
        if(mode) return(res.sendStatus(409)); 
        else{Modepaiement.findByIdAndUpdate({_id:id}, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update article with ${id}. Maybe article not found!`})
            }
            else{ res.send(data) }
        })
        .catch(err =>{ res.status(500) })} })
})

router.put("/updatemodedepaiement/:id",(req, res)=>{
    const {Modedepaiement}=req.body;
    const id = req.params.id;
    if(!req.body){
        return res.status(400)
    }
    else{
        Article.findByIdAndUpdate({_id:id}, req.body)
        .then(data => {
             res.send(data)
        })
        .catch(err =>{ res.sendStatus(500) })} 
    
})



module.exports=router;