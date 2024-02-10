const router = require('express').Router();
const bcrypt = require('bcrypt');
const Product = require("../models/product.schema");
const User = require('../models/user.schema');
const { default: mongoose, mongo } = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const generateDateMessage = require('../helpers/generateDateMessage.js');
const upload = require('../helpers/multerFunction.js');
const verifyToken = require('../helpers/verifyToken.js');
const envUrl = "http://localhost:5123";
const isNumber = require('../helpers/isNumberFunction.js');


router.delete("/deleteItem/:itemId", verifyToken, async (req,res) => {
    
    const itemId = req.params.itemId;

    try {
        const itemIdObject = new mongoose.mongo.ObjectId(itemId);
        //brise sve following veze 
        const users = await User.updateMany({following: itemIdObject},{ $pull: {following: itemIdObject}});

        const item = await Product.findById(itemId,{picture: 1});

        await fs.rm(item.picture, () => {console.log('picture removed')});
        const del = await Product.deleteOne({_id: itemIdObject});

        if(!del.acknowledged){
            res.status(400).send({message: `0 items deleted, ${users.modifiedCount} followings removed`});
        }
        res.status(200).send({message: `1 item deleted, ${users.modifiedCount} followings removed`});
    } catch (error) {
        res.status(500).send({message: error.message})
    }

})

router.get("/searchAllItems/:search?", verifyToken, async (req,res) => {
    try {
        
        const searchInput = req.params.search;
        var itemList;
        if(searchInput && searchInput != ''){
            itemList = (await Product.find({$text: { $search: searchInput, $caseSensitive: false}})); //indeksiranje postoji samo za polje 'title' 
        }
        else{
            itemList = (await Product.find({}));
        }
            
        const items = itemList.map(prod => { return {...prod._doc, dateMessage: generateDateMessage(prod.datePosted)} });
    
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})

router.get("/getFollowedItemsSearch/:search?", verifyToken, async (req,res) => {
    const userId = req.userId;
    const searchInput = req.params.search;

    try {
        var itemList;

        if(searchInput && searchInput != ''){
            
            itemList = (await User.aggregate([
                {$match: {_id: new mongoose.Types.ObjectId(userId)}}, //prvi pipeline pribavlja korisnika pomocu id-ja
                {$lookup: { from: 'products', localField: 'following', foreignField: '_id', as: 'following'}}, //populate po id-u poduct-a u listu following korisnika
                {$unwind: '$following'}, //unwinduju se proizvodi da bi se radila pretraga
                {$match: {'following.title': {$regex: searchInput}}}, //pretraga
                {$project: {'following': 1}} // prikazuje se samo atribut following (i _id)
            ]))
            .map(usr => usr.following);
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
    
        res.status(200).send(items);

    } catch (error) {
        res.status(500).send({message: error.message});
    }
})

router.get("/searchItemsByUser/:search?", verifyToken, async (req,res) => {
    const userId = req.userId;
    const searchInput = req.params.search;

    try {
        console.log(searchInput);
        if(searchInput && searchInput != ''){
        
            const regexp = new RegExp(searchInput,"i");
            const items = await Product.find({owner: new mongoose.mongo.ObjectId(userId), title: regexp});

            if(items.matchedCount == 0){
                res.status(404).send({message: 'no items found'});
            }
            res.status(200).send(items);
        }else{

            const products = await Product.find({owner: new mongoose.mongo.ObjectId(userId)});
        
            const retProducts = products.map(prod => { return {...prod._doc, dateMessage: generateDateMessage(prod.datePosted)} });

            console.log(retProducts);
            res.status(200).send(retProducts);
        }

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
            picture: `${envUrl}/uploads/${req.file.filename}`,
            owner: userId
        });

        product.save();

        res.status(200).send({message: 'success'});
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

module.exports = router;