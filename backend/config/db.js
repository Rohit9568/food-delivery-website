import mongoose, { connect } from "mongoose"
 export const connectDB= async()=>{
    await mongoose.connect('mongodb+srv://jainrishi:Rishi@cluster0.bls83yj.mongodb.net/food-del').then(()=>console.log("DB connected"));
    
 }