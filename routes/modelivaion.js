const express = require("express") //setting up an express serveur 
const router=express.Router()
const Modelivraison = require("../models/Modelivraison")

router.post("/ajoutermodelivraison",(req,res)=>{

    const {Codemodedelivraison,Modedelivraison}=req.body;
    Modelivraison.findOne({Codemodedelivraison})
    .then((modep)=>{
        if (modep) {return res.sendStatus(409)}
        else {
            const mode = new Modelivraison({
                Codemodedelivraison,Modedelivraison
            })
        mode.save()
        .then ((data)=>{
         
        res.sendStatus(200);
        })
        .catch(err=>res.sendStatus(404))
    }
    })
})

router.get("/all",(req,res)=>{
    Modelivraison.find()
    .then(data=>res.send(data))
    .catch(err=>console.error(err))
})

router.delete("/deleteModedelivraison/:id",(req,res)=>{
    const id=req.params.id;
    Modelivraison.findByIdAndDelete({_id:id})
    .then(()=>{res.sendStatus(200)})
    .catch(err=>console.error(err))

})
router.put("/updateall/:id",(req, res)=>{
    const {Codemodedelivraison,Modedelivraison}=req.body;

    if(!req.body){
        return res.status(400)
    }
    const id = req.params.id;
    Modelivraison.findOne({Codemodedelivraison,Modedelivraison})
    .then((mode)=>{
        if(mode) return(res.sendStatus(409)); 
        else{Modelivraison.findByIdAndUpdate({_id:id}, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update article with ${id}. Maybe article not found!`})
            }
            else{ res.send(data) }
        })
        .catch(err =>{ res.status(500) })} })
})

router.put("/updateModedelivraison/:id",(req, res)=>{
    const {Modedelivraison}=req.body;
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