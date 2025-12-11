import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const registerUser = createAsyncThunk("auth/register", async(userData,{rejectWithValue})=>{
    try{
                const { data } = await axios.post(
                    `${BACKEND_URL}/auth/register`,
                    userData,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
        return data;
    }catch(error){
        return rejectWithValue(error.response?.data || error.message);
    }
});


export const loginUser = createAsyncThunk("auth/login", async(credentials,{rejectWithValue})=>{
    try{
            const {data} =  await axios.post(
                `${BACKEND_URL}/auth/login`,
                credentials,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
      return data;
    }catch(error){
        return rejectWithValue(error.response?.data || error.message);
    }
})

export const logoutUser = createAsyncThunk("auth/logout", async()=>{
    await axios.post(`${BACKEND_URL}/auth/logout`,
       {},
       {withCredentials:true}
    )
    return null;
})

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (credential, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/auth/login/google`,
        { credential },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      return data; // return token + user
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const googleLogout = createAsyncThunk(
  "auth/googleLogout",
  async () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }

    await axios.post(`${BACKEND_URL}/auth/logout`, {}, { withCredentials: true });

    return true;
  }
);

