import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderList: [],
    orderPrice : 0,
    member : {},
    isSaved : false
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderList(state, action) {
            state.orderList = action.payload.result;
        },
        setMember(state, action){
            state.member = action.payload.member;
        },
        setIsSaveSuccess(state, action) {
            if(action.payload.result_rows) state.isSaved = true;
        }
    },
})

export const { setOrderList, setMember, setIsSaveSuccess } = orderSlice.actions
export default orderSlice.reducer