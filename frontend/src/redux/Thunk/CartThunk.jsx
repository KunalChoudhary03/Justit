import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3000/cart";

// Add to cart
export const addItem = createAsyncThunk(
  "cart/addItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/addCart`,
        { productId, quantity },
        { withCredentials: true } // cookie will be sent
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get cart
export const getItem = createAsyncThunk(
  "cart/getItem",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/get`, { withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Remove item
export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API}/remove/${productId}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Increase quantity
export const increaseQty = createAsyncThunk(
  "cart/increaseQty",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API}/increaseQty`,
        { productId },
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Decrease quantity
export const decreaseItem = createAsyncThunk(
  "cart/decreaseQty",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API}/decreaseQty`,
        { productId },
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
