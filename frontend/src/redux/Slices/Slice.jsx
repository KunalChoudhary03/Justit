import { createSlice } from "@reduxjs/toolkit";
import { addItem, getItem, removeItem, increaseQty, decreaseItem } from "../Thunk/CartThunk";



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

  // ----- Extra reducers for thunks -----
  extraReducers: (builder) => {
    // ========================
    // GET CART FROM DB
    // ========================
    builder
      .addCase(getItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items || [];
        state.totalQuantity = action.payload.totalQuantity || 0;
        state.totalPrice = action.payload.totalPrice || 0;
      })
      .addCase(getItem.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload; 
});

 

    // ========================
    // ADD ITEM
    // ========================
    builder
      .addCase(addItem.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
      });

    // ========================
    // REMOVE ITEM
    // ========================
    builder
      .addCase(removeItem.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
      });

    // ========================
    // INCREASE QTY
    // ========================
    builder
      .addCase(increaseQty.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
      });

    // ========================
    // DECREASE QTY
    // ========================
    builder
      .addCase(decreaseItem.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
      });
  },
});

export default cartSlice.reducer;
