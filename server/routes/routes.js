const router = require('express').Router();
const bcrypt = require('bcrypt')
const Product = require("../models/product.schema");
const User = require('../models/user.schema');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

//check if client already has active token
router.get("/checkToken", async (req,res) => {
    try{
        const cookie = req.cookies["jwt"];
        if(!cookie)
            return res.status(200).send({hasToken: false});
        const claims = jwt.verify(cookie,"secret");
        if(!claims){
            return res.status(200).send({hasToken: false});
        }
        res.send({hasToken: true});

    }catch(err){
        res.status(500).json({message: err.message});
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
            address: req.body.address
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
    }catch(error){
        res.status(500).send({message: error.message});
    }
})


router.get("/user", async (req,res)=>{
    try{
        const cookie = req.cookies["jwt"];
        const claims = jwt.verify(cookie,"secret")

        if(!claims){
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }

        const user = await User.findOne({_id: claims._id});
        const { password, ...data} = user.toJSON();

        res.send(data);
    }catch(err){
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }
})

router.post("/logout",(req,res)=>{
    res.cookie('jwt','',{ maxAge: 0});
    res.send({
        message: 'success'
    })
})




module.exports = router;