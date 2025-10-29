const userModel = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const UserModel = require("../models/UserModel.js");

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET;

    return jwt.sign({_id}, jwtkey, {expiresIn: "3d"});
};

const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        let user = await UserModel.findOne({email});
        if (user) return res.status(400).json({message: "User with the given email already exists"});
    
        if (!email || !password || !name) 
            return res.status(400).json({message: "All fields are required"});
    
        if (!validator.isEmail(email)) 
            return res.status(400).json({message: "Email must be a valid email"});
        
        if (!validator.isStrongPassword(password))
            return res.status(400).json({message: "Password must be a strong password"});
    
        user = new UserModel({name, email, password});
    
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    
        await user.save();
    
        const token = createToken(user._id);
        
        res.status(201).json({_id: user._id, name, email, token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        let user = await UserModel.findOne({email});
        if (!user) return res.status(400).json("Invalid Credentials");
        
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(400).json("Invalid Credentials");
        
        const token = createToken(user._id);
        
        res.status(200).json({_id: user._id, name: user.name, email, token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }
};

const findUser = async (req, res) => {
    const {userId} = req.params
    
    try {
        const user = await UserModel.findById(userId);
        if (!user)
            return res.status(404).json({message: "User not found"});
        
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }
};

const getAllUsers = async (req, res) => {    
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }
};

module.exports = {registerUser, loginUser, findUser, getAllUsers};