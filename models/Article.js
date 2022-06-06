const { binary } = require("joi");
const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const Schema = mongoose.Schema

const ArticleSchema =new Schema({
CodeArticle :{
    type : String
},
Designation : {
    type : String
},
Prix :{
    type : String
},
Date :{
    type : Date
},
VC : {
    type : String
},
DegreEnfencement : {
    type : String
},
Temperature : {
    type : String
},
TAV : {
    type : String
},
Densite : {
    type : String
},
Coef : {
    type : String
},
Quantite :{
    type :Number
}
,
Description :{
    type : String
}
,
image:{
    type: String,
}
})

module.exports=Article=mongoose.model("Article",ArticleSchema); 
