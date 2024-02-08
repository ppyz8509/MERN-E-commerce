import React from "react";
const serviceList = [
  {
    id:1,
    title : "High-Quality Products",
    description :"we offer a curated selection on high-aualiity",
    image: "images/home/servises/"
  }
]
const OutServices = () => {
  return (
   <div className="section-container">
    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="md:w-1/2">
      <div className="text-left md:w-4/5">
        <p className="subtitle">Our story & Service</p>
        <h2 className="title"> Our story and Services </h2> 
        <p className="my-5 text-secondary leading-[30px]">
          we fdifhfyfaaufdyuafdyuafdayfuyafafa
          afafawfafafffffffffffffffffffffffffffffffffffffffff
          afwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
          adfffffffffffwwwwwwwwwaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqfwf
          afaff
        </p>
        <button className="btn bg-red font-semibold text-white px-8 py-3 rounded-full ">
       Explore
        </button>
      </div>
    </div>
    <div className="md:w-1/2">
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 item-center">
        {serviceList.map((service) => (
          <div
          key={service.id}
          className="shodow-md round-sm py-5 px-4 text-center space-y-2 text-red cursor-pointer hover:border hover:border-indigo-600 translate-all dueation-200"
          >
            <img  src={service.image}/>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
  )
};

export default OutServices;