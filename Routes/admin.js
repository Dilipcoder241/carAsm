const express = require("express");
const router = express.Router();
const userModel = require("../Models/user");
const bcrypt = require("bcrypt");
const carModel = require("../Models/car");

router.get("/" , (req,res)=>{
    res.render("adminLogin" , {msg:null});
})

router.post('/', async (req,res)=>{
    const {username , password} = req.body;
    const user = await userModel.findOne({username});
    if(user) {
        const Pass = await bcrypt.compare(password , user?.password);
        if(Pass){
            if(user.isAdmin){
                res.redirect('/admin/dashboard');
            }
            else{
            res.render('adminLogin' , {msg:"Please Enter Admin Credentials"});
            }
        }
        else {
            res.render('adminLogin' , {msg:"Username or Password is Incorrect"});
        }
    }
    else {
        res.render('adminLogin' , {msg:"Admin with this Email not Exist"});
    }
})

router.get("/dashboard" , async (req,res)=>{
    const cars = await carModel.find();
    res.render("dashboard" , {cars , URL:process.env.URL});
})

router.get("/create" , (req,res)=>{
    res.render("createCar");
})
router.post("/create" , async (req,res)=>{
    const {carname , ManufacturedYear , price , link} = req.body;

    await carModel.create({
        carName:carname,
        manufacturedYear:ManufacturedYear,
        price:price,
        imgsrc:link
    })

    res.redirect('/admin/dashboard');

})


router.get('/update/:id' , async(req,res)=>{
    const car = await carModel.findOne({_id:req.params.id})

    if(car){
        res.render('updateCar' , {car});
    }

})

router.post('/update/:id' , async(req,res)=>{
    const {carname , ManufacturedYear , price , link} = req.body;

    const car = await carModel.findOneAndUpdate({_id:req.params.id} , {
        carName:carname,
        manufacturedYear:ManufacturedYear,
        price:price,
        imgsrc:link
    })

    if(car){
        res.redirect("/admin/dashboard");
    }
})


router.post("/delete/:id" , async(req,res)=>{
    const car = await carModel.findOneAndDelete({_id:req.params.id});
    
    if(car){
        res.redirect('/admin/dashboard');
    }
})



module.exports = router;