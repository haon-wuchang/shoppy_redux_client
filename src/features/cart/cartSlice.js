import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartList : [],
    cartCount : 0,
    totalPrice : 0,
    isAdded : false
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartCount(state, action){
            state.cartCount = action.payload.resultCount;
        },
        clearCartCount(state) {
            state.cartCount = 0;
        },
        setCartList(state, action) {
            state.cartList = action.payload.result;  
        },
        cartListReset(state) {
            state.cartList = [];
        },
        setTotalPrice(state, action) {
            const list = action.payload.result;
            state.totalPrice = list.reduce((sum, item) => sum + item.price * item.qty, 0);
        },
        setIsAdded(state, action) {
            if(action.payload.result_rows) state.isAdded = true;
        },
        setIsAddedReset(state){
            state.isAdded = false;
        }
    },
})

export const {  setCartCount, 
                clearCartCount, 
                cartListReset, 
                setCartList, 
                setTotalPrice,
                setIsAdded,
                setIsAddedReset } = cartSlice.actions
export default cartSlice.reducer