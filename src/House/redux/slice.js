import { createSlice } from "@reduxjs/toolkit";

// تحميل بيانات الـ cart من localStorage إذا كانت موجودة
const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

export const cartsHouse = createSlice({
    name: 'cart',
    initialState: {
        items: savedCart, // استخدام البيانات المخزنة من localStorage
        searchQuery: '',  // إضافة حالة البحث
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        addTocart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        removeTocart: (state, action) => {
            state.items = state.items.filter((_, index) => index !== action.payload);
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        increment: (state, action) => {
            const item = state.items.find((_, index) => index === action.payload);
            if (item) item.quantity += 1;
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        decrement: (state, action) => {
            const item = state.items.find((_, index) => index === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        setSearchQuery: (state, action) => {  
            state.searchQuery = action.payload;  
        },
        loginUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
          },
          logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
          },
    }
});

export const { addTocart, removeTocart, increment, decrement, setSearchQuery,loginUser,logoutUser } = cartsHouse.actions;
export default cartsHouse.reducer;
