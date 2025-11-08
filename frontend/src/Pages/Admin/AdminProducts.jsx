import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../redux/Thunk/ProductDataThunk";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="p-6">
     <div className="flex justify-between mb-3"> <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
     <button onClick={()=>{navigate('/admin')}} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg  ">Back</button></div>

      {loading && <p>Loading...</p>}

      <div className="space-y-4">
        {items.map((p) => (
          <div key={p._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            <div>
              <h2 className="font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-500">{p.price} ₹</p>
            </div>
            <div className="space-x-3">
             <button
  onClick={() => navigate(`/admin/editproduct/${p._id}`)}
  className="text-blue-500 hover:underline"
>
  Edit
</button>

              <button
                onClick={() => handleDelete(p._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
