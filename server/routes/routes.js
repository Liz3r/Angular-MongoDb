const router = require('express').Router();
const bcrypt = require('bcrypt')
const Product = require("../models/product.schema");
const User = require('../models/user.schema');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cookieParser = require("cookie-parser");


const upload = multer({ dest: 'uploads/' });


router.post("/updateUserProfile", verifyToken, (req,res) => {
    const userId = req.userId;


})

router.get("/getUserProfile", verifyToken, async (req,res) => {
    const userId = req.userId;

    const user = await User.findById(userId);

    res.status(200).send(user);
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
            return res.status(401).send({
                message: 'invalid credentials'
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




// router.get("/user", async (req,res)=>{
//     try{
//         const cookie = req.cookies["jwt"];
//         const claims = jwt.verify(cookie,"secret")

//         if(!claims){
//             return res.status(401).send({
//                 message: 'unauthenticated'
//             })
//         }

//         const user = await User.findOne({_id: claims._id});
//         const { password, ...data} = user.toJSON();

//         res.send(data);
//     }catch(err){
//         return res.status(401).send({
//             message: 'unauthenticated'
//         })
//     }
// })

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