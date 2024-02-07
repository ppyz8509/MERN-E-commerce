import React from 'react'
const categoriesItem = [
    {
        id:1,
        tile: "Clothing",
        description :"(86 items)",
        image: "/images/home/category/img1.jpg",
    },
    {
        id:2,
        tile: "Accessories",
        description :"(45 items)",
        image: "/images/home/category/img2.jpg",
    },
    {
        id:3,
        tile: "Gadgets",
        description :"(29 items)",
        image: "/images/home/category/img3.jpg",
    },
    {
        id:4,
        tile: "Swag",
        description :"(15 items)",
        image: "/images/home/category/img4.jpg",
    },
]
const Categories =()  => {
  return (
    <div className='section-container py-16'>
        <div className='text-center'>
            <p className='subtitle'>Cutomer Faverites</p>
            <h2 className='title'>Popular Categories</h2>
        </div>
        <div className='flex flex-col sm:flex-wrap gap-6 justify-around items-center mt-12'>
           {categoriesItem.map((item,i) => (
            <div
            key={i}
            className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300'
            >
             <div className=''>
                <image
                src={item.image}
                 alt=""
                 className='bg-red p-2 rounded-full w-28 h-28'
                 />
             </div>
            </div>
           ))}
        </div>
    </div>
  )
}

export default Categories