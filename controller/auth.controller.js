const userSchema = require('../models/auth.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async(req,res)=>{
    try{       
        const {name,fatherName,username,password} = req.body;
        const exist = await userSchema.findOne({username: username.toLowerCase()});
        if(exist) 
            return res.status(409).json({
                message:'username already happen'
            });
        if (!name || !fatherName || !username || !password ) {
            return res.status(400).json({message:"All fields required"})
        }
       
        const hashed_password = await bcrypt.hash(password,10);
        const user = new userSchema({
            name,
            fatherName,
            username: username.toLowerCase(),
            password:hashed_password
        });
        await user.save();
        res.status(201).json({
            success: true,
            message:'User Register Successfully'
        });    
    }
    catch(error){
        res.status(500).json({
            success: false,
            message:'user Registration Error',
            error:error.message
        });
    }
}

exports.login = async (req,res)=>{
    try{
    const {username,password} = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }
    const user = await userSchema.findOne({username:username.toLowerCase()});
    if (!user){
        return res.status(400).json({
            message:'User Not Found'
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({
            message:'Invalid credentials'
        });
    }
    const accessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

    res.status(200).json({
        success: true,
        accessToken,
        user:{
            id:user._id,
            username: user.username,
        }
    })
}catch(error){
    res.status(500).json({
        success: false,
        message:'LogIn Failed'
    })
}
}

exports.logout = async (req,res)=>{
    try {

        res.status(200).json({
            success:true,
            message:"User logout successfully"
        });

    } catch(error){
        res.status(500).json({
            success:false,
            message:"Logout Failed",
            error:error.message
        })
    }
}