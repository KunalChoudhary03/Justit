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
  extraReducers: (builder) => {
    // GET CART
    builder
      .addCase(getItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items || [];
        // Calculate totals
        state.totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        state.totalPrice = state.cartItems.reduce(
          (sum, item) => sum + item.quantity * parseFloat(item.productId.price.replace(/₹|\/kg|\/500g/g,'')),
          0
        );
      })
      .addCase(getItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ADD ITEM
    builder.addCase(addItem.fulfilled, (state, action) => {
      state.cartItems = action.payload.items;
      state.totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.quantity * parseFloat(item.productId.price.replace(/₹|\/kg|\/500g/g,'')),
        0
      );
    });

    // REMOVE ITEM
    builder.addCase(removeItem.fulfilled, (state, action) => {
      state.cartItems = action.payload.items;
      state.totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.quantity * parseFloat(item.productId.price.replace(/₹|\/kg|\/500g/g,'')),
        0
      );
    });

    // INCREASE QTY
    builder.addCase(increaseQty.fulfilled, (state, action) => {
      state.cartItems = action.payload.items;
      state.totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.quantity * parseFloat(item.productId.price.replace(/₹|\/kg|\/500g/g,'')),
        0
      );
    });

    // DECREASE QTY
    builder.addCase(decreaseItem.fulfilled, (state, action) => {
      state.cartItems = action.payload.items;
      state.totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.quantity * parseFloat(item.productId.price.replace(/₹|\/kg|\/500g/g,'')),
        0
      );
    });
  },
});

export default cartSlice.reducer;
