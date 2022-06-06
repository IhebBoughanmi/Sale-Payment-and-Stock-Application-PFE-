const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const Schema = mongoose.Schema

const facturationSchema=new Schema({
    Numcomm: {
        type : String
    },
    Codeclient :{
        type : String
    },
    Modepaiement:{
        type : String
    },
    Modelivraison:{
        type : String
    },
    Lieulivraison: {
        type : String
    },
    Nbrfut:{
        type:String
    },
    Vol:{
        type:String
    },
    Datecomm:{
        type:String
    },
    Infoarticlescommander:{
        type:Array
    },
    PrixHT:{
        type:Number
    },
    Remise:{
        type:Number,
    },
    PrixTOT:{
        type:Number
    },
    etat:{
        type:String,
    },
    Datevalidationcomm:{
        type:Date,
    },
    Datepaiement:{
        type:String,
    },
    acquit:{
        type:String,
    },
    bonsorite:{
        type:String,
    },
    email:{
        type:String,
    },
    nomprenom:{
        type:String
    }
    })

module.exports=facturation=mongoose.model("facturation",facturationSchema); 
