import { setIsLoggedIn, setIsLogout, setLoginReset } from "../features/auth/authSlice.js";
import { axiosPost } from "./api.js";

export const getLoginReset = () => (dispatch) => {
    dispatch(setLoginReset());
}

export const getLogout = () => (dispatch) => {
    dispatch(setIsLogout());
    localStorage.clear();  //로컬스토리지 전체 삭제    
}

export const getLogin = (formData) => async(dispatch) => {    
    const url = 'http://3.39.192.201:9000/member/login';
    const data = formData;

    const loginResult = await axiosPost({url, data});
    const result_rows = loginResult.result_rows;

    if(result_rows) { 
        localStorage.setItem("token", loginResult.token);
        localStorage.setItem("user_id", formData.id);                        
        dispatch(setIsLoggedIn({result_rows}));  
    } else { 
        dispatch(setIsLoggedIn({result_rows}));  
    }
}