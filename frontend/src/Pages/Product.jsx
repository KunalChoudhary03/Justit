import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { addItem, rmvItem } from '../redux/Slices/Slice'
import { fetchProducts } from '../redux/ProductSlice'
const Product = () => {
  const dispatch = useDispatch()
   const { items, loading, error } = useSelector  ((state) => state.products)
useEffect(()=>{
  dispatch(fetchProducts())
},[])
 if (status === "loading") {
    return <h2 className="text-center text-xl font-semibold mt-10">Loading...</h2>
  }

  if (status === "failed") {
    return <h2 className="text-center text-xl font-semibold mt-10 text-red-600">Error: {error}</h2>
  }
   return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-100 p-8 min-h-screen">
      {items.map((product) => (
        <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h1 className="text-lg font-semibold">{product.title}</h1>
            <p className="text-gray-600 text-sm mt-2">{product.description.slice(0, 60)}...</p>
            <p className="text-lg font-bold mt-3">${product.price}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => dispatch(addItem())}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Add to Cart
              </button>
              <button
                onClick={() => dispatch(rmvItem())}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}



export default Product


