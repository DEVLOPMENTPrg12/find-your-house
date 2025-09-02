import { configureStore } from "@reduxjs/toolkit";
import { cartsHouse } from "./slice";

export const store=configureStore({
    reducer:
    {
        carts:cartsHouse.reducer
    }
})