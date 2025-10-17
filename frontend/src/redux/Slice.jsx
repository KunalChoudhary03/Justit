import { createSlice } from "@reduxjs/toolkit"

const initialState={
    value:0
}
const addToCart = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addItem:(state)=>{
            state.value+=1
        },
            rmvItem:(state)=>{
                state.value>0 ?
              state.value-=1:null
        },
        rmvAll:(state)=>{
            state.value=0
        }
    }
})

export const {addItem,rmvItem,rmvAll} = addToCart.actions
export default addToCart.reducer
