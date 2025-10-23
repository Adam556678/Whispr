const userModel = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const UserModel = require("../models/UserModel.js");

const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    const user = await UserModel.findOne({email});
    if (user) return res.status(400).json({message: "User with the given email already exists"});

    if (!email || !password || !name) return res.status(400).json({message: "All fields are required"});
};

module.exports = {registerUser};