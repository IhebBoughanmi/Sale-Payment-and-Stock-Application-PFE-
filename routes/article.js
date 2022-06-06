const express = require("express") //setting up an express serveur 
const router=express.Router()
const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./client/public/uploads/');
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    },
})

const upload=multer({storage:storage})
const Article = require("../models/Article")
    router.post("/ajouter",upload.single("image"), (req,res)=>{

            const art = new Article({
                CodeArticle:req.body.CodeArticle,Designation:req.body.Designation,Prix:req.body.Prix,Description:req.body.Description,Quantite:0
                ,image:req.file.originalname
            })
        art.save()
        .then ((data)=>{
        res.sendStatus(200);
        })
        .catch(err=>res.sendStatus(404))
   
})

router.get("/all",(req,res)=>{
    Article.find()
    .then(data=>res.send(data))
    .catch(err=>console.error(err))
})

router.delete("/delete/:id",(req,res)=>{
    const id=req.params.id;
    Article.findByIdAndDelete({_id:id})
    .then(()=>{res.sendStatus(200)})
    .catch(err=>console.error(err))
})

router.put("/update/:id",upload.single("image"), (req, res)=>{
    const {Designation,Prix,Description}=req.body;

    if(!req.body){
        return res.status(400)
    }

    const id = req.params.id;
    Article.findOne({Designation,Prix,Description})
    .then((art)=>{
        if(art) return(res.sendStatus(409)); 
        else{Article.findByIdAndUpdate({_id:id}, req.body,{ useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update article with ${id}. Maybe article not found!`})
            }
            else{ res.send(data) }
        })
        .catch(err =>{ res.status(500) })} })
})

router.put("/updatequantite/:id",(req, res)=>{
    const {Quantite}=req.body;
    const id = req.params.id;
    if(!req.body){
        return res.status(400)
    }
    else{
        Article.findByIdAndUpdate({_id:id},{$inc:{Quantite:Quantite}})
        .then(data => {
             res.send(data)
        })
        .catch(err =>{ res.sendStatus(500) })}  
})

router.put("/updateechent/:id",(req, res)=>{
    const {VC:vc,DegreEnfencement:deg,Temperature:temp,TAV:tav,Densite:dens,Coef:coef}=req.body;
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