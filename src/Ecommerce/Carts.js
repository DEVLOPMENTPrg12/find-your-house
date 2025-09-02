import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, removeTocart } from "./slice";
import Navigation from "./Nav";

export default function Carts() {
      const quantite=useSelector((state)=>state.cart.quantite)
    const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [incre,setIncre]=useState()
  const[decr,setDecr]=useState()
  

  // حساب مجموع الأسعار
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <Navigation />
      <h2>🛒 سلة المشتريات</h2>
      {cartItems.length === 0 ? (
        <p>السلة فارغة</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p>${item.price}</p>
              <button onClick={() => dispatch(removeTocart(index))}>❌ إزالة</button>
              <button onClick={()=>dispatch(increment())} >+</button><span  > {quantite} </span><button onClick={()=>dispatch(decrement())}>-</button>
            </div>
          ))}
          <h3>💰 المجموع: ${totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}
