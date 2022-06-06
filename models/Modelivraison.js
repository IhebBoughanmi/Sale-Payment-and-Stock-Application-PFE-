const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const Schema = mongoose.Schema

const ModedelivraisonSchema =new Schema({
    Codemodedelivraison :{
        type : String
    },
    Modedelivraison : {
        type : String
    }
    })
    
    module.exports=Modelivraison=mongoose.model("Modedelivraison",ModedelivraisonSchema); 
    