import { createSlice } from "@reduxjs/toolkit";
// const initialState={
//     cartitem:[],

// }

export const CartSlice = createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        add:(state,action) => {
            state.push(action.payload);
        },
        remove:(state,action) => {
            return state.filter((item) => item.id !== action.payload);
        },
        addamount:(state,action) => {
            return state.forEach((item) => {
                if(item.id == action.payload){
                    item.amount+=1;
                }
            });
        },
        removeamount:(state,action) => {
            return state.forEach((item) => {
                if(item.id == action.payload){
                    item.amount-=1;
                }
            });
        },
    }
});

export const {add, remove,removeamount,addamount} = CartSlice.actions;
export default CartSlice.reducer;