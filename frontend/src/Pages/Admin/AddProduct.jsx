import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addProduct } from "../../redux/Thunk/ProductDataThunk"; 
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const dispatch = useDispatch();
 const navigate = useNavigate()
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    id: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addProduct(product)).unwrap(); 
      toast.success(" Product added successfully!");
      setProduct({
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
        id: "",
      });
    } catch (err) {
      toast.error(" Error adding product");
      console.error(err);
    }
  };

  return (
  <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10">
    <div className="w-full max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Add Product</h1>
        <button
          onClick={() => navigate('/admin')}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
        >
          Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        
        {["name", "price", "image", "description", "category", "id"].map((field) => (
          <div key={field}>
            <label className="block font-semibold text-gray-600 mb-2 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={product[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg transition"
        >
          Add Product
        </button>
      </form>
    </div>
  </div>
);
}

export default AddProduct
