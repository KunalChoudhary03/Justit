import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3000/cart";

// Clear cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      const config = { withCredentials: true, headers: {} };
      if (token) config.headers.Authorization = `Bearer ${token}`;
      const res = await axios.delete(`${API}/clear`, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add to cart
export const addItem = createAsyncThunk(
  "cart/addItem",
  async ({ productId, quantity }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      const config = { withCredentials: true, headers: {} };
      if (token) config.headers.Authorization = `Bearer ${token}`;
      const res = await axios.post(`${API}/addCart`, { productId, quantity }, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get cart
export const getItem = createAsyncThunk(
  "cart/getItem",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      const config = { withCredentials: true, headers: {} };
      if (token) config.headers.Authorization = `Bearer ${token}`;
      const res = await axios.get(`${API}/get`, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Remove item
export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async ({ productId }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      const config = { withCredentials: true, headers: {} };
      if (token) config.headers.Authorization = `Bearer ${token}`;
      const res = await axios.delete(`${API}/remove/${productId}`, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Increase quantity
export const increaseQty = createAsyncThunk(
  "cart/increaseQty",
  async ({ productId }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      const config = { withCredentials: true, headers: {} };
      if (token) config.headers.Authorization = `Bearer ${token}`;
      const res = await axios.post(`${API}/increaseQty`, { productId }, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Decrease quantity
export const decreaseItem = createAsyncThunk(
  "cart/decreaseQty",
  async ({ productId }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      const config = { withCredentials: true, headers: {} };
      if (token) config.headers.Authorization = `Bearer ${token}`;
      const res = await axios.put(`${API}/decreaseQty`, { productId }, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
