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
            ...(req.file) && {picture: `${envUrl}/uploads/${req.file.filename}`}
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

router.get("/auth",verifyToken, async (req,res) => {
    res.status(200).send({message: 'authentificated'});
})


router.post("/logout", verifyToken, async (req,res)=>{
    
    res.cookie('jwt','',{ maxAge: 0});
    res.status(200).send({
        message: 'success'
    })

})

module.exports = router;