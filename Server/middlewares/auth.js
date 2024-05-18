const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User");


//auth
exports.auth=async(req,res,next)=>{
  try{
    //extract token
   
    const token=req.cookies.token 
                || req.body.token 
                || req.header("Authorization").replace("Bearer ","");
   
    //if token missing,then return response
    if(!token){
      return res.status(401).json({
        success:false,
        message:"Token is missing"
      });
    }
    
    //verify token
    try{
      console.log("BEFORE VERIFIYINH");
      const decode= jwt.verify(token,process.env.JWT_SECRET);
      console.log(decode);
      console.log("HERE WE DECODED");
      req.user=decode;
    }
    catch(err){
      //issue
      console.log(err);
      console.log(err.message);
      return res.status(401).json({
        success:false,
        message:"Token is invalid"
      });
    }
    next();

  }catch(err){
    return res.status(401).json({
      success:false,
      message:"Something went wrong while validating the token",
    });
  }
}

//isStudent
exports.isStudent=async(req,res,next)=>{
  try{
    if(req.user.accountType!=="Student"){
      return res.status(401).json({
        success:false,
        message:"This is a protected route for students only"
      });
    }
    next();
  }catch(err){
    return res.status(500).json({
      success:false,
      message:"User role cannot be verified,please try again"
    })
  }
}

//isAdmin
exports.isAdmin=async(req,res,next)=>{
  try{
    if(req.user.accountType!=="Admin"){
      return res.status(401).json({
        success:false,
        message:"This is a protected route for Admin only"
      });
    }
    next();
  }catch(err){
    return res.status(500).json({
      success:false,
      message:"User role cannot be verified,please try again"
    })
  }
}

//isInstructor
exports.isInstructor=async(req,res,next)=>{
  try{
    if(req.user.accountType!=="Instructor"){
      return res.status(401).json({
        success:false,
        message:"This is a protected route for Instructor only"
      });
    }
    next();
  }catch(err){
    return res.status(500).json({
      success:false,
      message:"User role cannot be verified,please try again"
    })
  }
}