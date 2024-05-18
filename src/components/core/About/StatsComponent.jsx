
const Stats=[
  {
    count:"5K",
    label:"Active Students"
  }
  ,
  {
    count:"10+",
    label:"Mentors"
  }
  ,
  {
    count:"200+",
    label:"Courses"
  }
  ,
  {
    count:"50+",
    label:"Awards"
  }
];

const StatsComponent=()=>{
  return (
      <section className=" w-full ">
        <div className=" w-full ">
          <div className="flex flex-col md:flex-row text-center gap-10 md:gap-0 justify-evenly  mx-auto w-full">
            {
              Stats.map((data,index)=>(
                <div key={index}>
                  <h1 className="text-[30px] font-semibold leading-[38px]">
                    {data.count}
                  </h1>
                  <h2 className="text-[12px] font-semibold text-[#585D69] leading-[24px] ">
                    {data.label}
                  </h2>
                </div>
              ))
            }
          </div>
        </div>
      </section>
  );

}

export default StatsComponent;