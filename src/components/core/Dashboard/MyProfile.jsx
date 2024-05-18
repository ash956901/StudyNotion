import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { FaEdit } from "react-icons/fa";

const MyProfile=()=>{
  const {user}=useSelector((state)=>state.profile);
  const navigate=useNavigate();
  return (
    <div className="text-white w-full">


      <h1 className="font-inter font-[600] text-[30px] leading-[38px]">
        My Profile
      </h1>

      {/* Section 1 */}
      <div className="mt-10 md:flex-row gap-8 md:gap-0 rounded-lg border border-[#2C333F] bg-[#161D29] p-8  mx-auto flex flex-col w-11/12 justify-between ">
        <div className="flex  gap-4 items-center  ">
          <img src={user?.image} alt={`profile-${user?.firstName}`} 
          className="aspect-square w-[78px] rounded-full object-cover"/>
          
          <div>
            <p className="text-[18px] leading-[26px] font-[500] font-inter ">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-[14px] leading-[22px] font-[400] text-[#838894] font-inter ">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="flex flex-row md:flex-col justify-center">
         <button
          className="text-black hover:scale-95 transition-all duration-200  w-fit rounded-lg bg-[#FFD60A] h-fit py-3 px-6 flex gap-x-2 align-middle "      
          onClick={()=>{
            navigate("/dashboard/settings")
          }}>
          <FaEdit  fontSize={20} />
          <div className="text-[16px] leading-[24px]  font-[600]">Edit</div>
        </button> 
        </div>
       

          

      </div>

      {/* Section 2 */}
      <div className="mt-10 gap-3 sm:gap-0  rounded-lg border border-[#2C333F] bg-[#161D29] p-8  mx-auto flex flex-col w-11/12 justify-between ">
        <div className="flex items-center sm:items-start justify-between ">
          <p className="font-[600] text-[18px] leading-[26px] ">About</p>
          <IconBtn
          customClasses="text-black font-[600] flex-row-reverse hover:scale-95 transition-all duration-200  w-fit rounded-lg bg-[#FFD60A] h-fit py-3 px-6 flex gap-x-2 align-middle "
          children={<FaEdit fontSize={20}/>}
          text="Edit"
          onclick={()=>{
            navigate("/dashboard/settings")
          }}/>
        </div>
        <p className="text-[14px] leading-[22px] text-[#838894] ">{user?.additionalDetails?.about ?? "Write Something about Yourself"}</p>
      </div>

      {/* Section 3 */}
      <div className="mt-10 gap-3 sm:gap-0  rounded-lg border border-[#2C333F] bg-[#161D29] p-8  mx-auto flex flex-col w-11/12 justify-between">
        <div className="flex flex-row justify-between">
          <p className="font-[600] w-[20px] sm:w-fit  text-[18px] leading-[26px]">
            Personal Details
          </p>
          <IconBtn
          customClasses="text-black font-[600] flex-row-reverse hover:scale-95 transition-all duration-200  w-fit rounded-lg bg-[#FFD60A] h-fit py-3 px-6 flex gap-x-2 align-middle "
          children={<FaEdit fontSize={20}/>}
          text="Edit"
          onclick={()=>{
            navigate("/dashboard/settings")
          }}/>
        </div>
        <div className="mt-5 grid  sm:grid-cols-2 sm:grid-rows-3 gap-5">
          <div>
            <p className="text-[14px] font-[400] leading-[22px] text-[#838894] ">First Name</p>
            <p className="font-[500] text-[14px] leading-[22px] ">{user?.firstName}</p>
          </div>
          <div>
            <p className="text-[14px] leading-[22px] text-[#838894] ">Email</p>
            <p className="font-[500] text-[14px] leading-[22px] ">{user?.email}</p>
          </div>
          <div>
            <p className="text-[14px] leading-[22px] text-[#838894] ">Gender</p>
            <p className="font-[500] text-[14px] leading-[22px] ">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
          </div>
          <div>
            <p className="text-[14px] leading-[22px] text-[#838894] ">Last Name</p>
            <p className="font-[500] text-[14px] leading-[22px] ">{user?.lastName}</p>
          </div>
          <div>
            <p className="text-[14px] leading-[22px] text-[#838894] ">Phone number</p>
            <p className="font-[500] text-[14px] leading-[22px] ">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
          </div>
          <div>
            <p className="text-[14px] leading-[22px] text-[#838894] ">Date of Birth</p>
            <p className="font-[500] text-[14px] leading-[22px] ">{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
          </div>
        </div>
      </div>


    </div>
  );

}

export default MyProfile;