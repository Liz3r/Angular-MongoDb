const router = require('express').Router();
const bcrypt = require('bcrypt')
const Product = require("../models/product.schema");
const User = require('../models/user.schema');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cookieParser = require("cookie-parser");
const ObjectId = require('mongodb');
const { default: mongoose } = require('mongoose');


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

router.get("/getFollowedItems", verifyToken, async (req,res) => {
    const userId = req.userId;

    try {
        
        const user = await User.findById(userId).select('following').populate('following').exec();

        if(user.matchedCount == 0){
            res.status(404).send({message: 'user not found'});
        }

        const items = user.following.map(prod => { return {...prod._doc, dateMessage: generateDateMessage(prod.datePosted)} });
        res.status(200).send(items);

    } catch (error) {
        res.status(500).send({message: error.message});
    }
})

router.get("/getFollowedItemsSearch/:search?", verifyToken, async (req,res) => {
    const userId = req.userId;
    const searchInput = req.params.search;

    try {
        var user;
        var itemList;

        if(searchInput && searchInput != ''){
            const regexp = new RegExp(searchInput);
            //user = await User.findById(userId).select('following').populate('following');
            
            itemList = (await User.aggregate([
                {$match: {_id: new mongoose.Types.ObjectId(userId)}}, //prvi pipeline pribavlja korisnika pomocu id-ja
                {$lookup: { from: 'products', localField: 'following', foreignField: '_id', as: 'following'}}, //populate po id-u poduct-a u listu following korisnika
                {$unwind: '$following'}, //unwinduju se proizvodi da bi se radila pretraga
                {$match: {'following.title': {$regex: searchInput}}}, //pretraga
                {$project: {'following': 1}} // prikazuje se samo atribut following (i _id)
            ]))
            .map(usr => usr.following);

            //console.log(itemList);
        }
        else{
            itemList = (await User.aggregate([
                {$match: {_id: new mongoose.Types.ObjectId(userId)}},
                {$lookup: { from: 'products', localField: 'following', foreignField: '_id', as: 'following'}},
                {$unwind: '$following'},
                {$project: {'following': 1}} 
            ]))
            .map(usr => usr.following);
            
        }
            

        const items = itemList.map(prod => { return {...prod, dateMessage: generateDateMessage(prod.datePosted)} });
        // console.log(items);
        

        res.status(200).send(items);

    } catch (error) {
        res.status(500).send({message: error.message});
    }
})

router.get("/searchItemsByUser", verifyToken, async (req,res) => {
    const userId = req.userId;
    const searchInput = req.searchInput;

    try {
        
        const regexp = new RegExp(searchInput,"i"); //i - da bi izraz bio case insensitive

        const items = await Product.find({owner: userId, title: regexp});

        if(items.matchedCount == 0){
            res.status(404).send({message: 'no items found'});
        }

        res.status(200).send(items);

    } catch (error) {
        res.status(500).send({message: error.message});
    }
})

router.put("/follow", verifyToken, async (req,res) => {
    const userId = req.userId;
    const itemId = req.body.itemId;

    try {
        const user = await User.updateOne({_id: userId}, { $push: { following: itemId }});
        
        if(user.matchedCount == 0){
            res.status(404).send({
                message: 'user not found'
            });
            return;
        }
    
        res.status(200).send({message: 'success'});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})


function generateDateMessage(datePosted){

    const diff = Math.abs(new Date() - datePosted);

    if(diff < 60*1000) //jedan minut
        return 'Just now';
        
    if(diff < 60*60*1000){ //jedan sat
        let num = Math.floor(diff/(60*1000));
        return (num == 1)? num + ' minute ago' : num + ' minutes ago';
    }

    if(diff < 24*60*60*1000){ //jedan dan
        let num = Math.floor(diff/(60*60*1000));
        return (num == 1)? num + ' hour ago' : num + ' hours ago';
    }

    let num = Math.floor(diff/(24*60*60*1000));
    return (num == 1)? num + ' day ago' : num + ' days ago';
}

router.get("/getItemDetails/:itemId", verifyToken, async (req,res) => {
    const userId = req.userId;
    const itemId = req.params.itemId;

    try {
        const item = await Product.findById(itemId).populate('owner');
    
    
        if(item.matchedCount == 0){
            res.status(404).send({message: 'item not found'});
            return;
        }
    
        const user = await User.findById(userId).select('following -_id');
    
        //da li korisnik prati ovaj oglas (ili ako je vlasnik onemoguciti pracenje)
        const following = user.following.includes(itemId) || item.owner._id == userId;
        
        const dateMessage = generateDateMessage(item.datePosted);
    
        const retObject = {
            title: item.title,
            description: item.description,
            datePosted: item.datePosted,
            price: item.price,
            currency: item.currency,
            state: item.state,
            picture: item.picture,
    
            dateMessage: dateMessage,
    
            userName: item.owner.name,
            userSurname: item.owner.surname,
            userEmail: item.owner.email,
            userCity: item.owner.city,
            userAddress: item.owner.address,
            userPhone: item.owner.phoneNumber,
            following: following
        };
    
        res.status(200).send(retObject);
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

router.get("/getItems", verifyToken, async (req,res) => {

    try {
        const products = await Product.find({});
    
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

router.get("/getItemsByUser", verifyToken, async (req,res) => {
    const userId = req.userId;

    try {
        const products = await Product.find({owner: userId});
        
        const retProducts = products.map(prod => { return {...prod._doc, dateMessage: generateDateMessage(prod.datePosted)} });

        res.status(200).send(retProducts);
    } catch (error) {
        res.status(500).send({message: error.message})
    }
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
        req.body.city === '' ||
        req.body.phoneNumber == null){
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

        const userUpdate = await User.updateOne({_id: userId}, { $set: setObject });
        if(userUpdate.matchedCount == 0){
            res.status(404).send({message: 'Profile update failed: user not found'})
        }
    
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
    
        const userUpdate = await User.updateOne({_id: userId},{ $set: { password: hPassword}});
        if(userUpdate.matchedCount == 0){
            res.status(404).send({message: 'Password update failed: user not found'})
        }
    
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