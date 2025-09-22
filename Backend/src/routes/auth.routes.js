const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const router=express.Router();


router.post("/register",(req,res)=>{
    const{username,password}=req.body;
    const existingUser = userModel.findOne({username});

    if(existingUser){
        return res.status(400).json({message:"Username already exists"});
    }

    const user = userModel.create({
        username,
        password
    })

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)

    res.cookie("token",token);

    res.status(201).json({
        message:"user registered successfully",
        user
    })
})


module.exports=router;