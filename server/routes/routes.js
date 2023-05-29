const router = require('express').Router();
const bcrypt = require('bcrypt')
const Product = require("../models/product.schema");
const User = require('../models/user.schema');
const jwt = require('jsonwebtoken');


router.post("/user", async (req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        
        const hPassword = await bcrypt.hash(req.body.hashPassword,salt);

        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            hashPassword: hPassword,
            address: req.body.address
        });

        user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post("/login", async (req,res)=>{
    const user = await User.findOne({email: req.body.email});

    if(!User){
        return res.status(404).send({
            message: 'user not found'
        })
    }

    if(!await bcrypt.compare(req.body.hashPassword, user.hashPassword)){
        return res.status(404).send({
            message: 'invalid credentials'
        })
    }

    const token = jwt.sign({_id: user._id},"secret");

    res.cookie("jwt",token,{
        httpOnly: true,
        maxAge: 60*60*1000
    })
    res.send({
        message: 'success'
    });
})

module.exports = router;