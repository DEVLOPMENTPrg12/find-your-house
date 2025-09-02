import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, removeTocart } from "../redux/slice";
import './CartsHouse.css'
import Nav from "../navigation/Nav";
export default function CartsHouse() {
    const cartItems = useSelector((state) => state.carts?.items || []);
    const dispatch = useDispatch();
  
    return (
      <div className="main-container">
        <Nav />
        <h2 className="h2">🛒 List Favorite</h2>
        {cartItems.length === 0 ? (
          <p className="empty">❌ Your cart is empty!</p>
        ) : (
          <div className="cart-container">
            {cartItems.map((house, i) => {
              const houseTotal = (Number(house.price) * house.quantity).toFixed(2);
  
              return (
                <div key={i} className="carts">
                  <img className="imageCart" src={house.image} alt="House" />
  
                  <div className="cart-info">
                    <h2 className="name">{house.name}</h2>
                    <p className="price">💰 Price: ${house.price} / night</p>
                    <p className="house-total">📌 Total: ${houseTotal}</p>
  
                    <div className="quantity-controls">
                      <h4>Night:</h4>
    <button className="qunt" onClick={() => dispatch(decrement(i))}>➖</button>
    <span className="qntn">{house.quantity}</span>
    <button className="qunt" onClick={() => dispatch(increment(i))}>➕</button>
</div>

                  </div>
  
                  <div className="cart-buttons">
                    <button className="book1">📅 Book Now</button>
                    <button className="delet" onClick={() => dispatch(removeTocart(i))}>
                      🗑 Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
  