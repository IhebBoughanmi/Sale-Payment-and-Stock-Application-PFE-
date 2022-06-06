const express = require("express") //setting up an express serveur 
const router=express.Router()
const Accounts = require("../models/Accounts")
const nodemailer = require("nodemailer");
const crypto = require('crypto')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken") //requiring the json web token 
const passport=require("passport")
let mailTransporter= nodemailer.createTransport(
    {
        service:"gmail",
        auth:{
            user:"responsableduventerna@gmail.com",
            pass:"responsableduvente"
        }
    }
)
router.post("/sign-up",(req,res)=>{
const codemail= Math.floor( Math.random() * (2564 - 4586) +2564)
    const {societe,nom,prenom,email,Usine,identifiant,acctype, password,date,month,year,day,monthname} = req.body;
    Accounts.findOne({identifiant:identifiant}).then((account) =>{
    if (account) return res.sendStatus(409);
    else {
        const accounts = new Accounts({
            societe:societe,nom,prenom,mail:email,usine:Usine,identifiant:identifiant,acctype:acctype,password,date,month,year,day,monthname,
            mailtoken:crypto.randomBytes(64).toString('hex'),
            isverified:'false',codemail
        })   
        let details={
            from:"responsableduventerna@gmail.com",
            to: email,
            subject:"Messagede validation d'email",
            text:`votre code de validation est  ${codemail}`
        }
        mailTransporter.sendMail(details,(err)=>{
            if(err){
                console.log(err)
            }
            else(console.log(envoyer))
        })
        //crypt the code
        bcrypt.genSalt(10 , (err , salt) =>{
            bcrypt.hash(password , salt ,(err,hash)=>{
                accounts.password=hash;
                accounts.save()
                .then((newacc) => res.json(newacc))
                .catch((err) => console.error(err))})
        }) 
    }
}) 
    .then(result => console.log(result))
    .catch(err => console.log(err)) })


//login user !
router.post("/login" , (req , res)=>{
    const {identifiant,password} = req.body;
    Accounts.findOne({identifiant}).then(user =>{
        if(!user) res.sendStatus(404)
        else {
            bcrypt.compare(password,user.password)
            .then(isMatched =>{
                if (isMatched){
                 const payload={id:user._id ,societe:user.societe,usine:user.usine,identifiant:user.identifiant, acctype:user.acctype,
                    nom:user.nom,prenom:user.prenom,mail:user.mail,password:user.password,codemail:user.codemail,isverified:user.isverified}
                    jwt.sign(payload , "session" , {expiresIn:3600}, (err ,token)=>{
                        if(err) res.sendStatus(500)
                        else { res.json({token: token}); }
                    })
                }else{ res.sendStatus(400) }
            })
        }
    }).catch(err => res.send('login error'));
})

// validate token
router.get("/validate" , passport.authenticate("jwt" , {session:false}) ,(req,res)=>{
    res.send(req.user);
})



router.get("/tt",(req,res)=>{
    Accounts.find()
    .then(data=>res.send(data))
    .catch(err=>console.error(err))
})

router.delete("/delete/:id",(req,res)=>{
    const id=req.params.id;
    Accounts.findByIdAndDelete({_id:id})
    .then(()=>{res.sendStatus(200)})
    .catch(err=>console.error(err))

})

router.put("/update/:id",(req, res)=>{
    const {societe,Nom,Prenom,mail,Usine,Identifiant,acctype, password,Compagne} = req.body;

    if(!req.body){
        return res.status(400)
    }
    const id = req.params.id;
    Accounts.findByIdAndUpdate({_id:id}, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update article with ${id}. Maybe article not found!`})
            }
            else{ res.send(data) }
        })
        .catch(err =>{ res.status(500) })
})
//log out session

router.get('/logout', function(req, res, next) {
	// remove the req.user property and clear the login session
	req.logout();

	// destroy session data
	req.session = null;

	// redirect to homepage
	res.redirect('/');
});


router.get("/userloged",(req,res)=>{
    Accounts.find()
    .then(data=>res.send(data))
    .catch(err=>console.error(err))
})

router.put("/updateverif/:identifiant",(req, res)=>{
    const {isverified}=req.body;
    const identifiant = req.params.identifiant;
    
    if(!req.body){
        return res.status(400)
    }
    else{
        Accounts.findOneAndUpdate({identifiant:identifiant}, req.body)
        .then(data => {
             res.send(data)
             
        })
        .catch(err =>{ res.sendStatus(500) })} 
      
       
    
})





module.exports=router;

