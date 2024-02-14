import { useEffect, useState } from "react";
import Card from "../../../components/Card";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOptions, setSortOptions] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPages, setItemPerPages] = useState(8);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/product.json");
        const data = await response.json();
        setProducts(data);
        setFilteredItems(data);
        setCategories(["all", ...new Set(data.map((item) => item.category))]);
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
    handleSortChange(sortOptions, filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (option, products) => {
    setSortOptions(option);
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
        sortedItems.sort((a, b) => a.price - b.price);
        break;
    }
    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  const indexOfLastItem = itemPerPages * currentPage ;
  const indexOfFirstItem = indexOfLastItem - itemPerPages;
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
                className={`${
                  selectedCategory === category ? "active" : ""
                } px-4 py-2 rounded-full`}
              >
                <p className="capitalize">{category}</p>
              </button>
            ))}
          </div>
          {/* Sort Option */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2">
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
      {/* 
      {Array.from({
    length: Math.ceil(filteredItems.length / itemPerPage),
  }).map((_, index) => (
    <button
      key={index}
      className={`mx-1 px-3 py-1 rounded-full ${
        currentPage === index ? "bg-red text-white" : "bg-gray-200"
      }`}
      onClick={() => {
        paginate(index);
      }}
    >
      {index + 1}
    </button>
  ))}
      
      
      
      */}
      <div className="flex justify-center  my-8 items-center space-x-2 gap-2">
      {Array.from({
    length: Math.ceil(filteredItems.length / itemPerPages),
  }).map((_, index) => (
    <button
      key={index}
      className={`mx-1 px-3 py-1 rounded-full ${
        currentPage === index ? "bg-red text-white" : "bg-gray-200"
      }`}
      onClick={() => {
        paginate(index);
      }}
    >
      {index + 1}
    </button>
  ))}
      </div>
    </div>
  );
};

export default ProductList;
