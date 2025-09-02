
import { useEffect, useState } from 'react';
import './Nav.css';
import OutsideClickHandler from 'react-outside-click-handler';
import { BiMenuAltRight } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth, db } from '../Auth/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

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
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          }
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
      <nav>
        <div>
          <h1 className='uniq'>Homyz</h1>
        </div>
        <OutsideClickHandler onOutsideClick={() => setMenuopened(false)}>
          <ul className='h-menu'>
            <li><Link to='/' className='link'>Home</Link></li>
            <li><Link to='/houses' className='link'>Houses</Link></li>
            <li><Link to='/carts' className='link'>
              <span className='length'>{cartItems.length}</span> Carts
            </Link></li>
            <li><Link to='/' className='link'>Contact</Link></li>
          </ul>
        </OutsideClickHandler>

        <div className="user-container">
  {user ? (
    <div className="user-profile">
      <img
        src={userDetails?.profilePicture || "/png-clipart-profile-icon-circled-user-icon-icons-logos-emojis-users.png"} 
        alt="Profile"
        className="profile-img"
        onClick={() => setProfileOpen((prev) => !prev)}
      />

      {profileOpen && (
        <div className="profile-dropdown">
          <button className="close-btn" onClick={() => setProfileOpen(false)}>❌</button>
          <p>{userDetails?.firstName || "User"}</p>
          <p>{user.email}</p>
          <hr />
          <button className='logout' onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  ) : (
    <button className='button'>
      <Link  to={'/auth'}>Login</Link>
    </button>
  )}
</div>


        <div className='menu-icon' onClick={() => setMenuopened((prev) => !prev)}>
          <BiMenuAltRight size={30} />
        </div>
      </nav>
    </div>
  );
}
