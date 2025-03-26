import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn : false,
    isError : false
}

export const authSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setIsLoggedIn(state, action){
            if(action.payload.result_rows) {
                state.isLoggedIn = true;
            } else {
                state.isError = true;
            }
        },
        setIsLogout(state) {
            state.isLoggedIn = false;
        },
        setLoginReset(state) {
            state.isError = false;
        }
    },
})

export const { setIsLoggedIn, setIsLogout, setLoginReset } = authSlice.actions
export default authSlice.reducer