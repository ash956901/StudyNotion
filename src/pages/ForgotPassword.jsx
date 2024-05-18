import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { IoIosArrowRoundBack } from "react-icons/io";
import Spinner from "../components/common/Spinner";
const ForgotPassword=()=>{
  const [email,setEmail]=useState("");
  const [emailSent,setEmailSent]=useState(false);
  const {loading}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const handleOnSubmit=(e)=>{
    e.preventDefault();
    dispatch(getPasswordResetToken(email,setEmailSent));
  }
  return (
<div className="text-white font-inter flex justify-center items-center w-full h-[calc(100vh-56px)]  ">
      {
        loading?
        (<Spinner/>)
        :(
          <div className=" max-w-[330px]  flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">
              {
                !emailSent?
                ("Reset your password")
                :(
                  "Check Your Email"
                )
              }
            </h1>

            <p className="text-[13px] leading-1 text-[#9e9ea0]">
              {
                !emailSent?
                (
                  "Have no fear. We'll email you instructions to reset your password. If your dont have access to your email , we can try account recovery."
                )
                :(
                  `We have sent the reset email to ${email}`
                )
              }
            </p>

            <form  className="mt-4" onSubmit={handleOnSubmit}>
              {
                !emailSent && (
                  <label> 
                    <p className="text-xs">Email Address <sup  className="text-[#ff1515] text-xsm">*</sup></p>
                    <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Enter Your Email Address"
                    className="bg-[#161D29]  text-xs mt-1 w-full p-3 rounded-xl"
                    />
                  </label>
                )
              }

              <button className={`w-full hover:bg-[#f4d744] active:scale-[0.95] transition-all duration-200 bg-[#FFD60A] text-richblack-900 ${emailSent?("mt-0"):("mt-8")} rounded-lg font-semibold text-xs p-3`} type="submit" >
                {
                  !emailSent?
                  ("Reset Password")
                  :("Resend Email")
                }
              </button>
            </form>
              
            <div className="flex mt-2 justify-start items-center ">
                <Link className="flex text-richblack-25 justify-center items-center " to="/login">
                  <IoIosArrowRoundBack fontSize={25} />
                  <p className="text-xs font-semibold">Back to login</p>
                </Link>
            </div>

          </div>
        )
      }
    </div>
  );
}


export default ForgotPassword;
