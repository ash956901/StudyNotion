const User=require('../models/User');
const OTP=require('../models/OTP');
const otpGenerator=require('otp-generator');
const bcrypt=require('bcrypt');
const Profile=require("../models/Profile");
const jwt=require('jsonwebtoken');
const mailSender=require('../utils/mailSender');
require("dotenv").config();

const { passwordUpdated } = require("../mail/templates/passwordUpdate");
//sendOTP
exports.sendotp= async(req,res)=>{

  try{
      //fetch email from req body
      const {email}=req.body;
      //Check if user already exists or not 
      const checkUserPresent=await User.findOne({email});
  

      //if already exist,then return a response
      if(checkUserPresent){
        return res.status(401).json({
          success:false,
          message:"User already registered"
        })
      }

      //generate otp
      var otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
      })
      console.log("OTP GENERATED SUCCESSFULLY");

      //check if unique
      let result=await OTP.findOne({otp:otp});
      
      while(result){
        otp=otpGenerator.generate(6,{
          upperCaseAlphabets:false,
          lowerCaseAlphabets:false,
          specialChars:false,
        })
        result=await OTP.findOne({otp:otp});
      }

      //Entry in Db to check when user enters
      //create object
      const otpPayload={email,otp};
      //create entry
      const otpBody=await OTP.create(otpPayload);
      console.log("DB ENTRY FOR OTP CREATED");
      console.log(otpBody);

      //return response
      return res.status(200).json({
        success:true,
        message:"OTP SENT SUCCESSFULLY"
      });
      
  }catch(err){
    console.log("ERROR WHILE SENDING OTP:",err);
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

//signup 
exports.signup= async(req,res)=>{
  try{
    //Fetch data
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body

    //Validate data
    if(!firstName || !lastName || !email || !password || !confirmPassword 
      || !otp){
        return res.status(403).json({
          success:false,
          message:"All fields are required"
        })
    }


    //2 passwords check
    if(password !==confirmPassword){
      return res.status(400).json({
        success:false,
        message:"Password and Confirm Password  value do not match , try again please"
      })
    }
    //check user if already exists
    const existingUser=await User.findOne({email});
    if(existingUser){
      return res.status(400).json({
        success:false,
        message:"User is already registered",
      })
    }


    //find most recent otp
    const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1); 
    console.log(recentOtp[0].otp);
    console.log(otp);

    //validate otp
    if(recentOtp.length==0){
      //OTP NOT FOUND
      return res.status(400).json({
        success:false,
        message:"OTP NOT FOUND"
      })
    }

    else if(otp!==recentOtp[0].otp){
      return res.status(400).json({
        success:false,
        message:"Invalid Otp"
      })
    }

    //Hash password
    const hashedPassword=await bcrypt.hash(password,10);


    //entry in db


    //create Profile for entry 
    const profileDetails=await Profile.create({
    gender:null,
    dateOfBirth:null,
    about:null,
    contactNumber:null,
    });

    const user=await User.create({
    firstName,
    lastName,
    email,
    accountType,
    contactNumber,
    password:hashedPassword,
    additionalDetails:profileDetails._id,
    image:`https://api.dicebear.com/7.x/initials/svg?seed=${firstName}`

    });

    //response
    return res.status(200).json({
      success:true,
      message:"Sign Up Successfull",
      user
    })
  }
  catch(err){
    console.log('ERROR IN SIGNING UP:',err);
    return res.status(500).json({
      success:false,
      message:"User cannot be registered,please try again "
    })
  }
}


//login
exports.login=async(req,res)=>{
  try{
    //get data
    const {email,password}=req.body;
    //validate data
    if(!email || !password){
      return res.status(403).json({
        success:false,
        message:"All fields are required,please try again"
      })
    }

    //check if user exists or not
    const user=await User.findOne({email}).populate("additionalDetails");
    if(!user){
      return res.status(401).json({
        success:false,
        message:"User does not exist, Sign up first please"
      })
    }

    //password Check
    if(await bcrypt.compare(password,user.password)){
      const payload={
        email:user.email,
        id:user._id,
        accountType:user.accountType,
      }
      const token=jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"10h",
      })
      user.token=token;
      user.password=undefined;

       //create cookie and send response
      const options={
        expires:new Date(Date.now()+3*24*60*60*1000),
        httpOnly:true,
      }
      res.cookie("token",token,options).status(200).json({
        success:true,
        token,
        user,
        message:"Logged in successfully"
      })
    }

    else{
      return res.status(401).json({
        success:false,
        message:"Password is incorrect"
      })
    }


   
  } 
  catch(err){
    console.log(err);
    return res.status(500).json({
      success:false,
      message:"Login Failure, please try again"
    })
  }
}



//changePassword
exports.changePassword=async(req,res)=>{
 
 
  
  try {
		 
		const userDetails = await User.findById(req.user.id);
    //get data from req body
     //get oldPassword,newPassword,confirmNewPassword
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

    //Validation
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
		
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}


		if (newPassword !== confirmNewPassword) {
		
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

    //Hashing and updating    
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

	
    //Send mail
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}

 
}

