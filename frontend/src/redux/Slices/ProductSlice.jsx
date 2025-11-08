import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, deleteProduct, addProduct, editProduct } from "../Thunk/ProductDataThunk";

const productSlice = createSlice({
  name: "products",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
       
        state.items = state.items.filter((p) => p._id !== action.payload.id);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload); 
})
      .addCase(editProduct.fulfilled, (state, action) => {
    const index = state.items.findIndex(p => p._id === action.payload._id);
    if(index !== -1) state.items[index] = action.payload;
  })
  .addCase(editProduct.rejected, (state, action) => {
    state.error = action.payload;
  });
      
  },
});

export default productSlice.reducer;



  
