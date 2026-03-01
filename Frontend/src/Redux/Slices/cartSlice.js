import {createSlice} from "@reduxjs/toolkit";

 const initialState ={
    cartItems:[],
    totalQuantity:0,
    totalPrice:0,
 }
  const cartSlice = createSlice({
    name:"cart",
    initialState,
  reducers:{
    addToCart:(state,action)=>{
        const item = action.payload;
        const existingItem = state.cartItems.find((it)=>it._id == item._id);

        if(existingItem){
            existingItem.quantity += item.quantity;
            existingItem.totalPrice = existingItem.quantity * existingItem.price;
        }else{
            state.cartItems.push({
                ...item,
                quantity:item.quantity,
                totalPrice:item.quantity * item.price,
            });
            state.totalQuantity += item.quantity;
            state.totalPrice += item.quantity * item.price;
        }
    },
    removeFromCart:(state,action)=>{
        const itemId = action.payload;
        const existingItem = state.cartItems.find((it)=>it._id == itemId);
        if(existingItem){
            state.cartItems = state.cartItems.filter((it)=>it._id != itemId);
            state.totalQuantity -= existingItem.quantity;
            state.totalPrice -= existingItem.totalPrice;
        }
    },
    clearCart:(state)=>{
        state.cartItems = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
    },
    updateCartItemQuantity:(state,action)=>{
        const {itemId,quantity} = action.payload;
        const existingItem = state.cartItems.find((it)=>it._id == itemId);
        if(existingItem){
            existingItem.quantity = quantity;
            existingItem.totalPrice = quantity * existingItem.price;
        }
    },
  }
  })
  export const {addToCart,removeFromCart,clearCart,updateCartItemQuantity} = cartSlice.actions;
  export default cartSlice.reducer;