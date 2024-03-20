import React from "react";

const serviceList = [
  {
    id: 1,
    title: "High-Quality Product",
    description: "We offer a curated selection og high-quality products.",
    images: "/images/home/services/assurance.png",
  },
  {
    id: 2,
    title: "Fast Delivery",
    description: "We Delivery your order proptly to yourdoor.",
    images: "/images/home/services/fast-delivery.png",
  },
  {
    id: 3,
    title: "Online Order",
    description:
      "Explore products & order with ease using our online ordering.",
    images: "/images/home/services/order.png",
  },
  {
    id: 4,
    title: "Gift Cards",
    description: "Give the gift of exceprional products whit SE shop Gift.",
    images: "/images/home/services/gift.png",
  },
];

const OurServices = () => {
  return (
    <div className="section-container my-16">
      <div class="flex flex-col md:flex-row items-center justify-between gap-12">
        <div class="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">OUR STORY & SERVICE</p>
            <h2 className="title">Our Journey and Services</h2>
            <blockquote className=" my-5 text-secondary leading-[30px]">
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos quaerat impedit laudantium assumenda, odit neque
              inventore quisquam, labore dolore perspiciatis error perferendis
              fugiat repudiandae? Unde perspiciatis cumque natus vitae quia.
            </blockquote>
            <button className="btn bg-red px-8 py-3 font-semibold text-white rounded-full">
              Explace
            </button>
          </div>
        </div>
        <div class="md:w-1/2">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
            {serviceList.map((service) => (
              <div
                key={service.id}
                className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-red 
                cursor-pointer hover:border hover:border-red transition-all duration-200"
              >
                <img src={service.images} alt="" className="mx-auto h-16" />
                <h5 className="pt-3 font-semibold">{service.title}</h5>
                <p className="text-[#bd9090]">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OurServices;
