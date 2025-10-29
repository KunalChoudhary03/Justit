import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, rmvItem } from "../redux/Slices/Slice";
import { fetchProducts } from "../redux/Thunk/ProductDataThunk";
import { toast } from "react-toastify";

const Product = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const searchQuery = useSelector((state) => state.search.query.toLowerCase());

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredItems = items.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery) ||
      product.category?.toLowerCase().includes(searchQuery)
  );

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
     <div className="">
      <img className="w-full rounded-5xl p-3 mb-8" src="https://cdn.zeptonow.com/production/tr:w-1280,ar-2560-640,pr-true,f-auto,q-80/inventory/banner/257473f7-74bb-439a-915f-6c18d1545cd1.png" alt="" />
      </div>

      {filteredItems.length === 0 && (
        <p className="text-center text-gray-600 text-lg">
          No products match your search.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredItems.map((product) => (
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
                {product.price}
              </span>
            </div>

            <div className="p-5 flex flex-col flex-1 w-full">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm flex-1">
                {product.description.slice(0, 80)}...
              </p>

              <div className="mt-4 flex justify-between gap-2">
               <button
  onClick={() => {
    dispatch(addItem(product));
    toast.success("Item added to cart! 🛒", {
      position: "top-right",
      autoClose: 2000,
    });
  }}
  className="flex-1 bg-gray-100 hover:bg-gray-200 text-green-500 border-green-500 font-semibold py-2 rounded-lg transition-colors"
>
  Add to Cart
</button>

<button
  onClick={() => {
    dispatch(rmvItem(product._id)); 
    toast.info("Item removed from cart.", {
      position: "top-right",
      autoClose: 2000,
    });
  }}
  className="flex-1 bg-gray-100 hover:bg-gray-200 text-red-500 border-red-500 font-semibold py-2 rounded-lg transition-colors"
>
  Remove
</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
