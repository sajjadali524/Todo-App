const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel");

const router = express.Router();

router.post("/register", async(req, res) => {
    const {name, email, password} = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    try {
        const existingUser = await User.findOne({email})
        if(existingUser) {
            res.status(400).json({message: "user already exist"})
        }else {
            const newUser = await User.create({name, email, password: hashPassword})
            res.status(200).json({message: "user register success"})
        }
    } catch (error) {
        res.status(500).json("Internal server error")
    }
})

router.post("/login", async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user) {
            res.status(400).json({message: "user does not exist"})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            res.status(400).json({message: "invalid email and password"})
        }
            const token = jwt.sign({userId: user._id}, process.env.SECRET_TOKEN, {expiresIn: "1d"})
            res.cookie("token", token, {expiresIn: "1d"}).status(200).json({token});
            
    } catch (error) {
        res.status(500).json({message: "Internal server error"})

    }
})
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).send("Logged out successfully");
});

module.exports = router;