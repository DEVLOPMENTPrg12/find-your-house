import { useEffect, useState } from "react";
import "./Nav.css";
import OutsideClickHandler from "react-outside-click-handler";
import { BiMenuAltRight } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth, db } from "../Auth/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Nav() {
  const [menuopened, setMenuopened] = useState(false);
  const cartItems = useSelector((state) => state.carts?.items || []);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const docRef = doc(db, "Users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) setUserDetails(docSnap.data());
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      } else {
        setUser(null);
        setUserDetails(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <header className="header">
        <div className="menu_toggle navOpenBtn">
          <span></span>
        </div>

        <div className="logo">
          <p>
            <span>FY</span>H
          </p>
        </div>

        <OutsideClickHandler onOutsideClick={() => setMenuopened(false)}>
          <ul className={`menu ${menuopened ? "open" : ""}`}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/houses">Houses</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li>
              <Link to="/carts">
                Carts <span className="cart-count">{cartItems.length}</span>
              </Link>
            </li>
          </ul>
        </OutsideClickHandler>

        <div className="auth">
          {user ? (
            <div className="account">
              <div className="dropdown">
                <img
                  className="dropbtn"
                  src={
                    userDetails?.profilePicture ||
                    "/png-clipart-profile-icon-circled-user-icon-icons-logos-emojis-users.png"
                  }
                  alt="Profile"
                  onClick={() => setProfileOpen((prev) => !prev)}
                />
                {profileOpen && (
                  <div className="dropdown-content">
                    <span>Hello, {userDetails?.firstName || "User"}</span>
                    <Link className="link" to="/wishlists">List Favorite</Link>
                    <Link className="link" to="/addhouse">Add House</Link>
                    <Link className="link" to="/dashboard">Settings</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="login_btn"
            >
              LOGIN
            </button>
          )}
        </div>

        <div
          className="menu-icon"
          onClick={() => setMenuopened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </header>
    </div>
  );
}
