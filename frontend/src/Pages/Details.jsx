import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/Thunk/ProductDataThunk";
import AddToCartBtn from "../Components/AddToCartBtn";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    } else {
      const found = items.find((item) => item._id === id);
      setProduct(found);
    }
  }, [dispatch, items, id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;
  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-5">
      <button className="bg-gray-300 p-3 m-4 rounded-lg mb-4 " onClick={()=>{navigate('/')}}>Back</button>
      <div className="flex flex-col md:flex-row gap-10 bg-white p-6 rounded-xl shadow">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-cover rounded-xl"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <span className="text-xl font-semibold text-green-600">
              {product.price}
            </span>
          </div>
          <div className="mt-6">
            <AddToCartBtn product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
