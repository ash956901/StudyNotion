import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { IoIosArrowDown } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";

const ProfileDropDown=()=>{
  const {user}=useSelector((state)=>state.profile);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  return (
    <div className="relative group">
      
      
      <div className="flex  text-white flex-row items-center gap-x-2"> 
      <img src={user?.image} className="rounded-full w-9 h-9" />
      {/* <IoIosArrowDown/> */}
      </div>



      <div className="absolute  opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg  flex-col px-6 py-3  text-white z-50 -right-4 top-14   bg-richblack-700 border border-richblack-300   ">
          <IconBtn
          onclick={()=>{
            navigate("/dashboard/my-profile");
          }}
          text="Dashboard"
          children={<MdSpaceDashboard   fontSize={20} />}
          customClasses="flex gap-2 justify-center  w-full align-middle flex-row-reverse"
          /> 
          <IconBtn
          onclick={()=>dispatch(logout(navigate))}
          text="Logout"
          children={<RiLogoutBoxLine fontSize={20} />    }
          customClasses="flex mt-2 gap-2 justify-center align-middle flex-row-reverse"
          /> 
          <div className="h-4 w-4 absolute -top-[9px] z-50 rounded-sm border-t border-l right-6 rotate-45 bg-richblack-700"></div>
      </div>


    </div>
  )
}

export default ProfileDropDown;