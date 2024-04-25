import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import validator from "validator"

const loginUser= async(req,res)=>{
  // Implement login functionality
  const {email, password}= req.body;
  
    try {
        const user= await userModel.findOne ({email});
        if(!user){
            return res.json({success:false, message:"User not exists"})
        }
        const isMatch= await bcryptjs.compare(password, user.password)
        if(!isMatch){
            return res.json({success:false, message:"Invalid Credential"})
        }
        const token= createToken(user._id);
        res.json({success:true, token})


    }catch(error){
        console.log(error);
        return res.json({success:false, message:error})
    }


}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser= async(req,res)=>{
    const {name, password, email}= req.body;
    try {
        const exists= await userModel.findOne ({email});
        if(exists){
            return res.json({success:false, message:"User already exists"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Enter a valid email"})
        }
        if(password.length < 8){
            return res.json({success:false, message:"Enter a strong password (at least 8 characters)"})
        }
        const salt= await bcryptjs.genSalt(10)
        const hashedPassword= await bcryptjs.hash(password,salt);

        const newUser= new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user= await newUser.save()
        const token= createToken(user._id)
        res.json({success:true, token});
    } catch(error) {
       console.log(error);
       res.json({success:false, message:"Error creating user"})
    }
}

export {loginUser, registerUser}
