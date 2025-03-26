import "../styles/cart.css";
import "../styles/checkoutinfo.css";
import React, { useState, useEffect, useRef } from "react";
import DaumPostcode from "react-daum-postcode";
import { useSelector, useDispatch } from 'react-redux';
import { getOrderList, paymentKakaoPay, getDeliveryAddressUpdate } from '../services/orderApi.js';

export default function CheckoutInfo() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const orderList = useSelector(state => state.order.orderList);
    const member = useSelector(state => state.order.member);
    const [isVisible, setIsVisible] = useState(false);  //주소 입력창 Toggle
    const [isOpen, setIsOpen] = useState(false);        //주소 검색 버튼 Toggle */

    const [zipcode, setZipcode] = useState("");
    const [address, setAddress] = useState("");    
    const   zipcodeRef = useRef(null), 
            addressRef = useRef(null), 
            detailAddressRef = useRef(null),
            terms1Ref = useRef(null),
            terms2Ref = useRef(null),
            deliveryButtonRef = useRef(null);

    useEffect(()=>{
        if(isLoggedIn) {
            dispatch(getOrderList());
        }
        if(member.zipcode !== null) setIsVisible(!isVisible);
    }, [isLoggedIn]);

    /** 배송지변경 버튼 이벤트 */
    const handleToggle = () => {
        // setIsVisible(isVisible);    
        // detailAddressRef.current.value = '';
        setIsOpen(!isOpen);
    };
console.log('isVisible--->> ', isVisible);
    

    /** 결제하기 버튼 이벤트 처리 */
    const handlePayment = () => {
        if(!(terms1Ref.current.checked && terms2Ref.current.checked)) {
            alert("약관 동의 후 결제가 진행됩니다.");
        } else if(member.zipcode === null) { 
            alert("배송지를 추가해주세요");
            setIsVisible(!isVisible);
            deliveryButtonRef.current.focus();
            deliveryButtonRef.current.style.outline = '3px dotted coral';
        } else if (detailAddressRef.current.value === "") {
            alert("상세 주소를 입력해주세요");
            detailAddressRef.current.focus();
        } else {
            dispatch(paymentKakaoPay(totalPrice, orderList));
        
        }//if
    }//handlePayment


    /** 주소변경 버튼 이벤트 */
    const addressUpdate = () => {        
        const zipcode = zipcodeRef.current.value;
        const address = addressRef.current.value.concat(' ', detailAddressRef.current.value);
        dispatch(getDeliveryAddressUpdate(zipcode, address));        
    }

    //---- DaumPostcode 관련 디자인 및 이벤트 시작 ----//
    const themeObj = {
        bgColor: "#FFFFFF",
        pageBgColor: "#FFFFFF",
        postcodeTextColor: "#C05850",
        emphTextColor: "#222222",
    };

    const postCodeStyle = {
        width: "360px",
        height: "480px",
        left: 1000,
        top:520
    };

    const completeHandler = (data) => {
        setZipcode(data.zonecode);
        setAddress(data.address);
        deliveryButtonRef.current.style.outline = '';
    };

    const closeHandler = (state) => {
        if (state === "FORCE_CLOSE") {
        setIsOpen(false);
        } else if (state === "COMPLETE_CLOSE") {
        setIsOpen(false);
        }
    };
    //---- DaumPostcode 관련 디자인 및 이벤트 종료 ----//
    

