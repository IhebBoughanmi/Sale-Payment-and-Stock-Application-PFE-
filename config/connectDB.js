//connecting mongoose to a data base
const mongoose = require("mongoose"); //requiring mongoose lib

const connectDB=()=>{
    console.log("connect");
    //connecting to my cloud mongodb serveur 
    mongoose.connect("mongodb+srv://iheb:P09pwcfUzv0ebUaH@cluster0.kksvv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useNewUrlParser: true ,useUnifiedTopology: true })
   // if connected "mongoose connected" /else err function
    .then(()=> console.log("mongoose connected"))
    .catch(err => console.log(err))
    
}
//exporting the file 
module.exports = connectDB
