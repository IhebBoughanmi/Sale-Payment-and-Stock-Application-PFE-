const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const Schema = mongoose.Schema

const ModedepaiementSchema =new Schema({
    Codemodedepaiement :{
        type : String
    },
    Modedepaiement : {
        type : String
    }
    })
    
    module.exports=Modepaiement=mongoose.model("Modedepaiement",ModedepaiementSchema); 
    