
const CourseProgress = require("../models/CourseProgress");
const SubSection=require("../models/SubSection");


exports.updateCourseProgress=async(req,res)=>{
    const {courseId,subsectionId}=req.body;
    const userId=req.user.id;

    try{
        //check if valid subSection 
        const subSection= await SubSection.findById(subsectionId);
        
        if(!subSection){
            return res.status(404).json({
                success:false,
                error:"Invalid SubSection"
            })
        }


        //check for old entry
        let courseProgress=await CourseProgress.findOne({
            courseID:courseId,
            userId:userId,
        });
        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Course Progress does not exist"
            })
        }

        else{
            //check for re-completing video/subsection
            if(courseProgress.completedVideos.includes(subsectionId)){
                return res.status(400).json({
                    success:false,
                    message:"Video/SubSection already completed"
                })
            }

            //push in completedVideos
            courseProgress.completedVideos.push(subsectionId);


            //save this state

            await courseProgress.save();

            return res.status(200).json({
                success:true,
                message:"Marked Completed Succesfully"
            })
        }
        
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }

}