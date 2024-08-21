import {createSlice} from '@reduxjs/toolkit'
import { AddClassAPI, DeleteClassAPI, UpdateClassAPI } from '../action/ClassAction';
import { act } from 'react-test-renderer';


const initialState = {
    class:[],
    cart: [],
}

const ClassSlice = createSlice({
    name:'class',
    initialState,
    reducers:{
        addClass(state,action) {
state.class.push(action.payload);
        },

        addToCart(state, action) {
            state.cart.push(action.payload); // Thêm mục vào giỏ hàng
          },
          removeFromCart(state, action) {
            const itemIdToRemove = action.payload;
            state.cart = state.cart.filter(item => item.id !== itemIdToRemove);
        },
    },
    
    extraReducers: builder =>{
        // viết câu lệnh ở đây: thêm sửa xóa
        builder.addCase(AddClassAPI.fulfilled,(state,action)=>{
            state.class.push(action.payload)
        } )
        .addCase(AddClassAPI.rejected,(state,action) =>{
            console.log("addd Class rejected" , action.error.message);
        });

        //xoa
        builder.addCase(DeleteClassAPI.fulfilled,(state,action) =>{
            state.class = state.class.filter(row => row.id != action.payload);
        }).addCase(DeleteClassAPI.rejected, (state,action) =>{
            console.log("Delete Class rejected" , action.error.message);
        })

        // sua
        builder.addCase(UpdateClassAPI.fulfilled,(state,action)=>{
            const {id, ten_NhaHang_ph39264, giatien_ph39264, ngay_nhap, mota,hinh_anh_ph39264} =action.payload;
            const lop = state.class.find(row => row.id === id);
            if(lop){
                lop.ten_NhaHang_ph39264 = ten_NhaHang_ph39264;
                lop.giatien_ph39264 = giatien_ph39264;
                lop.ngay_nhap=ngay_nhap;
                lop.mota = mota;
                lop.hinh_anh_ph39264 = hinh_anh_ph39264;

            }
        })
        .addCase(UpdateClassAPI.rejected,(state,action)=>{
            console.log("update class rejected", action.error.message);
        })


        
    }
})

export const {addClass,addToCart,removeFromCart} = ClassSlice.actions;
export default ClassSlice.reducer;