import { useState } from "react";
import Spinner from "../components/common/Spinner";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { MdSpaceDashboard } from "react-icons/md";
import useOnClickOutsideProfile from "../hooks/useOnClickOutsideProfile";
import { useRef } from "react";

const Dashboard=()=>{
  const {loading:authLoading}=useSelector((state)=>state.auth);
  const {loading:profileLoading}=useSelector((state)=>state.profile);
  const [show,setShow]=useState(false);
  const showRef=useRef();
  const stickRef=useRef();


  const showHandler=()=>{
    setShow(false);
  }
  

  useOnClickOutsideProfile(showRef,stickRef,showHandler);

  
 
  if(profileLoading || authLoading){
    return (
      <div>
        <Spinner/>
      </div>
    )
  }
  

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <div ref={showRef} className={`z-30 ${show?`left-0`:`-left-96`} sm:relative sm:left-0 absolute transition-all duration-500 `}>
        <Sidebar/>
      </div>
      <button onClick={()=>{
        setShow(!show);
      }} 
      ref={stickRef}
      className=" fixed bottom-4 right-10  shadow-2xl  hover:scale-95 transition-all duration-200  z-40 p-5 rounded-full  bg-yellow-50 sm:hidden">
        <MdSpaceDashboard fontSize={20}/>
      </button>
      <div className="h-[calc(100vh-3.5rem)] w-full overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;