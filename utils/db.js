const mongoose = require("mongoose")

const URL = "mongodb+srv://root:chauhan@cluster0.12kvb.mongodb.net/logindb?retryWrites=true&w=majority" 
mongoose.connect(URL)
.then(() =>{
    console.log("Connected - DB");
})
.catch((err) =>{
    console.log(err.message);
})