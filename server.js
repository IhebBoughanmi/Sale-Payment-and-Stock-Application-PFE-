const express = require("express"); //Microframework nodejs for backend
const cors = require('cors'); //navigation
const app = express();
const connectDB=require("./config/connectDB");
const passport = require("passport")
const Accounts=require("./models/Accounts")



//midlleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

//passport configuration
require('./middlewares/passport.js')(passport);

// connect to db
connectDB();

//routes
app.use("/article",require("./routes/article"));
app.use("/user",require("./routes/accounts.js"));
app.use("/commande",require("./routes/commande.js"));
app.use("/modedepaiement",require("./routes/modepaiement.js"));
app.use("/modedelivraison",require("./routes/modelivaion.js"));
app.use("/facturation",require("./routes/facturation.js"));
app.use("/cmdpayer",require("./routes/cmdfacturer.js"));
app.use("/acquit",require("./routes/acquits.js"));
app.use("/vente",require("./routes/bivente.js"));
app.use("/reglement",require("./routes/bireglement.js"));
app.use("/depot",require("./routes/bidepot.js"));



function verifyToken(req , res ,next){
    //get auth header value
    const bearerHeader = req.headers["authorization"];
    //verify if bearer is undefined
    if (typeof bearerHeader !== 'undefined'){
        // split at the space
        const bearer = bearerHeader.split('')
        // get token from the array
        const bearerToken = bearer[1]
        //set the token
        req.token = bearerToken
        //next 
        next();

    }
    else {
        //forbidden
        res.sendStatus(403);
    }
}
//run server  
const PORT = process.env.PORT||5000
app.listen(PORT,err => err?console.log("err"):console.log(`connected to port ${PORT}`));