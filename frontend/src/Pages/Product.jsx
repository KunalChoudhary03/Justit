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
      <div className="bg-white shadow-sm p-4 rounded-xl border border-gray-200 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                Category:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="newest">Newest</option>
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
              </select>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="text-sm text-white bg-green-600 hover:bg-green-700 font-medium px-4 py-2 rounded-lg transition whitespace-nowrap"
          >
            Reset Filters
          </button>
        </div>

        {/* Results Count */}
        <p className="text-xs text-gray-600 mt-3">
          Showing <span className="font-semibold">{currentItems.length}</span> of{" "}
          <span className="font-semibold">{filteredItems.length}</span> products
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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {currentItems.map((product, idx) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.05 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden flex flex-col transition-shadow"
          >
            {/* Image */}
            <div
              onClick={() => navigate(`/details/${product._id}`)}
              className="cursor-pointer relative group"
            >
              <div className="relative w-full h-40 sm:h-56 md:h-64 lg:h-72 flex items-center justify-center bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full object-contain p-2 group-hover:scale-105 transition-transform"
                  onError={(e) => (e.target.src = "/placeholder.png")}
                />
              </div>
              {/* Category Badge */}
              <span className="absolute top-2 left-2 text-[10px] sm:text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-1 rounded-full border border-emerald-100">
                {product.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col flex-1">
              {/* Name */}
              <h2 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2 hover:text-green-600 cursor-pointer" onClick={() => navigate(`/details/${product._id}`)}>
                {product.name}
              </h2>

              {/* Price */}
              <p className="text-green-700 font-bold text-base mt-2">
                ₹{parseFloat(product.price).toFixed(2)}
              </p>

              {/* Description */}
              <p className="text-gray-500 text-xs mt-1 line-clamp-2 flex-1">
                {product.description}
              </p>

              {/* Add to Cart */}
              <div className="mt-3">
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