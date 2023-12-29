import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { create } from "domain";

interface UrlState{
  urls:any;
}


const initialState:UrlState={
    urls:[]
}

const urlSlice=createSlice({
    name:"urls",
    initialState:{...initialState},
    reducers:{
      getUrl:(state,action)=>{
        console.log(action.payload)
        return {
            ...initialState,
            urls:action.payload
        }
      }






    }
})


export const {getUrl}=urlSlice.actions;
export default urlSlice.reducer;