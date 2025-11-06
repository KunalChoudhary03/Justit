import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/Thunk/ProductDataThunk";
import AddToCartBtn from "../Components/AddToCartBtn";

const Product = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const searchQuery = useSelector((state) => state.search.query.toLowerCase());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = ["All", ...new Set(items.map((p) => p.category))];

  const filteredItems = items.filter((product) => {
    const name = product.name?.toLowerCase() || "";
    const category = product.category?.toLowerCase() || "";
    const matchesSearch =
      name.includes(searchQuery) || category.includes(searchQuery);
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const displayItems = filteredItems;

  // Pagination logic
  const totalPages = Math.ceil(displayItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = displayItems.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (status === "loading") {
    return (
      <h2 className="text-center text-xl font-semibold mt-10">Loading...</h2>
    );
  }

  if (status === "failed") {
    return (
      <h2 className="text-center text-xl font-semibold mt-10 text-red-600">
        Error: {error}
      </h2>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-5 z-10">
      {/* Filter Section - moved to top */}
     

      {/* Banner */}
      <div>
        <img
          className="w-full rounded-3xl p-3 mb-8"
          src="https://cdn.zeptonow.com/production/tr:w-1280,ar-2560-640,pr-true,f-auto,q-80/inventory/banner/257473f7-74bb-439a-915f-6c18d1545cd1.png"
          alt="banner"
        />
      </div>

      {/* No Results */}
      {displayItems.length === 0 && (
        <p className="text-center text-gray-600 text-lg">
          No products match your filters.
        </p>
      )}
 <div className="flex flex-wrap justify-center gap-5 mb-8 bg-white p-4 rounded-xl shadow">
        <div>
          <label className="font-semibold text-gray-700 mr-2">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setSelectedCategory("All");
            setCurrentPage(1);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Reset
        </button>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {currentItems.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 overflow-hidden relative flex flex-col items-center p-3"
          >
            <div className="relative w-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover rounded-md"
              />
              <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-lg shadow">
                {product.category}
              </span>
              <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow">
                ₹{product.price}
              </span>
            </div>

            <div className="p-5 flex flex-col flex-1 w-full">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm flex-1">
                {product.description.slice(0, 50)}...
              </p>

              <div className="mt-4 flex justify-between gap-2">
                <AddToCartBtn product={product} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {displayItems.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-10 gap-3 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-lg font-medium ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
