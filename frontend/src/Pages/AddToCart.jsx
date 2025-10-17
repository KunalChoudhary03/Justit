import React from 'react'
import { useSelector } from 'react-redux'

const AddToCart = () => {
  const cartValue = useSelector((state) => state.cart.value)

  return (
    <div className="flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-full hover:shadow-xl transition-shadow duration-200 cursor-pointer">
      <span className="text-xl">🛒</span>
      <span className="font-semibold text-gray-800">Cart</span>
      <span className="ml-2 text-sm text-white bg-red-600 rounded-full px-3 py-1 font-medium">
        {cartValue}
      </span>
    </div>
  )
}

export default AddToCart
