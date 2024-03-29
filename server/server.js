const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product.schema");
const User = require('./models/user.schema');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes.js');

const uri = "mongodb+srv://admin:1234@cluster0.uhqga0j.mongodb.net/?retryWrites=true&w=majority";
port = 5123;
const url = `http://localhost:${port}/`;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}));
app.use("/",userRoutes);
app.use('/',productRoutes);

app.use('/uploads',express.static('uploads'));



mongoose.connect(uri)
.then(() => {
    console.log("connected to mongoDB");
    app.listen(port,()=>{
        console.log(`listening on: ${url}`);
    })
}).catch((err)=>{
    console.log(err);
});
