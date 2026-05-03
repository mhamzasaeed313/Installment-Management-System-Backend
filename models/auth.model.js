const mongoose = require ('mongoose');
const User = new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:25,
    },
    fatherName:{
        type:String,
        minlength:3,
        maxlength:25
    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        
    },
    
},
    {
        timestamps:true
    }
)
module.exports =mongoose.model("user",User)