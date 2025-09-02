import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home";
import Carts from "./Carts";
import Navigation from "./Nav";

export default function Routers(){
    return(
        <Router>
      
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home/carts" element={<Carts/>} />
        </Routes>
        </Router>
    )
}