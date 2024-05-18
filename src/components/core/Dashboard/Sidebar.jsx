import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import { VscSignOut } from "react-icons/vsc";
import { useState } from "react";
import Spinner from "../../common/Spinner";
import ConfirmationModal from "../../common/ConfirmationModal";

const Sidebar=()=>{
  const {user,loading:profileLoading}=useSelector((state)=>state.profile);
  const {loading:authLoading}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [confirmationModal,setConfirmationModal]=useState(null);
  
  if(profileLoading || authLoading){
    return (
      <div>
        <Spinner/>
      </div>
    )
  }
  
  return (
    <div className="relative flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700
    h-[calc(100vh-3.5rem)] text-white font-bold bg-richblack-800 py-10">
      <div className="flex relative  flex-col">
        {
          sidebarLinks.map((link)=>{
            if(link.type && user?.accountType!==link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon}/>
            )
            })
        }
      </div>

      <div className="mx-auto  mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600 "></div>

      <div className="flex relative flex-col ">
        <SidebarLink
        link={{name:"Settings",path:"dashboard/settings"}}
        iconName={"VscSettingsGear"}
        />
        <button onClick={()=>setConfirmationModal({
          text1:"Are You Sure?",
          text2:"You will be logged out of your Account",
          btn1Text:"Logout",
          btn2Text:"Cancel",
          btn1Handler:()=>dispatch(logout(navigate)),
          btn2Handler: ()=>setConfirmationModal(null),
        })}
        className="text-sm mt-2 font-medium text-richblack-300"
        >
        

        <div className="flex text-white ml-8 items-center gap-x-2">
          <VscSignOut className="text-lg" />
          <span>Logout</span>
        </div>
        </button>

    
      </div>


      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  );
}

export default Sidebar;