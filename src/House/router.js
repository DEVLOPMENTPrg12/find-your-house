import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Residencies from "./Residience/Residience";
import CartsHouse from "./Carts/CartsHouse";
import Auth from "./Auth/Auth";
import Profile from "./Auth/profile";

export default function Routeres(){
    return(
        <div>
            <BrowserRouter>
            <Routes>
                <Route index element={<Home/>} />
                <Route path="/houses" element= {<Residencies/>} />
                <Route path="/carts" element={<CartsHouse/>} />
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/profile" element={<Profile/>} />
            </Routes>
            </BrowserRouter>
        </div>
    )
}