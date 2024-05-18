import React from "react";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { CiCirclePlus } from "react-icons/ci";
import IconBtn from "../../../common/IconBtn";
import CoursesTable from "../InstructorCourses/CoursesTable";
import { useNavigate } from "react-router-dom";

const MyCourses=()=>{

  const {token}=useSelector((state)=>state.auth);
  const navigate=useNavigate();
  const [courses,setCourses]=useState([]); 


  useEffect(()=>{
    const fetchCourses=async()=>{
      const result=await fetchInstructorCourses(token);
      if(result){
        setCourses(result);
      }
    }
    fetchCourses();
  },[])
  return (
    <div>
        <div  className='flex justify-between mb-10 text-white '>
          <h1 className="text-white font-inter font-bold text-2xl ">My Courses</h1>
          <IconBtn
          onclick={()=>navigate("/dashboard/add-course")}
          text="New"
          children={<CiCirclePlus fontSize={24}/>}
          customClasses="flex flex-row-reverse bg-yellow-50 text-black font-[600] px-6 py-3 rounded-lg items-center align-middle gap-x-1"
           />
        </div>


        {courses && <CoursesTable courses={courses} setCourses={setCourses}/>}
    </div>
  )
}

export default MyCourses;







// import React from "react";
// import IconBtn from "../../../common/IconBtn";
// import { CiCirclePlus } from "react-icons/ci";
// import { getUserEnrolledCourses } from "../../../../services/operations/profileAPI";
// import { FaClock } from "react-icons/fa";
// import { MdDone } from "react-icons/md";
// import { MdEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
// import { useState,useEffect } from "react";
// import { useSelector } from "react-redux";


// const MyCourses=()=>{
//   const {token}=useSelector((state)=>state.auth);
//   const [courses,setCourses]=useState([]);
//   console.log("DAte idhar hai:"+  Date().toString().split(" ")[1]);  
//   const getCourses=async()=>{
//     try{
//       const response=await getUserEnrolledCourses(token);
//       console.log(response);
//       setCourses(response);
//       console.log("ALL INSTRUCTOR COURSES FOUND");
//     }
//     catch(err){
//       console.log(err);
//       console.log(err.message);
//       console.log("COULDNT GET COURSES");
//     }
//   }

//   useEffect(()=>{
//     getCourses();
//   },[]);


//   return (
//     <div className="w-full text-white ">

//         <div className="flex flex-row w-11/12 justify-between ">
//           <h1>My Course</h1>
//           <IconBtn
//           text="New"
//           children={<CiCirclePlus fontSize={24}/>}
//           customClasses="flex flex-row-reverse bg-yellow-50 text-black font-[600] px-6 py-3 rounded-lg items-center align-middle gap-x-1"
//           />
//         </div>
    
//         <div className="grid mt-5 rounded-lg border border-richblack-500 grid-cols-9 w-11/12">
//             <div className="col-span-9 grid grid-cols-9 border-b border-richblack-500">
//               <div className=" col-span-6">
//                 COURSES
//               </div>
//               <div className="col-span-1 ">
//                 DURATION
//               </div>
//               <div className="col-span-1 ">
//                 PRICE
//               </div>
//               <div className="col-span-1 ">
//                 ACTIONS
//               </div>

//             </div>


//             {/* CARDS */}
//             {
//               courses.length 
//               ?
//               (
//                 courses.map((course,index)=>(
//                 <div key={index} className="grid col-span-9 grid-cols-9">
//                     <div className="col-span-6">
//                       <div className="flex flex-row gap-4"> 
//                         <img src={course?.thumbnail} className="rounded-md " alt="course thumbnail here" />
//                         <div className="flex flex-col gap-2">
//                           <h2>{course?.courseName}</h2>
//                           <p>{course?.courseDescription}</p>
//                           <p className="font-[600]">
//                             Created: 
//                             {course?.createdAt.toString().split(" ")[1] } {" "}
//                             {course?.createdAt.toString().split(" ")[2] } {" "}
//                             {course?.createdAt.toString().split(" ")[3] } {" "}
//                             |
//                             {" "}
//                             {course?.createdAt.toString().split(" ")[4]}
//                           </p>
//                           <div className="flex flex-row gap-2 rounded-xl" > 
//                             {
//                             course?.status==="Published"?
//                             (<FaClock/> ):
//                             (<MdDone/>)
//                             }
//                             <span>{course?.status}</span>
//                           </div>

//                         </div>
//                       </div>  
//                     </div>

//                     <div className="col-span-1">
//                       duration
//                     </div>

//                     <div className="col-span-1">
//                         Rs {course?.price}
//                     </div>

//                     <div className="flex flex-row gap-2 col-span-1">
//                           <button>
//                             <MdEdit/>
//                           </button>
//                           <button>
//                             <MdDelete/>
//                           </button>
//                     </div>


//                 </div>
                  
//                 ))
//               )
//               :
//               (
//                 <div className="col-span-9 text-center font-semibold">
//                   You have no registered course.Add one to show here.
//                 </div>
//               )
//             }


//         </div>


      

    



//     </div>
    
//   )
// }


// export default MyCourses;