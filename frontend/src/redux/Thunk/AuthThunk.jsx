import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk("auth/register", async(userData,{rejectWithValue})=>{
    try{
                const { data } = await axios.post(
                    "http://localhost:3000/auth/register",
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
                "http://localhost:3000/auth/login",
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
    await axios.post("http://localhost:3000/auth/logout",
       {},
       {withCredentials:true}
    )
    return null;
})