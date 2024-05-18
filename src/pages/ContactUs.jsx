import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { HiMiniGlobeEuropeAfrica } from "react-icons/hi2";
import { IoCall } from "react-icons/io5";
import ContactFormSection from "../components/core/About/ContactFormSection";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
const ContactWays=[
  {
    method:"Chat on us",
    description:"Our friendly team is here to help",
    contact:"@email address"
  },
  {
    method:"Visit us",
    description:"Come and say hello at our office HQ. ",
    contact:"Here is the location/address"
  },
  {
    method:"Call us",
    description:"Mon - Fri From 8am to 5pm ",
    contact:"+123 456 7890"
  },
]


const ContactUs=()=>{
  return (
    
    <div>

        <div className="w-11/12 mb-24 max-w-maxContent mx-auto">

{/* Section 1 */}
<section className="flex flex-col lg:flex-row mt-20 mx-auto gap-10 w-full  justify-between">

  {/* Contact Ways */}
  <div className="bg-[#161D29] md:w-fit mx-auto lg:m-0 lg:w-[40%] h-fit p-10 flex flex-col gap-12 rounded-lg">
  {
    ContactWays.map((element,index)=>(
      <div className="flex  gap-2">
        {
          index===0 && (
            <HiMiniChatBubbleLeftRight color="white" fontSize={24}/>
          )
        }

        {
          index===1 && (
            <HiMiniGlobeEuropeAfrica fontSize={24} color="white"/>
          )
        }

        {
          index===2 && (
            <IoCall  fontSize={24} color="white"/>
          )
        }

        <div className="flex flex-col gap-1">
          <h2 className="text-[18px] leading-[26px] font-semibold text-[#F1F2FF]">
            {element.method}
          </h2>
          <p className="text-[14px] leading-[22px] font-medium text-[#999DAA]">
            {element.description}
          </p>
          <p className="text-[14px] leading-[22px] font-medium text-[#999DAA]">
            {element.contact}
          </p>
        </div>
       
      </div>
    ))
  }
  </div>


  {/* Contact Form */}
  <div className="text-white border border-[#424854] px-5 md:px-10 py-5 rounded-lg ">
    <ContactFormSection 
    heading={"Got a Idea? We’ve got the skills. Let’s team up"} 
    caption={"Tall us more about yourself and what you’re got in mind."} />
  </div>
</section>

{/* Section 2 */}
<section>
<h2 className=" mt-10 mb-5 text-center text-3xl font-bold text-white mb-5">Review From Other Learners</h2>
<ReviewSlider/>
  {/* Review SLider here */}
</section>


        </div>

        {/* Footer */}
        <Footer  />
    </div>
    
    );
}

export default ContactUs;