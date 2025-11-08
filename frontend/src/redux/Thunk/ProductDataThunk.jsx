import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  try {
    const res = await axios.get("http://localhost:3000/product/products");
    return res.data; 
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }

});

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3000/product/delete/${id}`);
    return { id, message: res.data.message }; // return deleted product id
  } catch (error) {
    console.error("Error deleting product:", error.message);
    throw error;
  }
});



export const addProduct = createAsyncThunk(
  "product/add",
  async (product, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3000/product/add", product);
      return res.data; 
    } catch (error) {
      console.error("Error adding product:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/edit",
  async ({ id, product }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`http://localhost:3000/product/update/${id}`, product);
      return res.data; 
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);