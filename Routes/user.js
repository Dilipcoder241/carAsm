const express = require("express");
const router = express.Router();
const userModel = require("../Models/user"); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const carModel = require("../Models/car");


router.get("/register" , (req,res)=>{
    res.render('userSignup' , {msg:null});
})
router.post("/register" , async (req,res)=>{
    const {username , email , password} = req.body;
    const existUser = await userModel.findOne({$or:[{username , email}]});
    
    if(!existUser){
        const user = await userModel({
            username, email
        })
        const encPass = await bcrypt.hash(password , 10);
        user.password = encPass;
        await user.save();
        res.redirect(303 , "/");
    }
    else{
        let data = {msg :"user with this username or email already exist!"}
        res.render('userSignup' , data);
    }
})


router.get('/' , (req,res)=>{
    res.render("userLogin" , {msg:null});
})

router.post("/" , async (req,res)=>{
    const {email , password} = req.body;
    const user = await userModel.findOne({email});
    if(user) {
        const Pass = await bcrypt.compare(password , user?.password);
        if(Pass){
            res.redirect('/cars');
        }
        else {
            res.render('userLogin' , {msg:"Email or Password is Incorrect"});
        }
    }
    else {
        res.render('userLogin' , {msg:"User with this Email not Exist Plaese Register"});
    }
})


router.get("/cars" , async (req,res)=>{
    const cars = await carModel.find();
    res.render('user', {cars});
})

module.exports = router;