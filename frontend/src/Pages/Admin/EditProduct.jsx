import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, fetchProducts } from "../../redux/Thunk/ProductDataThunk";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams(); // get _id from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  const productToEdit = items.find((p) => p._id === id);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    id: "",
  });

  // Fetch products if not loaded
  useEffect(() => {
    if (!items.length) dispatch(fetchProducts());
  }, [dispatch, items.length]);

  // Pre-fill form when productToEdit is available
  useEffect(() => {
    if (productToEdit) setProduct(productToEdit);
  }, [productToEdit]);

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editProduct({ id, product })).unwrap();
      toast.success("Product updated successfully!");
      navigate("/admin/product");
    } catch (err) {
      console.error(err);
      toast.error("Error updating product");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Edit Product</h2>
        {["name", "price", "image", "description", "category", "id"].map(
          (field) => (
            <div key={field}>
              <label className="block font-semibold capitalize mb-1">
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={product[field] || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg w-full p-2 focus:ring focus:ring-green-200"
                required
              />
            </div>
          )
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
