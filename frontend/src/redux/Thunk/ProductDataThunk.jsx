import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/product/products`);
    return res.data; 
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }

});

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  try {
    const res = await axios.delete(`${BACKEND_URL}/product/delete/${id}`);
    return { id, message: res.data.message }; 
  } catch (error) {
    console.error("Error deleting product:", error.message);
    throw error;
  }
});



export const addProduct = createAsyncThunk(
  "product/add",
  async (product, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/product/add`, product);
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
      const res = await axios.put(`${BACKEND_URL}/product/update/${id}`, product);
      return res.data; 
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);