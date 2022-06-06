const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const Schema = mongoose.Schema

const CommandeSchema=new Schema({

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
email:{
    type:String,
},
nomprenom:{
    type:String
}

})

module.exports=Commande=mongoose.model("Commande",CommandeSchema);