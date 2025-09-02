// import { useEffect, useState } from "react";
// import { auth, db } from "./firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom"; // لاستخدام التنقل
// import "./Auth.css";  // استيراد نفس ملف التنسيق المشترك
// import Nav from "../navigation/Nav";

// export default function Profile() {
//   const [userDetails, setUserDetails] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         const docRef = doc(db, "Users", user.uid);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setUserDetails(docSnap.data());
//         } else {
//           console.log("No user data found");
//         }
//       } else {
//         console.log("No user is logged in");
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   async function handleLogout() {
//     try {
//       await auth.signOut();
//       navigate("/auth");  // أو إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
//       console.log("User logged out successfully");
//     } catch (error) {
//       console.log("Logout error: ", error.message);
//     }
//   }

//   return (
//     <div className="body">
//       <Nav />
//       {userDetails ? (
//         <div className="container">
//           <h3>Welcome {userDetails.firstName}</h3>
//           <p>Email: {userDetails.email}</p>
//           <p>First Name: {userDetails.firstName}</p>
//           <button className="buttonAuth" onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }
