const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const Schema = mongoose.Schema

const bonsortieSchema=new Schema({
    Numfac: {
        type : String
    },
    Numcomm: {
        type : String
    },
    Datefac: {
        type : String
    },
    Datecomm: {
        type : String
    },
    Codeclient :{
        type : String
    },
    vehicule:{
        type : String
    },
   nomprenom:{
        type : String
    },
    lieu: {
        type : String
    },
    Nbrfut:{
        type:String
    },
    Vol:{
        type:String
    },
  
    Infoarticlescommander:{
        type:Array
    },
    moyentransport:{
        type:String,
    },
   
    datebonsortie:{
        type:Date,
    }
   , numacquit:{
        type:String,
    }
    
    
    })

module.exports=bonsortie=mongoose.model("bonsortie",bonsortieSchema); 
