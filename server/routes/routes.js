const router = require('express').Router();
const bcrypt = require('bcrypt')
const Product = require("../models/product.schema");
const User = require('../models/user.schema');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cookieParser = require("cookie-parser");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) =>{
        cb(null, req.userId + file.originalname + file.fieldname);
    }
})

const tipoviFilter = (req, file, cb) => {
    const tipovi = ["image/png", "image/jpeg", "image/jpg"];
    if(file && tipovi.includes(file.mimetype)){
        return cb(null, true);
    }
    return cb(null, false);
}

const upload = multer({storage: storage, filter: tipoviFilter});


//--------------------------------------------------------------------------------------

router.get("/getItemDetails", verifyToken, async (req,res) => {

})

router.get("/getItems", verifyToken, async (req,res) => {

    const products = await Product.find({});

//     const ret = products.map(prod => {
//         const mappedProd = {
//         title: prod.title,
//         description: prod.description,
//         datePosted: prod.datePosted,
//         price: prod.price,
//         currency: prod.currency,
//         state: prod.state,
//         phoneNumber: prod.phoneNumber,
//         picture: prod.picture
//     };
//     return mappedProd;
// });

    console.log(products[0]);

    res.status(200).send(products);
})



//--------------------------------------------------------------------------------------

function isNumber(str){

    const numExp = /[0-9]+/;
    const isMatch = str.match(numExp);
    if(typeof(str) === 'string' && isMatch && isMatch[0] === str)
        return true;
    return false;
}

router.put("/postItem", verifyToken, upload.single('itemPicture'), async (req,res) => {
    const userId = req.userId;

    try {

        if(!isNumber(req.body.price)){
            res.status(400).send({message: 'Invalid input: price is not a number'});
            return;
        }

        const product = new Product({
            title: req.body.title,
            description: req.body.description,
            datePosted: new Date(),
            price: Number(req.body.price),
            currency: req.body.currency,
            state: req.body.state,
            picture: `http://localhost:5123/uploads/${req.file.filename}`,
            owner: userId
        });

        product.save();

        res.status(200).send({message: 'success'});
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})


router.post("/updateUserProfile", verifyToken, upload.single('picture'), async (req,res) => {
    const userId = req.userId;


    try {
        if(req.body.email === '' || 
        req.body.name === '' ||
        req.body.surname === '' ||
        req.body.address === '' ||
        req.body.city){
            res.status(400).send({message: 'Invalid input'});
            return;
        }
        
        const user = await User.findById(userId);
        if(!user){
            res.status(404).send({message: 'User not found'});
            return;
        }

        const newEmail = req.body.email;
        const emailExists = await User.findOne({email: newEmail});
        if(user.email != newEmail && emailExists){
            res.status(409).send('Email already taken');
            return;
        }
        if(!isNumber(req.body.phoneNumber)){
            res.status(400).send({message: 'Invalid input: Phone number type is not a number'});
            return;
        }
    
        const setObject = {name: req.body.name,
            surname: req.body.surname,
            email: newEmail,
            address: req.body.address,
            city: req.body.city,
            phoneNumber: Number(req.body.phoneNumber),
            ...(req.file) && {picture: `http://localhost:5123/uploads/${req.file.filename}`}
        };

        await User.updateOne({_id: userId}, { $set: setObject });
        
    
        res.status(200).send({message: 'success'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }

})

router.get("/getUserProfile", verifyToken, async (req,res) => {
    const userId = req.userId;

    try {
        //pribavljaju se samo potrebna polja korisnika za zadatim userId
        const user = await User.findById(userId, { _id: 0, name: 1, surname: 1, email: 1, picture: 1, address: 1, city: 1, phoneNumber: 1});
    
        if(!user){
            res.status(404).send({message: 'User not found'});
            return;
        }
    
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({message: error});
    }
})

router.post("/changePassword", verifyToken, async (req,res) => {
    const userId = req.userId;
    
    try {
        const user = await User.findById(userId);
    
        if(!user){
            res.status(404).send({
                message: 'user not found'
            });
            return;
        }

        if(!req.body.newPassword || req.body.newPassword.length < 5){
            res.status(400).send({message: 'Password too short'});
            return;
        }
    
        if(!await bcrypt.compare(req.body.password, user.password)){
            res.status(401).send({
                message: 'invalid credentials'
            });
            return;
        }
    
        const salt = await bcrypt.genSalt(10);
        const hPassword = await bcrypt.hash(req.body.newPassword,salt);
    
        await User.updateOne({_id: userId},{ $set: { password: hPassword}});
    
        res.status(200).send({message: 'Password updated'});

    } catch (error) {
        res.status(500).send({message: error});
    }
})

router.post("/register", async (req,res)=>{
    try {

        if(await User.findOne({email: req.body.email})){
            return res.status(200).send({
                taken: true,
                message: "user with that email already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hPassword = await bcrypt.hash(req.body.password,salt);

        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hPassword,
            address: req.body.address,
            city: null,
            phoneNumber: null,
            picture: null
        });

        user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post("/login", async (req,res)=>{

    try{
        const user = await User.findOne({email: req.body.email});

        if(!user){
            return res.status(404).send({
                message: 'user not found'
            });
        }

        if(!await bcrypt.compare(req.body.password, user.password)){
            return res.status(401).send({
                message: 'invalid password'
            })
        }

        const token = jwt.sign({userId: user._id},"secret");
        
        res.cookie("jwt",token,{
            httpOnly: false,
            maxAge: 60*60*1000
        })
        res.status(200).send({
            message: 'success'
        });
    }catch(error){
        res.status(500).send({message: error.message});
    }
})


router.post("/logout", verifyToken, async (req,res)=>{
    
    res.cookie('jwt','',{ maxAge: 0});
    res.status(200).send({
        message: 'success'
    })

})


function verifyToken(req, res, next) {

    const token = req.cookies['jwt'];
    if (!token) return res.status(401).send({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, 'secret');
        req.userId = decoded.userId;
        next();
    }catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
};




module.exports = router;