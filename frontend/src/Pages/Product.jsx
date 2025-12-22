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
  const [sortBy, setSortBy] = useState("newest"); // NEW: Sort option
  const itemsPerPage = 12; // Increased from 8

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = ["All", ...new Set(items.map((p) => p.category))];

  let filteredItems = items.filter((product) => {
    const name = product.name?.toLowerCase() || "";
    const category = product.category?.toLowerCase() || "";
    const matchesSearch =
      name.includes(searchQuery) || category.includes(searchQuery);
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // NEW: Sorting logic
  if (sortBy === "price-low") {
    filteredItems.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sortBy === "price-high") {
    filteredItems.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (sortBy === "name") {
    filteredItems.sort((a, b) => a.name.localeCompare(b.name));
  }

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSelectedCategory("All");
    setSortBy("newest");
    setCurrentPage(1);
  };

  if (loading)
    return (
      <div className="text-center mt-10 px-5">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Loading Products...</h2>
        <p className="mt-3 text-sm text-gray-600 max-w-md mx-auto">
          We are currently using a free server, so product loading may take up to{" "}
          <span className="font-semibold">30 seconds</span>.
          <br />
          Please wait or refresh the page.
        </p>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-10 px-5">
        <h2 className="text-xl font-semibold text-red-600">Error Loading Products</h2>
        <p className="text-gray-600 mt-2">{error}</p>
        <button
          onClick={() => dispatch(fetchProducts())}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-8 px-4">
      {/* Banner */}
      <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
        <BannerSlider />
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-r from-white to-gray-50 shadow-md p-5 rounded-2xl border border-gray-100 mb-8 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            {/* Category Filter */}
            <div className="flex flex-col gap-2 flex-1 sm:flex-none">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                📁 Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition hover:border-gray-300"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex flex-col gap-2 flex-1 sm:flex-none">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                ⬍ Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition hover:border-gray-300"
              >
                <option value="newest">✨ Newest First</option>
                <option value="name">🔤 Name (A-Z)</option>
                <option value="price-low">💰 Price (Low to High)</option>
                <option value="price-high">💎 Price (High to Low)</option>
              </select>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="text-sm text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 font-bold px-6 py-2.5 rounded-xl transition shadow-md hover:shadow-lg whitespace-nowrap transform hover:scale-105"
          >
            🔄 Reset
          </button>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-600 mt-4 font-medium">
          📦 <span className="font-bold text-green-600">{currentItems.length}</span> of{" "}
          <span className="font-bold text-green-600">{filteredItems.length}</span> products
        </p>
      </div>

      {/* No Results */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-600 text-base font-medium">No products found</p>
          <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or search term</p>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
        {currentItems.map((product, idx) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.05 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden flex flex-col transition-all duration-300 border border-gray-100 hover:border-green-200"
          >
            {/* Image */}
            <div
              onClick={() => navigate(`/details/${product._id}`)}
              className="cursor-pointer relative group"
            >
              <div className="relative w-full h-40 sm:h-56 md:h-64 lg:h-72 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full object-contain p-3 group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => (e.target.src = "/placeholder.png")}
                />
              </div>
              {/* Category Badge */}
              <span className="absolute top-3 left-3 text-[10px] sm:text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-full border border-emerald-200 shadow-sm">
                {product.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              {/* Name */}
              <h2 
                className="text-sm sm:text-base font-bold text-gray-900 leading-tight line-clamp-2 hover:text-green-600 cursor-pointer transition mb-2" 
                onClick={() => navigate(`/details/${product._id}`)}
              >
                {product.name}
              </h2>

              {/* Price */}
              <p className="text-lg sm:text-xl font-black text-green-600 mb-2">
                ₹{product.price ? parseFloat(product.price).toFixed(2) : "N/A"}
              </p>

              {/* Description */}
              <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 flex-1 mb-3">
                {product.description}
              </p>

              {/* Add to Cart */}
              <div className="mt-auto">
                <AddToCartBtn productId={product._id} quantity={1} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {filteredItems.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-12 gap-2 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            ← Prev
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => {
              // Show max 5 page buttons
              if (totalPages <= 5 || i < 2 || i > totalPages - 3 || Math.abs(i - (currentPage - 1)) <= 1) {
                return (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      currentPage === i + 1
                        ? "bg-green-600 text-white"
                        : "bg-white border border-gray-300 hover:border-green-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              } else if (i === 2) {
                return <span key="dots" className="px-2 py-2">...</span>;
              }
              return null;
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;