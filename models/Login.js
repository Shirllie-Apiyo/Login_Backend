// step 1: create a model to be used in saving Login
// frontend - backend
// contact us form, names, phone,message
let mongoose =require("mongoose")
let validator = require ("validator")
// import {isEmail} from 'validator'
let schema =mongoose.Schema({
    first_name:{type:String, required:[true, "Enter your first name"]},
    last_name:{type:String, required:[true, "Enter your last name"]},
    phone:{type:String, required:[true, "Enter your phone"],
        minlength:[13, "Must be 13 characters"],maxlength:[13,"maximum 13 characters"]},
    message:{type:String, required:[true, "Enter your Message"],
        maxlength:[250, "maximum of 250 words"]},
    email:{type:String, required:[true, "Enter your Email "],
        validate: [validator.isEmail, 'Please enter a valid email']
    },
},
{
    collection:'logins'
});
module.exports = mongoose.model("Login", schema)