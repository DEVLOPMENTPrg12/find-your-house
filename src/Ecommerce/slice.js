import { createSlice } from "@reduxjs/toolkit";

export const cartsSlice=createSlice({
    name:'cart',
    initialState:{
        items:[],
        quantite:0
    },
    reducers:{
        addTocart:(state,action)=>{
            state.items.push(action.payload)
        },
        removeTocart:(state,action)=>{
          state.items=state.items.filter((_,index)=>index!==action.payload)
        },
        increment:(state,action)=>{
            state.items.find(index=>index===action.payload);
            state.quantite+1 
        },
        decrement:(state)=>{
            state.quantite=state.quantite-1
        }
        
    }
})
export const{addTocart,removeTocart,increment,decrement}=cartsSlice.actions
export default  cartsSlice.reducer