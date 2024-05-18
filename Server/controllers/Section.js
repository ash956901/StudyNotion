const Section=require("../models/Section");
const Course=require("../models/Course");
const SubSectionModal=require("../models/SubSection");

exports.createSection=async(req,res)=>{
  try{
    //Data fetch
    const {sectionName,courseId}=req.body;
    //Data validation
    if(!sectionName || !courseId){
      return res.status(400).json({
        success:false,
        message:"All fields are required",
      })
    }
    //Section create
    const newSection=await Section.create({sectionName});
    console.log("New Section Created:",newSection);
    //Update Course model
    const updatedCourseDetails = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();
    console.log("Updated Course details:",updatedCourseDetails);
    //HW: use populate to replace sections/sub-sections both in updatedCourseDetails
    //return response
    return res.status(200).json({
      success:true,
      message:"Section created Successfully",
      updatedCourseDetails,
    })
  }
  catch(err){
  
  }
}

//update a section
exports.updateSection = async(req,res)=>{
  try{
    //data input
    const {sectionName,sectionId,courseId}=req.body;
    //data validation
    if(!sectionName || !sectionId){
      return res.status(400).json({
        success:false,
        message:"All fields are required",
      })
    }

    //make course to send
    const course= await Course.findById(courseId).populate({
      path:"courseContent",
      populate:{
        path:"subSection"
      }
    }).exec();
    //update data
    const section=await Section.findByIdAndUpdate(sectionId,{
      sectionName:sectionName,
    },{new:true});
    //return response
    return res.status(200).json({
      success:true,
      message:section,
      data:course,
    });

  }
  catch(err){
    return res.status(500).json({
      success:false,
      message:"Unable to update section , please try again",
      error:err.mesage,
    })
  }
}


//Remove a section
exports.deleteSection=async(req,res)=>{
  try{
    //getId - this time sending id in parameters
    const {
      sectionId,courseId
    }=req.body;

    await Course.findByIdAndUpdate(courseId,{
      $pull:{
        courseContent:sectionId,
      }
    })
    console.log(sectionId);
    //find by id an delete
    const deletedSection=await Section.findByIdAndDelete(sectionId);
    console.log(sectionId,courseId);

    if(!deletedSection){
      return res.status(404).json({
        success:false,
        message:"Section not found",
      })
    }

    await SubSectionModal.deleteMany({_id:{$in:deletedSection.subSection}});
    await Section.findByIdAndDelete(sectionId);
    const course=await Course.findById(courseId).populate({
      path:"courseContent",
      populate:{
        path:"subSection"
      }
    }).exec();


    //H/W:-> Update Course
    //Delete id from schema , HW:Do we need to
    //return response 
    return res.status(200).json({
      success:true,
      message:"Section Deleted Successfully",
      data:course
    })
  }
  catch(err){
    return res.status(500).json({
      success:false,
      message:"Unable to remove section , please try again",
      error:err.mesage,
    })
  }
}
