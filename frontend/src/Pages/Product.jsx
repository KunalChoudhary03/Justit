import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addItem, rmvItem } from '../redux/Slices/Slice';
import { fetchProducts } from '../redux/Thunk/ProductDataThunk';

const Product = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <h2 className="text-center text-xl font-semibold mt-10">Loading...</h2>;
  }

  if (status === "failed") {
    return <h2 className="text-center text-xl font-semibold mt-10 text-red-600">Error: {error}</h2>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-5 z-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 object-cover"
              />
              <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-lg shadow">
                New
              </span>
              <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow">
                {product.price}
              </span>
            </div>

            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h2>
              <p className="text-gray-600 text-sm flex-1">{product.description.slice(0, 80)}...</p>

              <div className="mt-4 flex justify-between gap-2">
                <button
                  onClick={() => dispatch(addItem(product))}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => dispatch(rmvItem(product))}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors"
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
