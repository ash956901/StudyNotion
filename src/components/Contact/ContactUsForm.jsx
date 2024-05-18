import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";
import CountryCode from "../../data/countrycode.json";

const ContactUsForm = () =>{
  
  const [loading,setLoading]=useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors,isSubmitSuccessful}
    }=useForm();
    
    const submitContactForm=async(data)=>{
        console.log("Logging Data:",data);
        try{
          setLoading(true);
          // const response=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
          const response={status:"OK"};
          console.log(response);
          setLoading(false);
        }
        catch(error){
          console.log("Error:",error.message);
          setLoading(false);
        }
    }

    useEffect(()=>{
      if(isSubmitSuccessful){
        reset({
          email:"",
          firstname:"",
          lastname:"",
          message:"",
          phoneno:"",
        })
      }
    },[isSubmitSuccessful,reset]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      
      <div className="flex-col gap-5  flex">
    
      <div className="flex flex-col md:flex-row w-full gap-5">
        {/* firstname */}
        <div className="flex w-full flex-col">
          <label className="text-[14px] leading-[22px] text-[#F1F2FF] font-medium " htmlFor="firstname">
            First Name
          </label>
          <input 
          className="bg-[#161D29]  text-sm mt-1 text-[#999DAA] font-medium w-full p-3 rounded-lg"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          type="text" 
          name="firstname" 
          id="firstname"
          placeholder="Enter first name"
          {...register("firstname",{required:true})}
           />
           {
            errors.firstname && (
              <span>
                Firstname error
              </span>
            )
           }
        </div>


        {/* lastname */}
        <div className="flex w-full flex-col">
          <label className="text-[14px] leading-[22px] text-[#F1F2FF] font-medium " htmlFor="lastname">
            Last Name
          </label>
          <input
          className="bg-[#161D29]  text-sm mt-1 text-[#999DAA] font-medium w-full p-3 rounded-lg"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }} 
          type="text" 
          name="lastname" 
          id="lastname"
          placeholder="Enter last name"
          {...register("lastname")}
           />
      
        </div>

      </div>

       {/* email */}
       <div className="flex flex-col">
           <label className="text-[14px] leading-[22px] text-[#F1F2FF] font-medium " htmlFor="email">
            Email Address
           </label>
           <input 
           className="bg-[#161D29]  text-sm mt-1 text-[#999DAA] font-medium w-full p-3 rounded-lg"
           style={{
             boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
           }}
           type="email"
           name="email"
           id="email"
           placeholder="Enter email Address"
           {...register("email",{required:true})} 
           />
           {
            errors.email && (
              <span>
                Please enter your email address
              </span>
            )
           }
        </div>

        {/* phone no */}
        <div className="flex w-full flex-col gap-2">
           <label className="text-[14px] leading-[22px] text-[#F1F2FF] font-medium " htmlFor="phoneno">Phone Number</label>
           

           <div className="flex flex-col md:flex-row gap-5">
              {/* dropdown */}
              <select 
              className="bg-[#161D29]  text-sm mt-1 text-[#999DAA] font-medium  p-3 rounded-lg md:w-[15%] "
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              name="dropdown"
               id="dropdown"
              {...register("countrycode",{required:true})}
              >
                {
                  CountryCode.map((element,index)=>{
                    return (
                      <option className="text-[#999DAA]" value={element.code} key={index}>
                        {element.code} - {element.country}
                      </option>
                    )
                  })
                }
              </select>

              <div className="w-[100%]">
                <input type="number"
                className="bg-[#161D29]  text-sm mt-1 text-[#999DAA] font-medium w-full p-3 rounded-lg"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                name="phoneno"
                id="phoneno"
                placeholder="Enter your phone number please" 
               
                {...register("phoneno",{
                  required:{value:true,message:"Please Enter Your Phone Number"},
                  maxLength:{value:10,message:"Invalid Phone Number"},
                  minLength:{value:8,message:"Invalid Phone Number"}
                })}
                />
                {
                  errors.phoneno&&(
                    <span>
                     { errors.phoneno.message}
                    </span>
                  )
                }
              </div>
           </div>
        </div>


        {/* message */}
        <div className="flex flex-col">
           <label className="text-[14px] leading-[22px] text-[#F1F2FF] font-medium " htmlFor="message">Message</label>
          <textarea 
          className="bg-[#161D29]  text-sm mt-1 text-[#999DAA] font-medium w-full p-3 rounded-lg"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          name="message" 
          id="message" 
          cols="30"
           rows="10"
           placeholder="Enter Your Message Here"
           {...register("message",{required:true})}
           />
           {
            errors.message && <span>
              Please enter your message
            </span>
           }
        </div>

        {/* submit */}
        <button className="rounded-md bg-yellow-50 text-center text-sm   px-6 py-3 font-semibold text-[#000814] " type="submit">
            Send Message
        </button>

      </div>
    </form>
  );
}

export default ContactUsForm;