const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)

const userSchema = new mongoose.Schema({
    name:{
        type:String , 
        required:true,
        trim:true
    }, 
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String , 
        required:true
    }, 
    role:{
        type:String,
        enum:['Customer' , 'Seller' , 'Admin'],
        default:'Customer'
    }, 
},{
    timestamps:true
}) 

userSchema.pre('save' , async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
    next();
});
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}

const User = mongoose.model('User' , userSchema)

module.exports = User