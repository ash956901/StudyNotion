const Tag=require("../models/tags");

//create Tag api or handler function
exports.createTag=async(req,res)=>{
  try{
    //Fetch data
    const {name,description}=req.body;

    //Validation 
    if(!name||!description){
      return res.status(400).json({
        success:false,
        message:"All fields are required",
      });
    }

    //Create entry in db
    const tagDetails=await Tag.create({
      name:name,
      description:description,
    });


    console.log(tagDetails);


    //return response
    return res.status(200).json({
      success:true,
      message:"Tag Created Successfully",
    })


  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

//get all tags handler 
exports.showAlltags=async(req,res)=>{
  try{
    //get all data from db
    const allTags=await Tag.find({},{name:true,description:true});

    //return the data
    res.status(200).json({
      success:true,
      message:"All tags returned successfully",
      allTags,
    })
  }catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}