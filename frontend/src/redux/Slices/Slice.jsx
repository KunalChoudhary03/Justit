import { createSlice } from "@reduxjs/toolkit";
import { addItem, getItem, removeItem, increaseQty, decreaseItem, clearCart } 
from "../Thunk/CartThunk";

// convert price to number safely (simple version)
const toNumber = (price) => {
  if (!price) return 0;

  // if already numeric
  if (typeof price === "number") return price;

  // if string: remove ₹,/kg etc → keep only digits
  const match = price.toString().match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
};

// Calculate totals
const calculateTotals = (items) => {
  const valid = items.filter((i) => i?.productId);

  const qty = valid.reduce((sum, i) => sum + (i.quantity || 0), 0);

  const price = valid.reduce(
    (sum, i) => sum + (i.quantity || 0) * toNumber(i.productId.price),
    0
  );

  return {
    totalQuantity: qty,
    totalPrice: Math.round(price * 100) / 100,
  };
};

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handleFulfilled = (state, action) => {
      state.cartItems = action.payload.items || [];
      const totals = calculateTotals(state.cartItems);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    };

    builder
      .addCase(getItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.loading = false;
        handleFulfilled(state, action);
      })
      .addCase(getItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItem.fulfilled, handleFulfilled)
      .addCase(removeItem.fulfilled, handleFulfilled)
      .addCase(increaseQty.fulfilled, handleFulfilled)
      .addCase(decreaseItem.fulfilled, handleFulfilled)
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
      });
  },
});

export default cartSlice.reducer;
