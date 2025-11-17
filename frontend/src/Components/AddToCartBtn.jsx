import { useDispatch, useSelector } from "react-redux";
import { addItem, getItem } from "../redux/Thunk/CartThunk";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddToCartBtn = ({ productId, quantity = 1 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const checkLogin = () => {
    if (!token) {
      toast.info("Please login to add items to your cart 🛒", {
        position: "top-center",
        autoClose: 1500,
      });
      setTimeout(() => navigate("/login"), 1000);
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {

    if (!checkLogin()) return;

    if (!productId) {
      toast.error("Product ID missing!");
      return;
    }

    dispatch(addItem({ productId, quantity }))
      .unwrap()
      .then(() => {
        dispatch(getItem());
        toast.success("Product added to cart!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add product to cart");
      });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
