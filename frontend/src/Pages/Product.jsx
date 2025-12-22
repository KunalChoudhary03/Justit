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
          Please wait or refresh the page.
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
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-8 px-4">
      {/* Banner */}
      <BannerSlider />

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 bg-white shadow-sm p-4 rounded-xl border">
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
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
          className="text-sm text-gray-800 font-medium hover:underline"
        >
          Reset
        </button>
      </div>

      {/* No Results */}
      {filteredItems.length === 0 && (
        <p className="text-center text-gray-600 text-base">
          No products found.
        </p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {currentItems.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden flex flex-col"
          >
            {/* Image */}
            <div
              onClick={() => navigate(`/details/${product._id}`)}
              className="cursor-pointer"
            >
              <div className="relative w-full h-40 sm:h-56 md:h-64 lg:h-72 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full object-contain p-2"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col flex-1">
              {/* Category */}
              <span className="text-[11px] text-gray-500 mb-1">
                {product.category}
              </span>

              {/* Name */}
              <h2 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">
                {product.name}
              </h2>

              {/* Price */}
              <p className="text-green-500 font-bold text-sm mt-1">
                {product.price}
              </p>

              {/* Description */}
              <p className="text-gray-500 text-xs mt-1 line-clamp-2 flex-1">
                {product.description}
              </p>

              {/* Add to Cart */}
              <div className="mt-2">
                <AddToCartBtn productId={product._id} quantity={1} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {filteredItems.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500"
                : "bg-gray-800 text-white"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === i + 1
                  ? "bg-blue-900 text-white"
                  : "bg-white border"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500"
                : "bg-gray-800 text-white"
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
