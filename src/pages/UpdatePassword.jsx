import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import Spinner from "../components/common/Spinner";
const UpdatePassword=()=>{
  const [formData,setFormData]=useState({
    password:"",
    confirmPassword:"",
  });
  const navigate=useNavigate();
  const location=useLocation();
  const {password,confirmPassword}=formData;
  const {loading}=useSelector((state)=>state.auth);
  const [showPassword,setShowPassword]=useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=useState(false);
  const dispatch=useDispatch();

  const handleOnChange=(e)=>{
    setFormData((prevData)=>(
      {
      ...prevData, 
      [e.target.name] : e.target.value
      }
    )
    )
  }
  
  const handleOnSubmit=(e)=>{
    e.preventDefault();
    const token=location.pathname.split("/").at(-1);
    dispatch(resetPassword(password,confirmPassword,token,navigate));
   
  }
  return (
    <div className="text-white font-inter flex justify-center items-center w-full h-[calc(100vh-56px)]">
      {
        loading?(
          <Spinner/>
        )
        :(
          <div className=" max-w-[330px] flex flex-col gap-2" >

            <h1 className="text-2xl font-semibold">Choose new Password</h1>
            
            <p className="text-[13px] leading-1 text-[#9e9ea0]">Almost done. Enter your new password and you're all set.</p>
            
            <form onSubmit={handleOnSubmit}>
              
              
              <label className="relative">
                <p className="text-xs">New Password<sup className="text-[#ff1515] text-xsm"> *</sup></p>
                <input
                 style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                required
                type={showPassword?"text":"password"}
                name='password'
                value={password}
                className="bg-[#161D29] text-xs mt-1 w-full p-3 rounded-xl"
                onChange={handleOnChange}
                placeholder="Enter your new Password"
                />
                <span className="absolute top-7 right-3" onClick={()=>{setShowPassword((prev)=>!prev)}}>
                  {
                    showPassword?(<AiFillEyeInvisible fontSize={24} />):(<AiFillEye  fontSize={24}/>)
                  }
                </span>
              </label>


              <label className=" relative">
                <p className="text-xs mt-4">Confirm New Password<sup  className="text-[#ff1515] text-xsm"> *</sup></p>
                <input
                required
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="bg-[#161D29] text-xs mt-1 w-full p-3 rounded-xl"
                type={showConfirmPassword?"text":"password"}
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm New Password"
                />
                <span className="absolute top-[74px] right-3" onClick={()=>{setShowConfirmPassword((prev)=>!prev)}}>
                  {
                    showConfirmPassword?(<AiFillEyeInvisible  fontSize={24} />):(<AiFillEye  fontSize={24}/>)
                  }
                </span>
              </label>


                  <button className={`w-full hover:bg-[#f4d744] active:scale-[0.95] transition-all duration-200 bg-[#FFD60A] text-richblack-900 mt-8 rounded-lg font-semibold text-xs p-3`} type="submit">
                    Reset Password
                  </button>


            </form>

               
            <div className="flex mt-2 justify-start items-center ">
                <Link className="flex text-richblack-25 justify-center items-center " to="/login">
                <IoIosArrowRoundBack fontSize={25} />
                  <p className="text-xs font-semibold">Back to Login</p>
                </Link>
            </div>

          </div>
        )
      }
    </div>
  );
}

export default UpdatePassword