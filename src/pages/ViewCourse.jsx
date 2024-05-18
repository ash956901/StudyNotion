import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"
import useOnClickOutsideProfile from "../hooks/useOnClickOutsideProfile"
import { MdSpaceDashboard } from "react-icons/md"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)
  const [show,setShow]=useState(false);
  const stickRef=useRef();
  const showRef=useRef();


  
  const showHandler=()=>{
    setShow(false);
  }


  useEffect(() => {
    ;(async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      // console.log("Course Data here... ", courseData.courseDetails)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useOnClickOutsideProfile(showRef,stickRef,showHandler);
  return (
    <div className="relative flex">
      <div  ref={showRef} className={`z-50 ${show?`left-0 `:`-left-[320px] absolute`} flex min-h-[calc(100vh-3.5rem)]  sm:relative sm:left-0 absolute transition-all duration-500 `}>
        <VideoDetailsSidebar  setReviewModal={setReviewModal} />
      </div>
        <button onClick={()=>{
        setShow(!show);
      }} 
      ref={stickRef}
      className=" fixed bottom-4 right-10  shadow-2xl  hover:scale-95 transition-all duration-200  z-40 p-5 rounded-full  bg-yellow-50 sm:hidden">
        <MdSpaceDashboard fontSize={20}/>
      </button>
        <div className="h-[calc(100vh-3.5rem)] relative flex-1 overflow-auto">
          <div className="mx-6 ">
            <Outlet />
          </div>
        </div>
     
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  )
}