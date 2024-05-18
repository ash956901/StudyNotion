import { toast } from "react-hot-toast"

import { setUser,setLoading } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from "../apis"
import { logout } from "./authAPI"


const {
  GET_ALL_INSTRUCTOR_COURSES_API,
  COURSE_DETAILS_API
}= endpoints;


// export const getCourseDetails=()=>{
//   return async(dispatch)=>{
//     const toastId=toast.loading("Loading...");
//     dispatch(setLoading(true));
//     try{
//       const response=await apiConnector();
//       console.log(response);

//     }
//     catch(err){
//       console.log(err);
//       console.log(err.message);
//       toast.error("");
//     }
//     toast.dismiss(toastId);
//     dispatch(setLoading(false));
//   }
// }