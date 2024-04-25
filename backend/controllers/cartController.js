import userModel from "../models/userModel.js"

//add
const addToCart= async(req,res)=>{
  try{
   let userData= await userModel.findOne({_id: req.body.userId})
   let cartData= await userData.cartData;
   if(!cartData[req.body.itemId]){
    cartData[req.body.itemId]=1;
   }
   else{
    cartData[req.body.itemId]+=1;
   }
   await userModel.findByIdAndUpdate(req.body.userId,{cartData});
   res.json({sucess:true, message:"Added to Cart"});
  }catch(error){
    console.log(error);
    res.json({sucess:false, message:"error"});
  }
}

//remove
const removeFromCart= async(req,res)=>{
    try{
        let userData= await userModel.findById(req.body.userId)
        let cartData= await userData.cartData;
        if(cartData[req.body.itemId]>0){
         cartData[req.body.itemId]-=1;
        }
        
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({sucess:true, message:"Removed from Cart"});
       }catch(error){
         console.log(error);
         res.json({sucess:false, message:"error"});
       }
     

}


//fetch user cart
const getCart=async(req,res)=>{
    try{
        let userData= await userModel.findById(req.body.userId)
        let cartData= await userData.cartData;
        res.json({sucess:true, cartData});
       }catch(error){
         console.log(error);
         res.json({sucess:false, message:"error"});
       }

}

export {addToCart, removeFromCart, getCart}