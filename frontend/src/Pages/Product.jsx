import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/Thunk/ProductDataThunk";
import AddToCartBtn from "../Components/AddToCartBtn";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BannerSlider from "../Components/BannerSlider";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.products);
  const searchQuery = useSelector((state) =>
    state.search.query ? state.search.query.toLowerCase() : ""
  );

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

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="text-center mt-10 px-5">
        <h2 className="text-xl font-semibold text-gray-800">Loading...</h2>
        <p className="mt-3 text-sm text-red-600 max-w-md mx-auto">
          We are currently using a free server, so product loading may take up to{" "}
          <span className="font-semibold">30 seconds</span>.
          <br />
          Thank you for your patience — please wait or refresh the page.
        </p>
      </div>
    );

  if (error)
    return (
      <h2 className="text-center text-xl font-semibold mt-10 text-red-600">
        Error: {error}
      </h2>
    );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-10 px-5">
      {/* Banner */}
      <BannerSlider />

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-5 mb-10 bg-white shadow-md p-5 rounded-2xl border border-gray-100">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-700">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
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
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
        >
          Reset
        </button>
      </div>

      {/* No Results */}
      {filteredItems.length === 0 && (
        <p className="text-center text-gray-600 text-lg">
          No products match your filters.
        </p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {currentItems.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden relative flex flex-col cursor-pointer hover:shadow-2xl"
          >
            <div
              onClick={() => navigate(`/details/${product._id}`)}
              className="w-full"
            >
              <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full shadow">
                {product.category}
              </div>
              <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                {product.price}
              </div>
            </div>

            <div className="p-4 flex flex-col flex-1 w-full">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 truncate">
                {product.name}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm flex-1">
                {product.description?.slice(0, 55)}...
              </p>

              <div className="mt-3 flex justify-center">
                <AddToCartBtn productId={product._id} quantity={1} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {filteredItems.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-12 gap-3 flex-wrap">
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
                  : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
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