return (
    <div className="cart-container">
    <h2 className="cart-header"> 주문/결제</h2>
    <div className="section">
        {/* 구매자 정보 */}
        <h2 className="section-title">구매자정보</h2>
        <div className="info-box">
        <div className="info-grid">
            <div className="label">이름</div>
            <div className="value">{member.name}</div>

            <div className="label">이메일</div>
            <div className="value">{member.email}</div>

            <div className="label">휴대폰 번호</div>
            <div className="value phone-input">
            <input type="text" defaultValue={member.phone} />
            <button className="btn">수정</button>
            </div>
        </div>
        </div>
    </div>
    {/* 받는사람 정보 */}
    <div className="section">
        <h2 className="section-title">
        받는사람정보 &nbsp;&nbsp;&nbsp;
        
        </h2>
        <div className="info-box">
        <div className="info-grid">
            <div className="label">이름</div>
            <div className="value">{member.name}</div>

            <div className="label">배송주소</div>
            {   member.zipcode ? 
                <div className="value">
                    {member.zipcode}/{member.address}
                    <button className="addr-delivery-btn" onClick={handleToggle} ref={deliveryButtonRef}>배송지 변경</button> 
                    { isVisible &&  <>
                        <input type="text" placeholder="우편번호" value={zipcode} className="zipcode" ref={zipcodeRef}/>
                        <input type="text" placeholder="기본주소" value={address} ref={addressRef}/>
                        <input type="text" placeholder="상세주소" ref={detailAddressRef}/>
                        <button className="addr-update-btn" onClick={addressUpdate}>주소 변경</button>
                        </>
                    }               
                </div>
                :
                <div className="addr-value">
                    <button className="addr-delivery-btn" onClick={handleToggle} ref={deliveryButtonRef}>배송지 변경</button>
                    { !isVisible &&  <>
                        <input type="text" placeholder="우편번호" value={zipcode} className="zipcode" ref={zipcodeRef}/>
                        <input type="text" placeholder="기본주소" value={address} ref={addressRef}/>
                        <input type="text" placeholder="상세주소" ref={detailAddressRef}/>
                        <button className="addr-update-btn" onClick={addressUpdate}>주소 변경</button>
                        </>
                    }
                </div>
            }            

            <div className="label">연락처</div>
            <div className="value">{member.phone}/{member.phone}</div>

            <div className="label">배송 요청사항</div>
            <div className="value phone-input">
            <input type="text" defaultValue="문 앞" />
            <button className="btn">변경</button>
            </div>
        </div>
        </div>
    </div>
    {isOpen && (
        <div>
        <DaumPostcode
            className="postmodal"
            theme={themeObj}
            style={postCodeStyle}
            onComplete={completeHandler}
            onClose={closeHandler}
        />
        </div>
    )}

    {/* 주문 정보 */}
    <div className="section">
        <h2 className="section-title">주문 상품</h2>
        <div className="info-box">
        <div className="info-grid">
            { orderList && orderList.map(item => 
                <>
                    <div className="label">상품명</div>
                    <div className="value">
                        <img src={item.image} alt="product image" style={{width:'35px'}} />
                        {item.pname}, {item.info}, 수량({item.qty}), 가격({item.price.toLocaleString()}원)
                    </div>
                </>
            )}
        </div>
        </div>
    </div>

    <div class="section">
        <h2>결제정보</h2>
        <table class="payment-table">
        <tr>
            <td>총상품가격</td>
            <td class="price">{totalPrice.toLocaleString()}원</td>
        </tr>
        <tr>
            <td>즉시할인</td>
            <td class="discount">-0원</td>
        </tr>
        <tr>
            <td>할인쿠폰</td>
            <td class="coupon">
            0원 <span class="info">적용 가능한 할인쿠폰이 없습니다.</span>
            </td>
        </tr>
        <tr>
            <td>배송비</td>
            <td class="price">0원</td>
        </tr>
        <tr>
            <td>쿠페이캐시</td>
            <td class="price">
            0원 <span class="info">보유 : 0원</span>
            </td>
        </tr>
        <tr class="total">
            <td>총결제금액</td>
            <td class="total-price">{totalPrice.toLocaleString()}원</td>
        </tr>
        </table>
    </div>

    <div class="section">
        <h2>결제 수단</h2>
        <div class="payment-method">
            <label class="radio-label">
                <input type="radio" name="payment" checked /> 카카오페이
                <span class="badge">최대 캐시적립</span>
            </label>
        </div>

        <div class="payment-method">
        <label class="radio-label">
            <input type="radio" name="payment" />
            쿠페이 머니 
        </label>
        </div>

        <div class="payment-method">
        <label class="radio-label">
            <input type="radio" name="payment" />
            다른 결제 수단 <span class="arrow">▼</span>
        </label>
        </div>
    </div>

    <div class="terms">
        <input type="checkbox" id="terms" ref={terms1Ref}/>
        <label for="terms">구매조건 확인 및 결제대행 서비스 약관 동의</label>
        <br />
        <input type="checkbox" id="privacy" ref={terms2Ref}/>
        <label for="privacy">개인정보 국외 이전 동의</label>
    </div>

    <button className="pay-button" onClick={handlePayment}>결제하기</button>
    </div>
);
}