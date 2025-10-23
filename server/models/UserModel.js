const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true, minlenght: 3, maxlength: 30},
    email: {
        type: String, 
        required: true, 
        minlenght: 3, 
        maxlength: 30,
        unique: true
    },
    password: {type: String, required: true, minlenght: 3, maxlength: 1024}
},{timestamps: true});

module.exports = mongoose.model("User", UserSchema);