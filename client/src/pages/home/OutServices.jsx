import React from "react";
const serviceList = [
  {
    id: 1,
    title: "High-Quality Products",
    description: "We offer a curated selected og high-quality products.",
    image: "/images/home/services/assurance.png",
  },
  {
    id: 2,
    title: "Fast Delivery",
    description: "We Deliver your order promptly to your door.",
    image: "/images/home/services/fast-delivery.png",
  },
  {
    id: 3,
    title: "Online Ordering",
    description:
      "Explore products & order with ease using our online ordering.",
    image: "/images/home/services/order.png",
  },
  {
    id: 4,
    title: "Gift Cards",
    description:
      "Give the gift of exceptional products with SE Shop Gift Cards.",
    image: "/images/home/services/gift.png",
  },
];

const OurServices = () => {
  return (
    <div className="section-container my-16 ">
      <div className="flex flex-col md:flex-row item-center justify-between gap-12">
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Our story & Service</p>
            <h2 className="title">Our Journey and Services</h2>
            <p className="my-5 text-secondary leading-[30px]">
              We Provide a curated selection of high-quality tech-inspired
              products,backed by fast shipping and exceptional customer service.
              Our mission is to empower and inspire tech enthusiasts through our
              carefully chosen merchandise and community engagement initiatives.
            </p>
            <button className="btn bg-red font-semibold text-white px-8 py-3 rounded-full">
              Explore
            </button>
          </div>
        </div>
        <div className="md:w=1/2">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
            {serviceList.map((service) => (
              <div
                key={service.id}
                className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-red cursor-pointer hover:border hover:border-indigo-600 transition-all duration-200"
              >
                <img src={service.image} alt="" className="mx-auto h-16" />
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