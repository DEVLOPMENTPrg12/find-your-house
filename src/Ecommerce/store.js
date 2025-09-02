import { configureStore } from "@reduxjs/toolkit";
import { cartsSlice } from "./slice";

export const store=configureStore({
    reducer:
    {
        cart:cartsSlice.reducer
    }
})