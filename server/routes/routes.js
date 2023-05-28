const router = require('express').Router();
const bcrypt = require('bcrypt')
const Product = require("../models/product.schema");
const User = require('../models/user.schema');


router.post("/user", async (req,res)=>{
    try {
        const salt = bcrypt.genSalt(10);
        const hPassword = bcrypt.hash(req.body.hashPassword,salt);

        
        const user = await User.create({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            hashPassword: hPassword,
            address: req.body.address
        });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = router;