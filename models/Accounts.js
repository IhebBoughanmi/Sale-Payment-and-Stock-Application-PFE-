const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { boolean } = require("joi");
const Schema = mongoose.Schema

//defining the strcture of the data base with the schema 
const AccountsSchema =new Schema({
societe :{
    type : String
},
nom : {
    type : String
},
prenom : {
    type : String
},
mail : {
    type : String
},
mailtoken : {
    type : String
},
isverified: {
    type : String
},
identifiant :{
    type: String
},
password:{
    type : String
},
usine:{
    type : String
},
compagne:{
    type : String
},
acctype : {
    type : String
},codemail : {
    type : Number
},
date: {
    type : String
},month: {
    type : String
},year: {
    type : String
},day: {
    type : String
},monthname: {
    type : String
}
});
AccountsSchema .methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};



module.exports=Accounts=mongoose.model("Accounts",AccountsSchema); 
// accounts is the name that we will see in the db also we are passing our schema to the db using the model function