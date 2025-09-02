import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./nav.css";

export default function Navigation() {
  const cartCount = useSelector((state) => state.cart.items.length); // جلب عدد المنتجات

  return (
    <div>
      <nav>
        <ul>
          <li className="home">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="carts">
            <Link to={"/home/carts"}>
              Carts {cartCount > 0 && <span className="cart-count">({cartCount})</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
