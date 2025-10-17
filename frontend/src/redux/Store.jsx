import {configureStore} from "@reduxjs/toolkit"
import cartReducer from './Slice'
import productsReducer from "./ProductSlice"
const store = configureStore({
    reducer:{
        cart:cartReducer,
        products:productsReducer
    }
})

export default  store;