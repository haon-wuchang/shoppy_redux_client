import React, { useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { FiShoppingBag } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { useSelector, useDispatch } from 'react-redux';
import { getLogout } from '../services/authApi.js';
import { getCount, clearCount } from '../services/cartApi.js';

export default function Header() {
    const dispatch = useDispatch();
    const cartCount = useSelector(state => state.cart.cartCount);
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const navigate = useNavigate();
    const id = localStorage.getItem("user_id");

    useEffect(()=>{
        isLoggedIn ?    dispatch(getCount()) :   dispatch(clearCount());
    }, [isLoggedIn]);

    const handleLoginToggle = () => {
        if(isLoggedIn) { 
            const select = window.confirm("정말로 로그아웃 하시겠습니까?");
            if(select) {
                dispatch(getLogout());
                navigate("/");
            }    
        } else {  
            navigate('/login');
        }
    }   

    return (
        <div className='header-outer'>
            <div className='header'>
                <Link to='/' className='header-left'>
                    <FiShoppingBag />
                    <span>Shoppy-Redux</span>
                </Link>
                <nav className='header-right'>
                    
                    <Link to='/all'>Products</Link>
                    <Link to='/cart' className="header-icons-cart-link">
                        <LuShoppingCart className='header-icons'/>
                        <span className='header-icons-cart'>{cartCount}</span>
                    </Link>
                    { isLoggedIn && 
                        <Link to='/mypage'>MyPage</Link>
                    }
                    <button type="button" onClick={handleLoginToggle}>
                        { isLoggedIn ? "Logout" : "Login" }
                    </button>

                    { !isLoggedIn &&
                        <Link to='/signup'>
                            <button type="button">Signup</button>
                        </Link>                      
                    }
                    
                    { isLoggedIn && 
                        <Link to='/products/new'>
                            <button type="button">New Product</button>
                        </Link> 
                    }
                    { isLoggedIn &&   <Link>[{id}]님</Link> }                    
                </nav>
            </div>
        </div>
    );
}

