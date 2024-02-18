import { useEffect, useState } from "react";
import Card from "../../../components/Card";

// สร้างคอมโพเนนต์ ProductList
const ProductList = () => {
  // สถานะทั้งหมดที่จำเป็นสำหรับการแสดงรายการสินค้า
  const [products, setProducts] = useState([]); // สินค้าทั้งหมด
  const [filteredItems, setFilteredItems] = useState([]); // รายการสินค้าที่ผ่านการกรอง
  const [selectedCategory, setSelectedCategory] = useState("all"); // หมวดหมู่ที่ถูกเลือก
  const [sortOptions, setSortOptions] = useState("default"); // ตัวเลือกการเรียงลำดับ
  const [currentPage, setCurrentPage] = useState(1); // หน้าปัจจุบัน
  const [itemPerPages, setItemPerPages] = useState(8); // จำนวนรายการต่อหน้า
  const [categories, setCategories] = useState([]); // หมวดหมู่สินค้าทั้งหมด

  // Hook useEffect เริ่มต้นเมื่อคอมโพเนนต์ถูกโหลดครั้งแรก
  useEffect(() => {
    // ฟังก์ชัน fetchData เพื่อดึงข้อมูลสินค้า
    const fetchData = async () => {
      try {
        // ดึงข้อมูลสินค้าจากไฟล์ JSON
        const response = await fetch("/product.json");
        // แปลงข้อมูลเป็น JSON
        const data = await response.json();
        // กำหนดค่าสินค้าทั้งหมด
        setProducts(data);
        // กำหนดค่ารายการสินค้าที่ผ่านการกรองเป็นค่าเริ่มต้น
        setFilteredItems(data);
        // หาหมวดหมู่สินค้าทั้งหมดและกำหนดค่าเริ่มต้น
        setCategories(["all", ...new Set(data.map((item) => item.category))]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // เรียกใช้งานฟังก์ชัน fetchData
    fetchData();
  }, []); // ทำงานเฉพาะครั้งแรกเท่านั้น

  // ฟังก์ชันสำหรับการกรองรายการสินค้าตามหมวดหมู่
  const filterItems = (category) => {
    // กรองรายการสินค้า
    const filtered =
      category === "all"
        ? products
        : products.filter((item) => item.category === category);
    // เรียกใช้งานฟังก์ชัน handleSortChange เพื่อเรียงลำดับรายการสินค้าใหม่
    handleSortChange(sortOptions, filtered);
    // กำหนดหมวดหมู่ที่ถูกเลือกและหน้าปัจจุบันเป็น 1
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // ฟังก์ชันสำหรับการเปลี่ยนแปลงการเรียงลำดับรายการสินค้า
  const handleSortChange = (option, products) => {
    // กำหนดค่าตัวเลือกการเรียงลำดับ
    setSortOptions(option);
    // คัดลอกรายการสินค้าเพื่อทำการเรียงลำดับ
    let sortedItems = [...products];
    // เรียงลำดับรายการสินค้าตามตัวเลือกที่เลือก
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    // กำหนดค่ารายการสินค้าที่ผ่านการเรียงลำดับและหน้าปัจจุบันเป็น 1
    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // คำนวณดัชนีของรายการสินค้าที่จะแสดงบนแต่ละหน้า
  const indexOfLastItem = itemPerPages * currentPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPages;
  // รายการสินค้าที่จะแสดงบนหน้าปัจจุบัน
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      {/** Product List Banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col justify-center items-center">
          <div className="text-center space-y-7 px-4">
            <h2 className="md:text-4xl text-4xl font-bold md:leading-snug leading-snug">
              Unleash your Inner <span className="text-red">Geek</span>: <br />{" "}
              Shop Our Exclusive Tech-themed Merchandises!
            </h2>
            <p className="text-xl text-[#4A4A4A]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Blanditiis laborum provident expedita temporibus, perferendis,
              sunt quo unde ex voluptatem ipsa necessitatibus exercitationem
              minus amet maiores similique pariatur sapiente nihil velit.
            </p>
            <button className="btn bg-red px-8 py-3 font-semibold text-white rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/** Product List Card */}
      <div className="section-container">
        <div className="flex flex-col md:flex-row flex-warp md:justify-between items-center space-y-3 mb-8">
          {/* filter */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => filterItems(category)}
                className={`${selectedCategory === category ? "active" : ""
                  } px-4 py-2 rounded-full`}
              >
                <p className="capitalize">{category}</p>
              </button>
            ))}
          </div>
          {/* Sort Option */}
          <div className="flex justify-end mb-4 rounded-sm">
  <div className="bg-black p-2 flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-cyan-50 mr-2 rounded-sm">
      <path d="M6 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5A.75.75 0 0 1 6 12ZM18 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 18 12ZM6.75 20.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM18.75 18.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 1.5 0ZM12.75 5.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM12 21a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 12 21ZM3.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0ZM12 11.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM15.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z" />
    </svg>
    <select
      className="bg-black text-white px-2 rounded-sm"
      id="sort"
      onChange={(e) =>
        handleSortChange(e.target.value, filteredItems)
      }
      value={sortOptions}
    >
      <option value={"default"}>Default</option>
      <option value={"A-Z"}>A-Z</option>
      <option value={"Z-A"}>Z-A</option>
      <option value={"low-to-high"}>Low to High</option>
      <option value={"high-to-low"}>High to Low</option>
    </select>
  </div>
</div>
        </div>
        {/* Product Card */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-col-1 gap-4">
          {currentItems.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center my-8 flex-wrap gap-2">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemPerPages),
        }).map((_, index) => {
          return (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-red text-white" : "bg-gray-200"
                }`}
              onClick={() => {
                setCurrentPage(index + 1);
              }}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
