import { useEffect, useState } from "react";
import Card from "../../Components/Card";
import useAxiosPublic from "../../hook/useAxiosPublic";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [categories, setCategories] = useState([]);
const axiosPublic = useAxiosPublic()
  useEffect(() => {
    const fetchData = async () => {
      try {
       /// const response = await fetch("http://localhost:5000/products");
       const response = await axiosPublic.get("/products")
        const data = await response.data;
        setProducts(data);
        setFilteredItems(data);
        setCategories(["all", ...new Set(data.map((item) => item.category))]); //...สลายโครงสร้าง
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? products
        : products.filter((item) => item.category === category);
    //setFilteredItems(filtered);
    handleSortChange(sortOption, filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (option, products) => {
    setSortOption(option);
    let sortedItems = [...products];
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
    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem); //index คือดัชณี เป็นตัวชี้ตำแหน่ง
  //slice ส่ง start และ end ให้ และจะไม่เอา เอเลเม้นท์สุดท้ายที่ส่งไป
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Product List Banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col justify-center items-center">
          <div className="text-center space-y-7 px-4">
            <h2 className="md:text-4xl text-4xl font-bold md:leading-snug leading-snug">
              Discover Uniq <span className="text-red">Geek</span>:<br /> Shop
              Our Exclusive Tech-themed Merchandises !
            </h2>
            <p className="text-xl text-[#4A4A4A]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestias officia aspernatur, maxime adipisci distinctio atque
              eveniet sequi harum deserunt omnis quam incidunt, doloribus
              inventore voluptatem eligendi dolorem! Molestiae, perspiciatis
              libero.
            </p>
            <button className="btn bg-red px-8 py-3 font-semibold text-white rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Product List Banner */}
      <div className="section-container">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8 ">
          {/* Filter */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            {categories.map((category, index) => {
              return (
                <button
                  key={index}
                  onClick={() => filterItems(category)}
                  className={`${
                    selectedCategory === category ? "active" : ""
                  } px-4 py-2 rounded-full`}
                >
                  <p className="capitalize">{category}</p>
                </button>
              );
            })}
          </div>
          {/* Sort Option */}
          <div className="flex justify-end md-4 rounded-sm">
            <div className="bg-red p-2 container mx-auto rounded-lg">
              <select
                id="sort"
                className="bg-red text-white px-2 rounded-sm  "
                onChange={(e) =>
                  handleSortChange(e.target.value, filteredItems)
                }
                value={sortOption}
              >
                <option value={"default"}> Default </option>
                <option value={"A-Z"}> A-Z </option>
                <option value={"Z-A"}> Z-A </option>
                <option value={"low-to-high"}> Low to High </option>
                <option value={"high-to-low"}> High to Low </option>
              </select>
            </div>
          </div>
          {/* Card */}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 section-container">
            {currentItems.map((item, index) => (
              <Card key={index} item={item} />
              // เรียกใช้ callback(ฟังก์ชั่นที่ไม่มีชื่อ) และ รีเทริน array card ออกมาโดยตรง
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center my-8 flex-wrap gap-2">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => {
          return (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded-full ${
                currentPage === index + 1 ? "bg-red text-white" : "bg-gray-200"
              }`}
              onClick={() => {
                paginate(index + 1);
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
