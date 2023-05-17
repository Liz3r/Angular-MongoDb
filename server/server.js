const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product.schema");
const User = require('./models/user.schema');

const uri = "mongodb+srv://admin:1234@cluster0.uhqga0j.mongodb.net/?retryWrites=true&w=majority";
port = 5123;
const url = `http://localhost:${port}/`;

app.use(express.json());




app.post("/user", async (req,res)=>{
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


mongoose.connect(uri)
.then(() => {
    console.log("connected to mongoDB");
    app.listen(port,()=>{
        console.log(`listening on: ${url}`);
    })
}).catch((err)=>{
    console.log(err);
});
