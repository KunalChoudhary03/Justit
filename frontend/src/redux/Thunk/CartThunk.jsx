
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3000/cart";

//add to cart 

export const addItem = createAsyncThunk(
  "cart/addItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API}/addCart`,
        { productId, quantity },
        { headers: { Authorization: token } }
      );
      return res.data;
    } catch (error) {
     
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status
      });
    }
  }
);


//get cart
export const getItem = createAsyncThunk(
  "getCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/get`, {
         headers: { Authorization: token },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);



export const removeItem = createAsyncThunk("cart/removeItem", async({productId},{rejectWithValue})=>{
    try{
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API}/removeItem`,{productId},{headers:{Authorization: `${token}`}})
  return res.data
    }
    catch(error){
  return rejectWithValue(error)
    }
})

//increase quantity
export const increaseQty = createAsyncThunk("cart/increaseQty", async({productId},{rejectWithValue})=>{
    try{
        const token = localStorage.getItem("token");
        const res = await axios.post(`${API}/increaseQty`,{productId},
            {headers: {Authorization:`${token}`}}
        )
        return res.data;
    }
    catch(error){
   return rejectWithValue(error);
    }
})

//decrease qunatity
export const decreaseItem = createAsyncThunk("cart/decreaseQty",async({productId},{rejectWithValue})=>{
    try{
        const token = localStorage.getItem("token")
        const res = await axios.put(`${API}/decreaseQty`,{productId},{headers:{Authorization : token}});
        return res.data;
    }
    catch(error){
        return rejectWithValue(error);
    }
})
