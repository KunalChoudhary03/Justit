import {configureStore} from "@reduxjs/toolkit"
import cartReducer from '../redux/Slices/Slice'
import productsReducer from "./ProductSlice"
import authReducer from "./Slices/AuthSlice";
const store = configureStore({
    reducer:{
        cart:cartReducer,
        products:productsReducer,
        auth:authReducer
    }
})

export default  store;