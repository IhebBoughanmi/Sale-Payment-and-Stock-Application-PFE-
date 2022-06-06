const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const Schema = mongoose.Schema

const acquitSchema=new Schema({
    Numfac: {
        type : String
    },
    Codeclient :{
        type : String
    },
    devise:{
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
    masleknakel:{
        type:String
    },
  
    moyentransport:{
        type:String,
    },
    datesortie:{
        type:Date,
    },
    datefin:{
        type:Date,
    }
    , dateacquit:{
        type:Date,
    }
    
    ,
    Infoarticlescommander:{
        type:Array
    },
    email:{
        type:String,
    },
    Modepaiement:{
        type : String
    },
    PrixTOT:{
        type :String
    },
    })

module.exports=acquit=mongoose.model("acquit",acquitSchema); 
