import { createSlice } from "@reduxjs/toolkit";
import { addItem, getItem, removeItem, increaseQty, decreaseItem, clearCart } from "../Thunk/CartThunk";

// Helper to safely extract numeric price from item.productId.price
const extractPrice = (item) => {
  try {
    const priceField = item?.productId?.price;
    if (priceField == null) return 0;

    // If numeric already
    if (typeof priceField === "number") return priceField;

    // If it's an object with common keys
    if (typeof priceField === "object") {
      const possible = priceField.amount ?? priceField.price ?? priceField.value;
      if (typeof possible === "number") return possible;
      if (typeof possible === "string") {
        const cleanedPossible = possible.replace(/[^0-9.\-]/g, "");
        const p = parseFloat(cleanedPossible);
        return Number.isFinite(p) ? p : 0;
      }
      return 0;
    }

    // It's a string: remove commas, currency symbols and units, keep digits and dot
      // It's a string: handle patterns like "₹180/500g" or "180 per 500g"
      let str = priceField.toString();
      // If there is a slash (price/unit), take the part before it (the rupee amount)
      if (str.includes("/")) {
        str = str.split("/")[0];
      }
      // Also handle 'per' keywords: '180 per 500g'
      if (/\bper\b/i.test(str)) {
        str = str.split(/\bper\b/i)[0];
      }
      // Remove commas and any non-digit/decimal/minus characters, but keep the first matched number
      const noCommas = str.replace(/,/g, "");
      const match = noCommas.match(/-?\d+(?:\.\d+)?/);
      if (match) {
        const p = parseFloat(match[0]);
        return Number.isFinite(p) ? p : 0;
      }
      return 0;
  } catch (err) {
    return 0;
  }
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
    // GET CART
    builder
      .addCase(getItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items || [];
        // Calculate totals (only for items with a populated product)
        const validItems = state.cartItems.filter((it) => it && it.productId);
        state.totalQuantity = validItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
        // compute and round to 2 decimals to avoid floating point issues
        const total = validItems.reduce(
          (sum, item) => sum + (Number(item.quantity) || 0) * extractPrice(item),
          0
        );
        state.totalPrice = Math.round(total * 100) / 100;
      })
      .addCase(getItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ADD ITEM
    builder.addCase(addItem.fulfilled, (state, action) => {
      state.cartItems = action.payload.items;
      const validItemsAdd = state.cartItems.filter((it) => it && it.productId);
      state.totalQuantity = validItemsAdd.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
      const totalAdd = validItemsAdd.reduce(
        (sum, item) => sum + (Number(item.quantity) || 0) * extractPrice(item),
        0
      );
      state.totalPrice = Math.round(totalAdd * 100) / 100;
    });

    // REMOVE ITEM
    builder.addCase(removeItem.fulfilled, (state, action) => {
      state.cartItems = action.payload.items;
      const validItemsRemove = state.cartItems.filter((it) => it && it.productId);
      state.totalQuantity = validItemsRemove.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
      const totalRemove = validItemsRemove.reduce(
        (sum, item) => sum + (Number(item.quantity) || 0) * extractPrice(item),
        0
      );
      state.totalPrice = Math.round(totalRemove * 100) / 100;
    });

    // INCREASE QTY
    builder.addCase(increaseQty.fulfilled, (state, action) => {
      state.cartItems = action.payload.items;
      const validItemsInc = state.cartItems.filter((it) => it && it.productId);
      state.totalQuantity = validItemsInc.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
      const totalInc = validItemsInc.reduce(
        (sum, item) => sum + (Number(item.quantity) || 0) * extractPrice(item),
        0
      );
      state.totalPrice = Math.round(totalInc * 100) / 100;
    });

    // DECREASE QTY
    builder.addCase(decreaseItem.fulfilled, (state, action) => {
      state.cartItems = action.payload.items;
      const validItemsDec = state.cartItems.filter((it) => it && it.productId);
      state.totalQuantity = validItemsDec.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
      const totalDec = validItemsDec.reduce(
        (sum, item) => sum + (Number(item.quantity) || 0) * extractPrice(item),
        0
      );
      state.totalPrice = Math.round(totalDec * 100) / 100;
    });

    // CLEAR CART
    builder.addCase(clearCart.fulfilled, (state, action) => {
      // backend returns populated cart (likely with items: [])
      state.cartItems = action.payload.items || [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    });
  },
});

export default cartSlice.reducer;
