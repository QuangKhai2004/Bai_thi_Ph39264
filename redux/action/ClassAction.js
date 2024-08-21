

import{createAsyncThunk} from '@reduxjs/toolkit';
import{addClass} from '../reducer/ClassReducer'

const api_url = "http://10.24.35.222:3000/nhahang_15";

export const fetchClass = ()=>{
    return async dispatch =>{
        try {
            const response = await fetch(api_url);
            const data = await response.json()
            
            data.forEach(row =>{
                dispatch(addClass(row))
            })
        } catch (error) {
            
            console.log(error);
        }
    }
}

export const addToCart = (item) => {
    return {
      type: 'class/addToCart',
      payload: item,
    };
  };

export const AddClassAPI =createAsyncThunk(
    'class/AddClassAPI',
    async (objClass,thunkAPI)=>{
        try {
            const response=await fetch(api_url,{
                method:"POST",
                body:JSON.stringify(objClass)
            });
            const data = response.json();
            if(response.ok){
                return data;
            }else{
                return thunkAPI.rejectWithValue(await response.json())
            }
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.messager);
        }
    }

)
export const DeleteClassAPI = createAsyncThunk(
    'class/DeleteClassAPI',
    async (id,thunkAPI)=>{
        try {
            const response = await fetch(`${api_url}/${id}`,{
                method:"DELETE"
            })

            if(response.ok){
                return id;
            }else{
                return thunkAPI.rejectWithValue( await response.json());
            }
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.messager);
        }
    }

)
export const UpdateClassAPI = createAsyncThunk(
    'class/UpdateClassAPI',
    async (objUpdate, thunkAPI)=>{
        try {
            const response = await fetch(`${api_url}/${objUpdate.id}`,{
                method:"PUT",
                body:JSON.stringify(objUpdate.data)
            })
            const data = await response.json();
            if (response.ok) {
                return data;
                
            }
            else{
                return thunkAPI.rejectWithValue( await response.json());
            }
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.messager);
            
        }
    }
)
