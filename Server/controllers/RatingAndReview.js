const RatingAndReview=require("../models/RatingAndReview");
const Course=require("../models/Course");


//createRating
exports.createRating=async(req,res)=>{
  try{
    //get user id
    const userId=req.user.id;
    //fetch data from req body
    const {courseId,rating,review}=req.body;
    //check if user is enrolled or not
    const courseDetails=await Course.findOne({_id:courseId,
    studentsEnrolled:{$elemMatch:{$eq:userId}}});
    if(!courseDetails){
        return res.status(404).json({
          success:false,
          message:"Student is not enrolled in the course",
        })
      }
    //check if user already reviewed
    const alreadyReviewed=await RatingAndReview.findOne({
      user:userId,
      course:courseId,
    });
    if(alreadyReviewed){
      return res.status(403).json({
        success:false,
        message:"Course already reviewed by the user",
      })
    }
    //create rating and review
    const ratingReview=await RatingAndReview.create({
      rating,
      review,
      course:courseId,
      user:userId,
    });

    //Update course modal
    const updatedCourseDetails=await Course.findByIdAndUpdate({
      _id:courseId
    },{
      $push:{
        ratingAndReviews:ratingReview._id,
      }
    },{new:true});
    console.log(updatedCourseDetails);
    //return response
    return res.status(200).json({
      success:true,
      message:"Rating and Review created successfully for the course",
      ratingReview
    })
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      success:false,
      message:err.message,
    })
  }
}


//getAveragerating
exports.getAverageRating=async(req,res)=>{
  try{
    //get course Id
    const {courseId}=req.body.courseId;
    //calculate avg rating
    const result=await RatingAndReview.aggregate([{
      $match:{
        course:new mongoose.Types.ObjectId(courseId),
      }
    },
    {
      $group:{
        _id:null,
        averageRating:{$avg:"$rating"}, 
      }
    }]);

    //if rating exists
    if(result.length>0){
      return res.status(200).json({
        success:true,
        averageRating:result[0].averageRating,
      })
    }
    //else
    else{
      return res.status(200).json({
        success:true,
        message:"Average Rating is 0, no rating given till now",
        averageRating:0,
      });
    }
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      success:false,
      message:err.message,
    })
  }
}


//getAllRatingAndReviews
exports.getAllRating=async(req,res)=>{
  try{
    //Find call and return response
    const allReviews=await RatingAndReview.find({})
                    .sort({
                      rating:"desc",
                    }).populate({
                      path:"user",
                      select:"firstName lastName email image",
                    })
                    .populate({
                      path:"course",
                      select:"courseName",
                    }).exec();


    return res.status(200).json({
      success:true,
      message:"All reviews fetched successfully",
      data:allReviews,
    });
  }
  catch(err){
    console.log("BACKEND ERROR HERE:",err);
    return res.status(500).json({
      success:false,
      message:err.message,
    })
  }
}