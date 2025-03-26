import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productList : [],
    product: {},
    imgList : [],
    detailImgList: [],
    size : 'XS'
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductList(state, action){
            state.productList = action.payload.result;
        },
        setProduct(state, action){
            state.product = action.payload.product;
        },
        setImgList(state, action){
            state.imgList = action.payload.imgList;
        },
        setDetailImgList(state, action){
            state.detailImgList = action.payload.detailImgList;
        },
        setSize(state, action){
            state.size = action.payload.size;
        }
    },
})

export const {  setProductList,
                setProduct,
                setImgList,
                setDetailImgList,
                setSize
    } = productSlice.actions
export default productSlice.reducer