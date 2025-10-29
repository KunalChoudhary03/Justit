import { createSlice } from "@reduxjs/toolkit"
const extractNumber = (priceString) => {
  const match = String(priceString).match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
};

const initialState={
   cartItems:[],
   totalQuantity:0,
   totalPrice:0
}
const addToCart = createSlice({
    name: "cart",
    initialState,
    reducers:{
      addItem:(state,action)=>{
        let item = action.payload
        let existingItem = state.cartItems.find(i=> i.id == item.id)

         if(existingItem){
           existingItem.quantity +=1
         }
         else{
           state.cartItems.push({...item,quantity:1})
         }
         state.totalQuantity += 1;
         state.totalPrice += extractNumber(item.price)
        },
        rmvItem:(state,action)=>{
                let id  = action.payload;
                let existingItem = state.cartItems.find(i=> i.id == id)
                if(existingItem){
                    state.totalQuantity -= existingItem.quantity;
                    state.totalPrice -= extractNumber(existingItem.price) * existingItem.quantity
                    state.cartItems = state.cartItems.filter(i=> i.id !== id) 
                }
        },
        decreaseItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(i => i.id === id);

      if (existingItem) {
        existingItem.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= extractNumber(existingItem.price);

        if (existingItem.quantity <= 0) {
          state.cartItems = state.cartItems.filter(i => i.id !== id);
        }
      }
    },
        rmvAll:(state)=>{
            state.cartItems = [];
          state.totalQuantity = 0;
           state.totalPrice = 0;
        }
    }
})

export const { addItem,rmvItem,decreaseItem,rmvAll} = addToCart.actions
export default addToCart.reducer
